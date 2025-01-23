const express = require("express");
const nodemailer = require("nodemailer");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const app = express();
const cors = require("cors");
const pdf = require("html-pdf");
const puppeteer = require("puppeteer");
const { fetchSitemap, fetchPageTitle, fetchPageSpeedData, fetchFallbackSitemap } = require("./pagepeed");
const http = require('http');
const { Server } = require('socket.io'); // Import Socket.io
const server = http.createServer(app);
require('dotenv').config();
// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });

app.use(cors("*"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello World");
});

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "mesushil214@gmail.com",
        pass: "dkef ohye oiaq bjiz",
    },
});

// Endpoint to handle sending email with HTML content or file
app.post("/send-email", upload.single("file"), async (req, res) => {
    const { htmlContent, toEmails } = req.body;
    let fileHtmlContent = null;

    // Check if the request has an uploaded file
    if (req.file) {
        // Read the uploaded HTML file
        try {
            fileHtmlContent = fs.readFileSync(req.file.path, "utf8");
            // Optionally delete the file after reading
            fs.unlinkSync(req.file.path);
        } catch (err) {
            return res.status(500).send("Error reading the file.");
        }
    }

    // Use provided htmlContent or content from the uploaded file
    const contentToSend = fileHtmlContent || htmlContent;

    if (!contentToSend || !toEmails) {
        return res.status(400).send("Missing htmlContent or toEmails");
    }

    const emails = JSON.parse(toEmails);
    const toEmailsString = Array.isArray(emails) ? emails.join(",") : emails;

    const mailOptions = {
        from: '"Essential Tools by Sushil" <mesushil214@gmail.com>',
        to: toEmailsString,
        subject: "Sent from Email Template Sender - https://essential-tools.vercel.app/email-template-sender",
        html: contentToSend,
    };

    try {
        const info = await transporter.sendMail(mailOptions); // Using async/await
        console.log(info.messageId);
        res.status(200).send("Email sent successfully");
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.post("/convert-html-to-pdf", upload.single("file"), async (req, res) => {
    const { htmlContent, library = "puppeteer" } = req.body;

    try {
        // Determine content to convert
        let contentToConvert = htmlContent;

        if (req.file) {
            const filePath = path.resolve(req.file.path);
            console.log(`Reading uploaded file from: ${filePath}`);
            contentToConvert = await fs.promises.readFile(filePath, "utf8");
            await fs.promises.unlink(filePath); // Clean up uploaded file
            console.log("Uploaded file read and deleted successfully.");
        }

        if (!contentToConvert) {
            return res.status(400).json({ error: "Missing HTML content or uploaded file." });
        }

        let pdfBuffer;

        if (library === "html-pdf") {
            console.log("Using html-pdf library...");
            pdfBuffer = await new Promise((resolve, reject) => {
                pdf.create(contentToConvert, {
                    format: "A4",
                    phantomArgs: ["--ignore-ssl-errors=yes", "--ssl-protocol=TLSv1"],
                    quality: "high",
                    border: "10mm",
                    timeout: 30000, // Ensure enough time for rendering
                }).toBuffer((err, buffer) => {
                    if (err) {
                        console.error("html-pdf error:", err);
                        return reject(err);
                    }
                    resolve(buffer);
                });
            });
            console.log("PDF generated using html-pdf.");
        } else if (library === "puppeteer") {
            console.log("Using Puppeteer library...");
            const browser = await puppeteer.launch({ args: ["--no-sandbox", "--disable-setuid-sandbox"] });
            try {
                const page = await browser.newPage();
                await page.setViewport({ width: 1280, height: 800 });
                await page.setContent(contentToConvert, { waitUntil: "networkidle0" });
                pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
                console.log("PDF generated using Puppeteer.");
            } finally {
                await browser.close();
            }
        } else {
            return res.status(400).json({ error: "Invalid library specified. Use 'puppeteer' or 'html-pdf'." });
        }

        // Save PDF to uploads folder
        const outputFolder = path.resolve("uploads");
        const fileName = `output_${Date.now()}.pdf`;
        const pdfPath = path.join(outputFolder, fileName);

        await fs.promises.mkdir(outputFolder, { recursive: true });
        await fs.promises.writeFile(pdfPath, pdfBuffer);
        console.log(`PDF saved to: ${pdfPath}`);

        const pdfUrl = `${req.protocol}://${req.get("host")}/uploads/${fileName}`;
        return res.json({ pdfUrl, message: "PDF generated successfully." });
    } catch (error) {
        console.error("Error generating PDF:", error);
        return res.status(500).json({ error: "Internal server error." });
    }
});

// Serve static files for generated PDFs
app.use("/uploads", express.static(path.resolve("uploads")));


app.get("/display-file", (req, res) => {
    const { filePath } = req.query;

    if (!filePath) {
        return res.status(400).send("Missing filePath query parameter.");
    }

    const absolutePath = path.join(__dirname, 'uploads', filePath);
    console.log(`Displaying file from: ${absolutePath}`);

    fs.access(absolutePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).send("File not found.");
        }

        res.sendFile(absolutePath);
    });
});

app.post("/fetch-sitemap", async (req, res) => {
    const { url, fetchTitles = false, fetchPageSpeed = false } = req.body;
    if (!url) {
        return res.status(400).send("Missing URL in request body.");
    }

    try {
        const parsedSitemap = await fetchFallbackSitemap(url, fetchTitles, fetchPageSpeed);
        res.json(parsedSitemap);
    } catch (error) {
        console.error("Error fetching sitemap:", error);
        res.status(500).send("Error fetching sitemap.");
    }
});


// Function to delete old PDF files
const deleteOldPDFs = () => {
    const uploadsDir = path.join(__dirname, "uploads");

    fs.readdir(uploadsDir, (err, files) => {
        if (err) {
            console.error("Error reading uploads directory:", err);
            return;
        }

        files.forEach((file) => {
            const filePath = path.join(uploadsDir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error("Error getting file stats:", err);
                    return;
                }

                const now = Date.now();
                const fileAge = now - stats.mtimeMs;

                // Check if the file is older than 2 days (2 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
                if (fileAge > 2 * 24 * 60 * 60 * 1000) {
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error("Error deleting file:", err);
                        } else {
                            console.log(`Deleted old PDF file: ${file}`);
                        }
                    });
                }
            });
        });
    });
};

// Schedule the deleteOldPDFs function to run every day
setInterval(deleteOldPDFs, 24 * 60 * 60 * 1000);

module.exports = app;


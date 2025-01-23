const http = require('http'); // Import HTTP to create a server
const { Server } = require('socket.io'); // Import Socket.io
const app = require('./app'); // Import your Express app
const { fetchSitemap, fetchPageTitle, fetchPageSpeedData } = require('./pagepeed');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Create an HTTP server
const server = http.createServer(app);

// Create a Socket.io server and attach it to the HTTP server
const io = new Server(server, {
  cors: {
    origin: (origin, callback) => {
      // Allow all origins
      callback(null, origin);
    },
    methods: ['GET', 'POST'],
    credentials: true, // Allow credentials
  },
});

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('fetchSitemap', async ({ url, fetchTitles = true, fetchPageSpeed = true }) => {
    try {
      console.log('Fetching sitemap for URL:', url);
      const sitemapUrls = await fetchSitemap(url);
      if (!sitemapUrls || sitemapUrls.length === 0) {
        throw new Error(`No sitemap URLs found for ${url}`);
      }

      console.log(sitemapUrls, "Sitemap URLs");

      socket.emit('sitemapUrls', sitemapUrls);
      console.log("Sitemap event emitted");

      // Fetch details for each URL asynchronously
      const urlsWithDetails = await Promise.all(
        sitemapUrls.map(async (sitemapUrl) => {
          try {
            console.log('Fetching title for:', sitemapUrl.loc);
            const title = fetchTitles ? await fetchPageTitle(sitemapUrl.loc) : null;

            // Emit title update event
            socket.emit('updateTitle', { loc: sitemapUrl.loc, title });

            console.log('Fetching PageSpeed data for:', sitemapUrl.loc);
            let pageSpeed = null;
            if (fetchPageSpeed) {
              pageSpeed = await fetchPageSpeedData(sitemapUrl.loc);
              // Emit PageSpeed update event
              socket.emit('updatePageSpeed', { loc: sitemapUrl.loc, pageSpeed });
            }

            return { ...sitemapUrl, title, pageSpeed };
          } catch (urlError) {
            console.error(`Error processing URL ${sitemapUrl.loc}:`, urlError);
            return { ...sitemapUrl, title: null, pageSpeed: null, error: urlError.message }; // return the error details
          }
        })
      );

      // Once all details are fetched, emit 'complete' event
      console.log('Emitting complete event with details.');
      socket.emit('complete', urlsWithDetails);

    } catch (error) {
      console.error("Error in fetchSitemap:", error);
      socket.emit('error', { message: 'An error occurred while fetching the sitemap or processing data.' });
    }
  });

  // Handle fetchPageSpeedReport for a specific URL
  socket.on('fetchPageSpeedReport', async ({ url }) => {
    try {
      const reportData = await fetchPageSpeedData(url);
      socket.emit('reportData', { loc: url, reportData });
    } catch (error) {
      console.error("Error fetching PageSpeed report:", error);
      socket.emit('error', { message: 'An error occurred while fetching the PageSpeed report.' });
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
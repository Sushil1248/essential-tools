const axios = require('axios');
const xml2js = require('xml2js');
const cheerio = require('cheerio');
require('dotenv').config();
const fs = require('fs');
const { default: puppeteer } = require('puppeteer');

async function fetchSitemap(url, fetchTitles = false, fetchPageSpeed = false) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    console.log(url)
    const sitemapUrl = `${url}/sitemap.xml`;

    try {
        console.log(`Trying to fetch sitemap from: ${sitemapUrl}`);

        const response = await axios.get(sitemapUrl);
        const sitemapXml = response.data;

        const parser = new xml2js.Parser();
        const parsedSitemap = await parser.parseStringPromise(sitemapXml);

        if (parsedSitemap.sitemapindex) {
            return processSitemapIndex(parsedSitemap, fetchTitles, fetchPageSpeed);
        } else if (parsedSitemap.urlset && parsedSitemap.urlset.url) {
            const urls = await Promise.all(parsedSitemap.urlset.url.map(async url => ({
                loc: url.loc[0],
                last_modified: url.lastmod ? url.lastmod[0] : null,
                title: fetchTitles ? await fetchPageTitle(url.loc[0]) : null
            })));
            return urls;
        } else {
            throw new Error("Invalid sitemap structure");
        }
    } catch (error) {
        console.error(`Error fetching sitemap from ${sitemapUrl}: ${error.message}`);
        return fetchFallbackSitemap(url);
    }
}

async function fetchPageTitle(link) {
    try {
        const response = await axios.get(link);
        const html = response.data;
        const $ = cheerio.load(html);
        return $('title').text() || 'No Title Found';
    } catch (error) {
        console.error(`Error fetching title for ${link}: ${error.message}`);
        return 'Error Fetching Title';
    }
}

async function processSitemapIndex(parsedSitemap, fetchTitles) {
    if (!parsedSitemap.sitemapindex || !parsedSitemap.sitemapindex.sitemap) {
        console.error('Invalid sitemap index structure');
        return [];
    }

    const sitemaps = parsedSitemap.sitemapindex.sitemap;
    const allUrls = [];

    for (const sitemap of sitemaps) {
        const loc = sitemap.loc[0];
        console.log(`Fetching sitemap: ${loc}`);

        try {
            const response = await axios.get(loc);
            const sitemapXml = response.data;

            const parser = new xml2js.Parser();
            const parsedSubSitemap = await parser.parseStringPromise(sitemapXml);

            const urls = extractUrlsFromSitemap(parsedSubSitemap);
            const urlsWithDetails = await Promise.all(
                urls.map(async (url) => ({
                    loc: url.loc,
                    last_modified: url.last_modified, // Add logic to fetch last modified if needed
                    title: fetchTitles ? await fetchPageTitle(url) : null
                }))
            );

            allUrls.push(...urlsWithDetails);
        } catch (error) {
            console.error(`Error fetching sub-sitemap ${loc}: ${error.message}`);
        }
    }

    return allUrls;
}

function extractUrlsFromSitemap(parsedSitemap) {
    if (parsedSitemap.urlset && parsedSitemap.urlset.url) {
        return parsedSitemap.urlset.url.map(url => ({
            loc: url.loc[0],
            last_modified: url.lastmod ? url.lastmod[0] : null
        }));
    }
    return [];
}

async function fetchFallbackSitemap(url) {
    console.log(`No sitemap found at standard location. Generating or fetching sitemap for ${url} using fallback logic.`);

    try {
        // Start a headless browser
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Go to the webpage
        await page.goto(url, { waitUntil: 'networkidle0' });

        // Get the rendered HTML
        const html = await page.content();
        // Proceed with parsing links from the rendered HTML
        const $ = cheerio.load(html);
        const links = [];

        // Find all links on the page
        $('a[href]').each((index, element) => {
            const href = $(element).attr('href');
            if (href) {
                const absoluteUrl = href.startsWith('/') ? `${url}${href}` : href;
                if (absoluteUrl.startsWith(url) && !links.includes(absoluteUrl)) {
                    links.push(absoluteUrl);
                }
            }
        });

        console.log(`Found ${links.length} links on the homepage.`);

        if (links.length === 0) {
            throw new Error('No valid links found on the homepage');
        }

        // Generate the sitemap
        const generatedSitemap = {
            data: {
                url: links.map(link => ({ loc: link,  last_modified: null, title:'' })),
            }
        };

        await browser.close(); // Close the browser after use

        return generatedSitemap.data.url;

    } catch (error) {
        console.error(`Error generating fallback sitemap for ${url}: ${error.message}`);
        return []; // Return an empty sitemap on failure
    }
}

async function fetchPageSpeedData(url) {
    const api_key = process.env.PAGESPEED_INSIGHT_KEY;
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?category=ACCESSIBILITY&category=BEST_PRACTICES&category=PERFORMANCE&category=SEO&url=${encodeURIComponent(url)}&key=${api_key}`;
    console.log(apiUrl);

    try {
        const response = await axios.get(apiUrl);
        const data = response.data;

        if (!data.lighthouseResult) {
            throw new Error('Lighthouse results are not available in the response.');
        }

        const categories = data.lighthouseResult.categories || {};
        const audits = data.lighthouseResult.audits || {};

        const consolidatedData = {
            url: data.lighthouseResult.finalUrl || url,
            fetchTime: data.lighthouseResult.fetchTime || new Date().toISOString(),
            scores: {
                accessibility: (categories.accessibility?.score * 100).toFixed(2) || 'N/A',
                performance: (categories.performance?.score * 100).toFixed(2) || 'N/A',
                bestPractices: (categories['best-practices']?.score * 100).toFixed(2) || 'N/A',
                seo: (categories.seo?.score * 100).toFixed(2) || 'N/A',
            },
            diagnostics: {
                firstContentfulPaint: audits['first-contentful-paint']?.displayValue || 'N/A',
                speedIndex: audits['speed-index']?.displayValue || 'N/A',
                largestContentfulPaint: audits['largest-contentful-paint']?.displayValue || 'N/A',
                interactive: audits['interactive']?.displayValue || 'N/A',
            },
            fullPageScreenshot: data?.lighthouseResult?.fullPageScreenshot?.screenshot?.data,
            errors: audits['errors-in-console']?.details?.items.map(item => ({
                description: item.description,
                source: item.source,
            })) || [],
        };

        return consolidatedData;
    } catch (error) {
        console.error('Error fetching PageSpeed data:', error);
        throw error;
    }
}


module.exports = {
    fetchSitemap, fetchPageTitle, fetchPageSpeedData, fetchFallbackSitemap
};

const fs = require("fs");
const path = require("path");

const baseUrl = "https://repaly.ai"; // Change to your actual domain

const routes = [
  "/", // Public landing page
  "/demo",
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
  </url>`
  )
  .join("")}
</urlset>`;

// Ensure you're writing to the dist/ folder at the root level
const distPath = path.resolve(__dirname, "../../dist"); // Go up two levels (from src/scripts/ to project root)
const outputPath = path.join(distPath, "sitemap.xml");

// Make sure dist directory exists, if not create it
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// Write the sitemap.xml
fs.writeFileSync(outputPath, sitemap);

console.log("✅ Sitemap successfully generated at:", outputPath);

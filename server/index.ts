import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Determine the correct path to serve static files
  // In production: /app/dist (where Vite builds to)
  // In development: /app/dist (same location)
  const distPath = path.resolve(__dirname, "..", "dist");
  
  console.log(`[Server] NODE_ENV: ${process.env.NODE_ENV}`);
  console.log(`[Server] Serving static files from: ${distPath}`);
  console.log(`[Server] Directory exists: ${fs.existsSync(distPath)}`);

  // Serve static files
  app.use(express.static(distPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    const indexPath = path.join(distPath, "index.html");
    console.log(`[Server] Serving index.html from: ${indexPath}`);
    res.sendFile(indexPath);
  });

  const port = process.env.PORT || 3000;

  server.listen(Number(port), "0.0.0.0", () => {
    console.log(`[Server] ✓ Server running on http://0.0.0.0:${port}/`);
    console.log(`[Server] ✓ Ready to accept connections`);
  });

  // Handle errors
  server.on("error", (err) => {
    console.error(`[Server] Error:`, err);
    process.exit(1);
  });
}

startServer().catch((err) => {
  console.error("[Server] Failed to start:", err);
  process.exit(1);
});

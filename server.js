// Lab 6 - Containerization using Docker
// A minimal Express web server. This is the "random project" we convert
// into a Docker image (Task 2). It serves a static page and a /health route.

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Serve the static front-end from /public
app.use(express.static(path.join(__dirname, "public")));

// Simple JSON health check — handy to confirm the container is alive
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "lab6-docker-app",
    hostname: require("os").hostname(), // inside Docker this is the container id
    time: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`Lab 6 app listening on http://localhost:${PORT}`);
});

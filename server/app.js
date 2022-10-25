const express = require("express");
const cors = require("cors");
const path = require("path");

const searchRoutes = require("./routes/search");

const app = express();

const isDev = process.env.NODE_ENV === "development";

if (isDev) {
  app.use(
    cors({
      origin: "http://localhost:300",
      optionsSuccessStatus: 200,
    })
  );
}

app.use(express.json({ type: "application/json" }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/search", searchRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  return res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.status ? error.message : "Internal Server Error",
    },
  });
});

module.exports = app;

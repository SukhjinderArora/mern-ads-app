const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");
const { PORT } = process.env;

const server = http.createServer(app);

const port = PORT || 5000;

async function main() {
  try {
    server.listen(port);
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.1hqidqg.mongodb.net/?retryWrites=true&w=majority`
    );
  } catch (error) {
    console.log(error);
  }
}

main();

const express = require("express");
const routes = require("./backend/routes");



// Create server
const server = express();

const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

server.use("/", routes);

server.listen(3000)
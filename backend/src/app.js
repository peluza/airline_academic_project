// This API consults the data base for airlines

// Add dependencies
const config = require("./controller/config.js");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./views/route.js");
const router_user = require("./views/route_users.js");
const cors = require("cors");

// Excute the express
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add routes
app.use("/api/v1", router);
app.use("/users", router_user);
app.listen(config.port, () =>
  console.log(`Server running on port ${config.port}`)
);

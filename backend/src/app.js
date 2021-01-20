// this API consult the data bases for airlines

// add dependencies
const config = require("./controller/config.js");
const express = require("express");
const bodyParser = require("body-parser");
const router = require("./views/route.js");
const router_user = require("./views/route_users.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1", router);
app.use("/users", router_user);
app.listen(config.port, () =>
  console.log(`Server running on port ${config.port}`)
);

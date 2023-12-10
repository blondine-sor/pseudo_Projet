//pakages
const express = require("express");
const morgan = require("morgan");

//module natifs
const path = require("path");

//routes/database
const routes = require("./routes");
require("./database/connexion");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000);

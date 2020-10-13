require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const passport = require("passport");

const app = express();

require("./security/passport");

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "Online Library")));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "some stupid secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoutes);
app.use(userRoutes);

app.get("/ping", (req, res, next) => {
  res.render("ping", { title: "Pong!" });
});

module.exports = app;

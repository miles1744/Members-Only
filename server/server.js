require("dotenv").config();
require("./config/passport"); 

const express = require("express");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const authRoutes = require("./routes/authRoutes.js")
const app = express();
const cors = require("cors");
const joinRoutes = require("./routes/joinRoutes");
const createRoutes = require("./routes/createRoutes.js");
const messagesRoutes = require("./routes/messageRoutes.js")


const corsOptions = {
    origin:["http://localhost:5173"],
    credentials: true
};

app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  }));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRoutes);
app.use("/", joinRoutes);
app.use("/", createRoutes);
app.use("/", messagesRoutes);

app.listen(3000, () => console.log("app listening on port 3000!"));

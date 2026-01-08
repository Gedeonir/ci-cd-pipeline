const express = require("express");
const app = express();
app.use(express.json());
const usersRouter = require('./users.controllers/users.controller');


app.get("/", (req, res) => {
  res.send("Hello, Welcome to the Home Page");
});

app.use('/users', usersRouter);

module.exports = app;  


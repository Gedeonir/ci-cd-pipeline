const express = require("express");
const crypto = require("crypto");
const app = express();
app.use(express.json());
const usersRouter = require('./users.controllers/users.controller');

// ENCRYPT
// app.get("/encrypt", (req, res) => {
//   const key = crypto.randomBytes(32);
//   const iv = crypto.randomBytes(16); // Save IV
//   const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

//   const bufferData = Buffer.from("My secret message");
//   let encrypted = cipher.update(bufferData);
//   encrypted = Buffer.concat([encrypted, cipher.final()]);

//   res.json({
//     encryptedData: encrypted.toString("hex"),
//     key: key.toString("hex"),
//     iv: iv.toString("hex") // send IV to decrypt later
//   });
// });

// // DECRYPT
// app.post("/decrypt", (req, res) => {
//   const { encryptedData, key, iv } = req.body;

//   const keyBuffer = Buffer.from(key, "hex");
//   const ivBuffer = Buffer.from(iv, "hex");
//   const encryptedBuffer = Buffer.from(encryptedData, "hex");

//   const decipher = crypto.createDecipheriv("aes-256-cbc", keyBuffer, ivBuffer);
//   let decrypted = decipher.update(encryptedBuffer);
//   decrypted = Buffer.concat([decrypted, decipher.final()]);

//   res.json({ decryptedData: decrypted.toString() });
// });


app.get("/",(req, res) => {
  res.send(`Hello, Welcome to the Home Page`);
});

app.use('/users', usersRouter);

app.listen(3000, () => console.log("Server running on port 3000"));

module.exports=app
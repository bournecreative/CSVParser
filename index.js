const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const payloadExists = require("./middleware/payloadExists");
const fileSizeOverLimit = require("./middleware/fileSizeOverLimit");
const fileExtLimiter = require("./middleware/fileExtLimiter");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (_, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  payloadExists,
  fileSizeOverLimit,
  fileExtLimiter([".csv"]),
  (req, res) => {
    const files = req.files;
    return res.json({ status: "logged", message: "logged" });
  }
);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

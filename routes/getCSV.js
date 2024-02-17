const express = require("express");
const fileUpload = require("express-fileupload");
const path = require("path");
const router = express.Router();
const payloadExists = require("../middleware/payloadExists");
const fileSizeOverLimit = require("../middleware/fileSizeOverLimit");
const fileExtLimiter = require("../middleware/fileExtLimiter");

router.post(
  "/",
  fileUpload({ createParentPath: true }),
  payloadExists,
  fileSizeOverLimit,
  fileExtLimiter([".csv"]),
  (req, res) => {
    const uploadedFile = req.files[Object.keys(req.files)[0]];
    const filePath = path.join(__dirname, "../files", uploadedFile.name);
    uploadedFile.mv(filePath, (err) => {
      if (err) return res.status(500).json({ status: "error", message: err });
    });
    res.json({
      status: "Success",
      message: `${uploadedFile.name} sucessfully uploaded.`,
    });
  }
);

module.exports = router;

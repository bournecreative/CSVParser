const path = require("path");
const fileExtLimiter = (allowedExtArray) => {
  return (req, res, next) => {
    const files = req.files;
    const fileExtensions = [];
    Object.keys(files).forEach((file) => {
      fileExtensions.push(path.extname(files[file].name));
    });
    const allowed = fileExtensions.every((ext) =>
      allowedExtArray.includes(ext)
    );

    if (!allowed)
      return res
        .status(422)
        .json({ status: "error", message: "only csv files are allowed" });
    next();
  };
};

module.exports = fileExtLimiter;

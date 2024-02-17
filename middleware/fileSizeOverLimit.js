const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeOverLimit = (req, res, next) => {
  const files = req.files;
  const overLimit = [];
  Object.keys(files).forEach((file) => {
    if (files[file].size > FILE_SIZE_LIMIT) {
      overLimit.push(file.name);
    }
  });
  if (overLimit.length)
    return res.status(413).json({
      status: "error",
      message: `${overLimit[0]} is over the file limit size ${MB}`,
    });

  next();
};

module.exports = fileSizeOverLimit;

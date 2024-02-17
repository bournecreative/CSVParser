const MB = 5;
const FILE_SIZE_LIMIT = MB * 1024 * 1024;

const fileSizeLimiter = (req, res, next) => {
  if (req.file.size > FILE_SIZE_LIMIT)
    return res.status(413).json({
      status: "error",
      message: `Upload failed. ${req.file.name} is over the file size limit of ${MB}`,
    });
  next();
};

module.exports = fileSizeLimiter;

const payloadExists = (req, res, next) => {
  if (!req.files)
    return res
      .status(400)
      .json({ status: "error", message: "No File was uploaded" });

  next();
};

module.exports = payloadExists;

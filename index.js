const express = require("express");
const path = require("path");
const home = require("./routes/home");
const getCSV = require("./routes/getCSV");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/assets", express.static(path.join(__dirname, "/public")));
app.use("/", home);
app.use("/upload", getCSV);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

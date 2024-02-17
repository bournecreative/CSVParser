const express = require("express");
const home = require("./routes/home");
const getCSV = require("./routes/getCSV");
const app = express();
const PORT = process.env.PORT || 3000;

app.use("/", home);
app.use("/upload", getCSV);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

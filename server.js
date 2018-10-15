const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/cities", (req, res) => {});

app.listen(process.env.PORT || 8080, () => {
    console.log("listening ...");
});

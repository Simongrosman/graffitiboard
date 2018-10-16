const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db.js");

app.use(bodyParser.json());

app.use(express.static("./public"));

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
// const s3 = require("./s3");

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
//to add middlewere s3 + the
app.post("/upload", uploader.single("file"), (req, res) => {
    if (req.file) {
        console.log(req.file);
    } else {
        console.log("err");
    }
});

app.get("/imageboard", function(req, res) {
    db.getPic()
        .then(data => res.json(data.rows))
        .catch(err => console.log(err));
});

app.listen(process.env.PORT || 8080, () => {
    console.log("listening ...");
});

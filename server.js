const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const db = require("./db.js");

app.use(bodyParser.json());

app.use(express.static("./public"));

const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./s3");
const s3Url = require("./config.json");

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
app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const imgUrl = s3Url.s3Url + req.file.filename;
    db.insertNewPhoto(
        imgUrl,
        req.body.username,
        req.body.title,
        req.body.description
    );
    // res.json;

    // if (req.file) {
    //     console.log(req.file);
    // } else {
    // console.log("err");
    // }
});

app.get("/imageboard", function(req, res) {
    db.getPic()
        .then(data => res.json(data.rows))
        .catch(err => console.log(err));
});

app.listen(process.env.PORT || 8080, () => {
    console.log("listening ...");
});

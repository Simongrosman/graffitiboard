var spicedPg = require("spiced-pg");
const knox = require("knox");

let secrets;
var dbUrl;

if (process.env.NODE_ENV === "production") {
    secrets = process.env;
    dbUrl = secrets.DATABASE_URL;
} else {
    secrets = require("./secrets");
    dbUrl = `postgres:${secrets.dbUser}:${
        secrets.dbPassword
    }@localhost:5432/images`;
}

const db = spicedPg(dbUrl);

exports.insertNewPhoto = function insertNewPhoto(
    url,
    username,
    title,
    description
) {
    const q = `
INSERT INTO images (url, username,title, description ) VALUES ($1, $2, $3, $4) returning *`;
    const params = [url, username || null, title || null, description || null];
    return db.query(q, params);
};

exports.getPic = function getPic() {
    return db.query(`SELECT * FROM images`);
};
exports.getPicData = function getPicData(id) {
    return db.query(`SELECT * FROM images WHERE id = $1`, [id]);
};

exports.insertNewComment = function insertNewComment(
    comment,
    username,
    image_id
) {
    const q = `
INSERT INTO images (comment, username,image_id) VALUES ($1, $2, $3) returning *`;
    const params = [comment, username || null, image_id || null];
    return db.query(q, params);
};

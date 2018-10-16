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

exports.getPic = function getPic() {
    return db.query(`SELECT * FROM images`);
};

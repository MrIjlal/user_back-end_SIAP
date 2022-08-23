const dbConfig = require("../../config/db");
const mongoose = require("mongoose");

mongoose.promise = global.Promise;

const db = {}

db.mongoose = mongoose;
db.url = dbConfig.url;

db.users = require("./profile-model")(mongoose);
db.surat = require("./surat-model")(mongoose);

module.exports = db;
const express = require("express");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = 5000;
const ADDRESS = process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0";   


app.use(
    cors({
        origin: "*"
    })
)

app.use(express.json({
    limit: "50mb",
    extended: true
}))

app.use(express.urlencoded({
    limit: "500mb",
    parameterLimit: 100000,
    extended: true
}))

//change directory to public
app.use("/public/surat", express.static("/public/surat"))
app.use("/public/image", express.static("/public/image"))


// Setup middleware multer

app.use(
    multer({
        // storage: fileStorage,
        // fileFilter: fileFilter,
    }).fields([
        {
            name: "thumbnail",
            maxCount: 1
        },
        {
            name: "surat",
            maxCount: 1
        }
    ])
)

// Configurasi mongoose
const db = require("./app/models/");
// const { exit } = require("process");
// const mongoose = require ('mongoose')

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Database connected")
    })
    .catch((err) => {
        console.log("Cannot connect to the database", err)
        process.exit()
    })


// Directory Home
app.get("/", (req, res) => {
    res.json({
        message: "welcome to API"
    })
})


//Call routes surat
require("./app/routes/surat-route")(app)

//Call routes profile
require("./app/routes/profile-route")(app)

//Setup listen port
app.listen(PORT, ADDRESS, () => {
    console.log(`Server is running on http://${ADDRESS}:${PORT}`)
})
const mongoose = require("mongoose");
require("dotenv/config");


const dbUrl = process.env.MONGODB_URI;
mongoose.connect(dbUrl, {
    useNewUrlParser: true
},
()=> console.log("Connected to DB!")
)


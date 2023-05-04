const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors")
dotenv.config()
const PORT = process.env.PORT || 4000;

app.use(cors())

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
mongoose.connection.on("connected",() => {
    console.log("Connected to MongoDB!!!")
})
mongoose.connection.on("error",(err) => {
    console.log("ERROR connecting to Database",err)
})

require("./models/user");
require("./models/post")

app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/post"))
app.use(require("./routes/user"))

app.listen(PORT,() => {  
    console.log(`Server started running at port ${PORT}`)
})
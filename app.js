const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {MONGO_URI} = require("./config/keys")
const PORT = process.env.PORT || 4000;


mongoose.connect(MONGO_URI,{
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

if(process.env.NODE_ENV=="production"){
    app.use(express.static('frontend/client/build'))
    const path = require("path");
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(PORT,() => {
    console.log(`Server started running at port ${PORT}`)
})
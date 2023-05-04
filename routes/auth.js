const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const requireLogin = require("../middlewares/requireLogin")
const dotenv = require("dotenv")
dotenv.config();


router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please enter all the fields" })
    }

    User.findOne({ email: email }).then((savedUser) => {
        if (savedUser) {
            return res.status(422).json({ error: "User already exists with that email" })
        }

        bcrypt.hash(password, 11)
            .then((hashedpassword) => {
                const user = new User({
                    email,
                    password: hashedpassword,
                    name,

                });

                user.save()
                    .then(user => {
                        res.json({ message: "Saved Successfully" })
                    }).catch(err => {
                        console.log(err)
                    })
            })


    }).catch(err => {
        console.log(err)
    })

})

router.post("/signin",(req,res) => {

    const {email,password} = req.body;
    if(!email || !password){
      return res.status(422).json({error:"Please enter email and password"});
    }

    User.findOne({email:email})
    .then(savedUser => {
        if(!savedUser){
            return res.status(422).json({error:"Invalid email or password"});
        }

        bcrypt.compare(password,savedUser.password)
        .then(doMatch => {
            if(doMatch){
                /*res.status(400).json({message:"Successfully Signed in"})*/
                const token = jwt.sign({_id:savedUser._id},process.env.JWT_SECRET)

                const {_id,name,email,followers,following} = savedUser
                res.json({token,user:{_id,name,email,followers,following}})
            }
            else{
              return res.status(422).json({error:"Invalid email or password"})
            }
        }).catch(err => {
            console.log(err)
        })
    })
})
module.exports = router
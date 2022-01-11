const express = require("express");
const mongoose = require("mongoose");
const router = require("./auth");
const requireLogin = require("../middlewares/requireLogin")
const Post = mongoose.model("Post")


router.get("/allpost",requireLogin,(req,res) => {
    Post.find()
    .populate("postedBy","_id name email")
    .then(posts => {
        res.json({posts})  //note that "posts" is equivalent to "posts:posts"
    })
    .catch((err) => {
        console.log(err)
    })
})

router.post("/createpost",requireLogin,(req,res) => {
    const{ title,body,pic } = req.body;
    if(!title || !body || !pic){
        return res.status(401).json({error:"Please enter all the fields"})
    }
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo:pic,
        postedBy:req.user,
    })
    post.save().then(result => {
        res.json({post:result})
    })
    .catch((err) => {
        console.log(err)
    })
})

router.get("/mypost",requireLogin,(req,res) => {
Post.find({postedBy:req.user._id})
.populate("postedBy","name _id email")
.then(mypost => {
    res.json({mypost})
})
.catch((err) => {
    console.log(err)
})

})

router.put("/like",requireLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})

router.put("/unlike",requireLogin,(req,res) => {
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})

router.put("/comment",requireLogin,(req,res) => {

    const comment = {
        text:req.body.text,
        postedBy:req.user._id 
    }

    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .exec((err,result) => {
        if(err){
            return res.status(422).json({error:err})
        }
        else{
            res.json(result)
        }
    })
})

/*router.delete('/deletecomment/:postId/:commentId', requireLogin, (req, res) => {
    Post.findById(req.params.postId)
    //   .populate("postedBy","_id name")
      .populate("comments.postedBy","_id name")
      .exec((err,post)=>{
          if(err || !post){
            return res.status(422).json({message:"Some error occured!!"});
          }
          const comment = post.comments.find((comment)=>
            comment._id.toString() === req.params.commentId.toString()
            );
            if (comment.postedBy._id.toString() === req.user._id.toString()) {
                const removeIndex = post.comments
                .map(comment => comment.postedBy._id.toString())
                .indexOf(req.user._id);
                post.comments.splice(removeIndex, 1);
                post.save()
                .then(result=>{
                    res.json(result)
                }).catch(err=>console.log(err));
            }
      })
  });*/

  router.delete('/deletepost/:postId',requireLogin,(req,res)=>{
    Post.findOne({_id:req.params.postId})
    .populate("postedBy","_id")
    .exec((err,post)=>{
        if(err || !post){
            return res.status(422).json({error:err})
        }
        if(post.postedBy._id.toString() === req.user._id.toString()){
              post.remove()
              .then(result=>{
                  res.json(result)
              }).catch(err=>{
                  console.log(err)
              })
        }
    })
})

module.exports = router
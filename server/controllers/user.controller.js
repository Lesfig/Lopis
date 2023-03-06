const User= require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const SECRET = process.env.SECRET_KEY

module.exports = {
    userRegister: async (req, res) =>{
        const user = req.body;
        const hash = bcrypt.hashSync(user.password, 10);
        user.password = hash;

        User.create(user).then((newUser) => {
            const userToken = jwt.sign({_id:newUser._id}, SECRET)
            res.status(201).cookie('userToken', userToken, {httpOnly:true})
            .json({ user: newUser, successMessage:"User was register" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "There was an error adding a user to the database",
        err,
      });
    });
    },
    
    loginUser: async(req, res)=>{
        const {email, password} = req.body
         User.findOne({email:email}).then((user)=>{
            const passIsValid = bcrypt.compare(password, user.password)
            if(passIsValid){
                const userToken = jwt.sign({_id:user._id}, SECRET)
                res.status(201).cookie('userToken', userToken, {httpOnly:true})
                .json({success:"user was logging", user:user})
            }else{
                        res.status(401).json({error: "Invalid Password"}) 
            }
        })
        .catch((error)=>{
            console.log(error)
            res.status(400).json(error)
        })
        
    },


    getUser:(req,res)=>{
        User.findOne({_id: req.params.id})
        .then(articles => res.json(articles))
        .catch((error)=>{
            console.log(error)
            res.status(400).json(error)
        })
    },

    editUser: (req, res)=>{
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then((updatedUser)=>{res.json(updatedUser)
        }).catch((error)=>{
            console.log(error)
            res.status(400).json(error)
        })
    },

    logOutUser:(req,res)=>{
        res.clearCookie('userToken')
        res.json({success:'User log-out'})
    },
}
module.exports.userLikes = (req, res) => {
   
    User.findOne({ _id: req.params.id})
    .then(user => res.json(user.articlesId))
    .catch((error)=>{
        console.log(error)
        res.status(400).json(error)
    })
      
}
module.exports.addLike = (req, res) => {
    const{userId, articleId} = req.body
    User.findOne({ _id: userId })
    .then(user => {
        const articles = user.articlesId
        const hasArticle = articles.includes(articleId)
        if (!hasArticle){
            articles.push(articleId)
        } else {
           newA= articles.filter(article => article !== articleId)
           user.articlesId = newA
        }
        user.save(function(){
            res.json(user.articlesId);
        });
        
    })
    .catch((error)=>{
        console.log(error)
        res.status(400).json(error)
    })
}

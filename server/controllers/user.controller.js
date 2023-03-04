const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET_KEY

module.exports = {

    userRegister: async (req, res) =>{
        try{
            const newUser = await User.create(req.body)
            const userToken = jwt.sign({_id:newUser._id}, SECRET)
            res.status(201).cookie('userToken', userToken, {httpOnly:true, expires:new Date(Date.now() + 900000)})
            .json({successMessage:"User was register", user:newUser})
        }catch(error){
            res.status(401).json(error)
        }
    },
    
    loginUser: async (req, res)=>{
        const user = await User.findOne({email:req.body.email})
        if(!user){
            res.status(400).json({error: "invalid Email/Password"})
        }
        try{
            const passIsValid = await bcrypt.compare(req.body.password, user.password )
            if(passIsValid){
                const userToken = jwt.sign({_id:user._id}, SECRET)
                console.log("Anduvoo el pass")
                res.status(201).cookie('userToken', userToken, {httpOnly:true})
                .json({successMessage:"User was login", user:user})
            }else{
                res.status(400).json({error: "Invalid Password"}) 
            }
        }catch(error){
            res.status(400).json({error: "Invalid login attempt"})
        }
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
    }
}


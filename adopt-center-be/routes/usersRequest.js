const express = require('express');
const User = require('../model/user');
const {registerValidation,loginValidation} = require('../validation')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.use((req,res,next)=>{
    console.log('A request has been made to the /users router')
    next()
})

router.get("/", async (req, res) => {
    const users = await User.find()
    if(!users) return res.status(400).send('No users')
    res.send(users)
});
router.get("/wishlist", async(req,res)=>{
   const users = await User.find()
    if(!users) return res.status(400).send('No users')
   const array = []
   const wishList =  users.map(element => element.wishList)
    wishList.forEach(element => element.forEach(el => array.push(el)))
    res.send(array)
})

router.post("/signup", async (req,res)=> {

    const { error } = registerValidation(req.body)
    if(error !== undefined) return res.status(400).send(error.details[0].message)

    const emailExist = await User.findOne({email : req.body.email})
    if(emailExist) return res.status(400).send('Email already exists')

    const phoneExist = await User.findOne({phoneNumber : req.body.phoneNumber})
    if(phoneExist) return res.status(400).send('phone number already exists')

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    const user = new User ({
        userID: req.body.userID,
        email : req.body.email,
        password: hashedPassword,
        firstName: req.body.firstName ,
        lastName: req.body.lastName,
        phoneNumber:req.body.phoneNumber,
        createdDate:req.body.createdDate,
        admin: req.body.admin,
        bio : req.body.bio,
        wishList: req.body.wishList
    })

    try {
    await user.save()
    const token = jwt.sign({
                _id: user._id, 
                firstName: user.firstName, 
                lastName: user.lastName,
                admin: user.admin
        },process.env.TOKEN_SECRET);
        
    res.cookie('jwt',token,{
        httpOnly: true,
        maxAge: 24 * 60 * 1000, // 1 day
    }).send(token)

    }catch(err) {
        res.status(400).send(err)
    }
})

router.post("/login", async(req,res)=> {

    const { error } = loginValidation(req.body)
    if(error !== undefined) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({email : req.body.email})
    if(!user) return res.status(400).send('Email does not exists')

    const validPass = await bcrypt.compare(req.body.password, user.password)
    if(!validPass) return res.status(400).send('Invalid password')

    const token = jwt.sign({
        _id: user._id, 
        firstName: user.firstName, 
        lastName: user.lastName,
        admin: user.admin
    },process.env.TOKEN_SECRET);

     res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 1000, // 1 day
    });
    res.send(token)
})

router.get("/:userID", async(req,res)=>{
    const {userID} = req.params
    const user = await User.findOne({_id : userID})
    if(!user) return res.status(400).send('user id does not exist')
    res.send(user)
})

router.put("/profileSetting/:userID",async(req,res) => {
    const {userID} = req.params
    let user = await User.findOne({_id : userID})
    if(!user) return res.status(400).send('user does not exists')

    const emailCheck = await User.findOne({email : req.body.details.email})
    if(emailCheck && user.email !== req.body.details.email) return res.status(400).send('Email already exists')
    await User.updateOne({_id : userID}, {$set : {email: req.body.details.email}})
    const PhoneCheck = await User.findOne({phoneNumber : req.body.details.phoneNumber})
    if(PhoneCheck && user.phoneNumber !== req.body.details.phoneNumber) return res.status(400).send('Phone number already exists')
    await User.updateOne({_id : userID}, {$set : {phoneNumber: req.body.details.phoneNumber}})
    
    await User.updateOne({_id : userID}, {$set : {bio: req.body.details.bio}})
    await User.updateOne({_id : userID}, {$set : {firstName: req.body.details.firstName}})
    await User.updateOne({_id : userID}, {$set : {lastName: req.body.details.lastName}})

     user = await User.findOne({_id : userID})
     res.send(user)
})

router.put("/profileSetting/password/:userID",async(req,res) => {
    const {userID} = req.params
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)
    await User.updateOne({_id : userID}, {$set : {password: hashedPassword}})
    res.status(200).send("Password changed")
})

router.get("/wishlist/:userID", async(req,res)=> {
        const {userID} = req.params
        const user = await User.findOne({_id : userID})
        if(!user) return res.status(400).send('user does not exists')
        res.send(user.wishList)
})

router.put("/wishlist/:userID", async(req,res)=>{
    const {userID} = req.params
    await User.updateOne({_id : userID}, {$push : {wishList: req.body.pets}})
    const user = await User.findOne({_id : userID})
    if(!user) return res.status(400).send('user does not exists')
    res.send(user)
})

router.delete("/wishlist/:userID", async(req,res)=>{
    const {userID} = req.params
    await User.updateOne({_id : userID}, {$pull : {wishList: {id : req.body.pets.id}}})
    const user = await User.findOne({_id : userID})
    if(!user) return res.status(400).send('user does not exists')
    res.send(user)
})


module.exports = router;
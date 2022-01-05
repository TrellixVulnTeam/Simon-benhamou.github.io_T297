const express = require('express');
const Pets = require('../model/pets')
const cloudinary = require('../utils/cloudinary')
const upload = require("../utils/multer")

const router = express.Router();

router.use((req,res,next)=>{
    console.log('A request has been made to the /pets router')
    next()
})

router.get('/', async (req, res, next) => {
  try {
    const pets = await Pets.find();
    if(!pets) return res.status(400).send('No Pets')

    res.send({ pets });
  } catch (err) {
    next(err);
  }
});

router.get('/adopted', async (req, res, next) => {
  try {
    const pets = await Pets.find();
    if(!pets) return res.status(400).send('No Pets')

    const array = pets.map(element => {
      if(element.adoptedBy != "none"){
        return element
      }
    })
    res.send(array);

  } catch (err) {
    next(err);
  }
});

router.get('/foster', async (req, res, next) => {
  try {
    const pets = await Pets.find();
    const array = pets.map(element => {
      if(element.fosterBy !== "none"){
        return element
    }})
    res.send( array );
  } catch (err) {
    next(err);
  }

});

router.get('/:petID', async (req,res,next) => {
    const {petID} = req.params
 try {
    const pets = await Pets.find();
   const element =  pets.forEach((element) => { 
        if(element.id  == petID){
            return res.send({ element });;
        } 
    });
  } catch (err) {
    next(err);
  }
})

router.post("/add",upload.single("image"), async (req, res) => {
    try{
       const result = await cloudinary.uploader.upload(req.file.path)
       
       const pet = new Pets ({
        id: req.body.id,
        type : req.body.type,
        name: req.body.name,
        status: req.body.status,
        image: result.public_id,
        color: req.body.color,
        weight: req.body.weight,
        height: req.body.height,
        bio:  req.body.bio,
        hypoallergenic: req.body.hypoallergenic,
        dietaryRestriction: req.body.dietaryRestriction,
        breedOfAnimal: req.body.breedOfAnimal,
        fosterBy: req.body.fosterBy,
        adoptedBy: req.body.adoptedBy
    })
      console.log(pet)
       const savedPet = await pet.save()
        res.send(savedPet)
    }catch(err){
        console.log(err)
    }
})

router.put("/update/:petID",upload.single('image'),async (req,res) => {
      const {petID} = req.params
      const pet = await Pets.findOne({id : petID})
      let result;
      if(!pet) return res.status(400).send('pets does not exists')
      try{
            if(req.file!== undefined){
                  result = await cloudinary.uploader.upload(req.file.path)
                  await Pets.updateOne({id : petID},{$set: {image: result.public_id}})
            }
            await Pets.updateOne({id : petID},{$set: {type: req.body.type, name: req.body.name, status: req.body.status,color: req.body.color,weight: req.body.weight,height: req.body.height,bio: req.body.bio,hypoallergenic: req.body.hypoallergenic,dietaryRestriction: req.body.dietaryRestriction,breedOfAnimal: req.body.breedOfAnimal,fosterBy: req.body.fosterBy,adoptedBy: req.body.adoptedBy}})

          if(result !== undefined){
            res.send(result.public_id)
          } 
          else {
          res.send("pet successfully updated")
          }

    }catch(err){
          res.send(err)
      }
})

router.get("/foster/:petID/:userID", async (req, res) => {
    const {petID,userID} = req.params
    const pet = await Pets.find({id : petID})
    if(pet[0].fosterBy === userID){
      res.send(true)
    }else{
      res.send(false)
    }
})

router.put("/foster/:petID/:userID", async (req, res) => {
    const {petID,userID} = req.params
     await Pets.updateOne({id : petID}, {$set : {fosterBy: userID,status:"Fostered"}})
     res.send("updated")
})

router.delete("/foster/:petID", async (req, res) => {
    const {petID} = req.params
    await Pets.updateOne({id : petID}, {$set : {fosterBy: "none",status: "Available"}})
     res.send("deleted")

})

router.get("/adopted/:petID/:userID", async (req, res) => {
    const {petID,userID} = req.params
    const pet = await Pets.find({id : petID})
    if(pet[0].adoptedBy === userID){
      res.send(true)
    }else{
      res.send(false)
    }
})

router.get("/adopted/:userID", async (req, res) => {
    const {userID} = req.params
    const pet = await Pets.find({adoptedBy : userID})
    res.send(pet)
})

router.get("/foster/:userID", async (req, res) => {
    const {userID} = req.params
    const pet = await Pets.find({fosterBy : userID})
    res.send(pet)
})

router.put("/adopted/:petID/:userID", async (req, res) => {
    const {petID,userID} = req.params
    try{
      
     await Pets.updateOne({id : petID}, {$set : {adoptedBy: userID,status:"Adopted"}})

     res.send("Adopted")

    }catch(err){
      console.log(err)
    }
})

router.delete("/adopted/:petID", async (req, res) => {
    const {petID} = req.params

    await Pets.updateOne({id : petID}, {$set : {adoptedBy: "none",status: "Available"}})

   res.send("Deleted from adopted")

})

module.exports = router;
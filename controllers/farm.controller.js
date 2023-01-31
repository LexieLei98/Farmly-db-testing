const { json } = require('body-parser');
const Farm = require('../models/farm.model');

//Post Method
const postFarm = async(req, res, next) => {
    // const data = new Farm ({
    //     name: req.body.name,
    //     address: req.body.address,
    //     description: req.body.description,
    //     profile_pic: req.body.profile_pic,
    //     rating: req.body.rating,
    //     produce: req.body.produce
    // })
    try {
        const newFarm = await Farm.create(req.body);
        res.status(201).json(newFarm)
    }
    catch (error) {
        next(error)
    }
}

//Get all Method
const getFarms = async (req, res, next) => {
    try{
        const data = await Farm.find()
        res.status(200).json(data)
    }
    catch(error){
        next(error)
    }
}

//Get by ID Method
const getFarm = async (req, res, next) => {
    try{
        const farm = await Farm.find({farm_id: req.params.id})
        if(farm.length === 0){
            return res.status(404).send({msg: 'Not Found!'})
        }
        return res.status(200).json(farm[0])
    }
    catch(error){
       next(error)
    }
}

//Update by ID Method
const updateFarm = async (req, res, next) => {
    try {
        const farmFind = await Farm.find({farm_id: req.params.id})
        if(farmFind.length === 0){
            return res.status(404).send({msg: 'Not Found!'})
        }
        if(!(Object.getOwnPropertyNames(farmFind[0].toJSON())).includes(Object.keys(req.body)[0])) {
            return res.status(400).send({msg: 'Bad Request!'})
        }

        const farm = await Farm.findOneAndUpdate(
            { farm_id: req.params.id },
            { $set: req.body },
            { new: true }
        );
      
        res.status(200).json(farm);
      } catch (error) {
        next(error)
      }
}

//Delete by ID Method
const deleteFarm = async (req, res, next) => {
    try {
        const farm1 = await Farm.find({farm_id: req.params.id})
        const farm = await Farm.findOneAndDelete({farm_id: req.params.id});
        if(farm1.length === 0){
            return res.status(404).send({msg: 'Not Found!'})
        }
        res.status(204).json(farm);
      } catch (error) {
        next(error)
      }
}

module.exports = {
    getFarms,
    getFarm,
    postFarm,
    updateFarm,
    deleteFarm,
  };

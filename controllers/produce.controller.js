const Produce = require('../models/produce.model')
const { json } = require('body-parser');

//Post Method
const postProduce = async(req, res, next) => {
    try {
        const newProduce = await Produce.create(req.body);
        res.status(201).json(newProduce)
    }
    catch (error) {
        next(error)
    }
}


//get ALL Method
const getProduce = async (req, res, next) =>{
    try{
        const produce = await Produce.find()
        res.status(200).json(produce)
    }
    catch (error) {
        next(error)
    }
}

//get by ID Method
const getProduceById = async (req, res, next) =>{
    try{
        const produce = await Produce.find({produce_id: req.params.id})
        if(produce.length ===0){
            return res.status(404).send({msg:"Not Found!"})
        }
        res.status(200).json(produce)
    }
    catch (error) {
        next(error)
    }
}


 
 module.exports = {postProduce, getProduce, getProduceById}
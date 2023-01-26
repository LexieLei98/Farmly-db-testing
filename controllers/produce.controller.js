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


//get by ID Method
const getProduceById = async (req, res, next) =>{
    try{
        const produce = await Produce.find({produce_id: req.params.id})
        res.status(200).json(produce)
    }
    catch (error) {
        next(error)
    }

}

//patch by ID method
const patchProduceById = async (req, res, next) =>{
    try {
        const produceFind = await Produce.find({produce_id: req.params.id})
        if(produceFind.length === 0){
            return res.status(404).send({msg: 'Not Found!'})
        }
        if(!(Object.getOwnPropertyNames(produceFind[0].toJSON())).includes(Object.keys(req.body)[0])) {
            return res.status(400).send({msg: 'Bad Request!'})
        }

        const produce = await Produce.findOneAndUpdate(
            { produce_id: req.params.id },
            { $set: req.body },
            { new: true }
        );
      
        res.status(200).json(produce);
      } catch (error) {
        next(error)
      }

}

const deleteProduce = async (req, res, next) => {
    try {
        const produce = await Produce.find({produce_id: req.params.id})
        const deleteProduce = await Produce.findOneAndDelete({produce_id: req.params.id});
        if(produce.length === 0){
            return res.status(404).send({msg: 'Not Found!'})
        }
        res.status(204).json(produce);
      } catch (error) {
        next(error)
      }
}
 
 module.exports = {postProduce, getProduceById, patchProduceById, deleteProduce}
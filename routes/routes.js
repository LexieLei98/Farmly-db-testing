const express = require('express');
const router = express.Router()
const Model = require('../model/model');

//Post Method
router.post('/farms', async(req, res) => {
    const data = new Model ({
        name: req.body.name,
        address: req.body.address,
        description: req.body.description,
        profile_pic: req.body.profile_pic,
        rating: req.body.rating,
        produce: req.body.produce
    })
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
router.get('/farms', async (req, res) => {
    try{
        const data = await Model.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
router.get('/farms/:id', async (req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/farms/:id', async (req, res) => {
    try {
        const id = req.params.id
        const updatedData = req.body
        const options = { new: true }

        const result = await Model.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message})
    }
})

//Delete by ID Method
router.delete('/farms/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = await Model.findByIdAndDelete(id)

        res.send(`${data.name} has been deleted from the list of farms.`)
    }
    catch (error) {
        res.status(400).json({ message: error.message})
    }
})

module.exports = router;
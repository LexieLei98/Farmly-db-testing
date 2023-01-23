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
router.get('/getAll', (req, res) => {
    res.send('Get All API')
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
router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

//Delete by ID Method
router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})

module.exports = router;
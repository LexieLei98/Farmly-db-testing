const express = require('express')

const {
    getFarms,
    getFarm,
    postFarm,
    updateFarm,
    deleteFarm,
  } = require("../controllers/farm.controller");
  
  const router = express.Router();
  
  /* Creating the routes for the product controller. */
  router.get("/farms", getFarms);
  
  router.get("/farms/:id", getFarm);
  
  router.post("/farms", postFarm);
  
  router.patch("/farms/:id", updateFarm);
  
  router.delete("/farms/:id", deleteFarm);


  // Produce Routes:

  const {
    getProduce,
    getProduceById,
    postProduce,
    patchProduceById,
    deleteProduce
  } = require("../controllers/produce.controller");
  
  
  /* Creating the routes for the produce controller. */

  router.get('/produce', getProduce)
  router.get("/produce/:id", getProduceById);
  router.post("/produce", postProduce);
  router.patch("/produce/:id", patchProduceById);
  router.delete("/produce/:id", deleteProduce);
  

  //Users Routes 

  const {
    postUser, 
    getUser,
    updateUser,
    deleteUser,
    getUsers

  } = require('../controllers/user.controller')


  //Creating the routes for the users controllers

  router.post('/users', postUser)

  router.get('/users/:id', getUser)

  router.patch('/users/:id', updateUser)

  router.delete('/user/:id', deleteUser)

  module.exports = router;
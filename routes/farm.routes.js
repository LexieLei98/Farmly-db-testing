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
    getProduceById,
    postProduce,
  } = require("../controllers/produce.controller");
  
  
  /* Creating the routes for the produce controller. */

  
  router.get("/produce/:produce_id", getProduceById);
  router.post("/produce", postProduce);
  
  module.exports = router;
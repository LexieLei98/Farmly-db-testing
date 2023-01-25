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
  
  module.exports = router;
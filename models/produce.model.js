const mongoose = require('mongoose');

const produceSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    category: {
        required: true,
        type: String},
    stock: {        
        required: true,
        type: Number},
    price: {        
        required: true,
        type: Number},
    unit: {
        required: true,
        type: String},
    description: {
        required: true,
        type: String},
    farm_id: {
        required: true,
        type: Number
    },
    user_id: {
        required: true,
        type: Number
    },
    produce_id: {
        required: false,
        type: Number
    }
})

module.exports = mongoose.model('Produce', produceSchema)

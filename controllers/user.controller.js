const { json } = require('body-parser');
const User = require('../models/user.model');

//Post Method
const postUser = async(req, res, next) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json(newUser)
    }
    catch (error) {
        next(error)
    }
}


const getUsers = async (req, res, next) => {
    try{
        const users = await User.find();
        res.status(200).json(users)
    }
    catch(error){
        next(error)
    }
}



//Update by ID Method
const updateUser = async (req, res, next) => {
    try {
  const userFind = await User.find({user_id: req.params.id})
        if(userFind.length === 0){
            return res.status(404).send({msg: 'Not Found!'})
        }
        if(!(Object.getOwnPropertyNames(userFind[0].toJSON())).includes(Object.keys(req.body)[0])) {
            return res.status(400).send({msg: 'Bad Request!'})
        }

        const user = await User.findOneAndUpdate(
            { user_id: req.params.id },
            { $set: req.body },
            { new: true }
        );
      
        res.status(200).json(user);
      } catch (error) {
        next(error)
      }
}


//Delete by ID Method
const deleteUser = async (req, res, next) => {
    try {
        const user1 = await User.find({user_id: req.params.id})
        const deleteUser = await User.findOneAndDelete({user_id: req.params.id});
        if(user1.length === 0){
            return res.status(404).send({msg: 'Not Found!'})
        }
        res.status(204).json(user1);
      } catch (error) {
        next(error)
      }
}


const getUser = async (req, res, next) => {
    try{
        const user = await User.find({user_id: req.params.id})
        if(user.length === 0){
            return res.status(404).send({msg: 'Not Found!'})
        }
        return res.status(200).json(user[0])
    }
    catch(error){
       next(error)
    }
}
module.exports = {
    getUsers,
    postUser,
    updateUser,
    deleteUser,
    getUser
  };
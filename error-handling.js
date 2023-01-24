const handle404Routes = (req, res, next) => {
    res.status(404).send({msg: "path not found"})
};

const handle500Error = (err, req, res, next) => {
    if(err.name !== undefined){
        res.status(500).send({msg: err.name});
    }
    else{
        next(err);
    }
};
module.exports = {handle404Routes, handle500Error}
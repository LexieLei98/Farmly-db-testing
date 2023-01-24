const handle500Error = (err, req, res, next) => {
    res.status(500).send({msg: "Server Error"});
};

module.exports = { handle500Error} 
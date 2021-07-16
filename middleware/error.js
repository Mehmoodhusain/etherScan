// ERROR FUNCTION
module.exports = function (err, req, res, next) {
  console.log(err);
  res.status(500).send({
    Message: "Internal Server Error!!!",
    Code: 500,
    Data: err.message,
  });
};

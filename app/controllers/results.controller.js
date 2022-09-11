const { results } = require("../models");
var db = require("../models");
var Result = db.results;

exports.getResults = (req, res) => {
  const id = req.query["postId"];

  Result.findOne({postId: id}, 'data')
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Results with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Survey with id=" + id });
    });
};

exports.postResults = (req, res) => {
  
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

    // Save survey in the database
    Result.findOneAndUpdate(
      {postId: req.body.postId}, 
      {$push: {"data": req.body.surveyResult}},
      {safe: true, upsert: true, new : true})
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Survey with id=${id}. Maybe Survey was not found!`
          });
        } else res.send({ message: "Survey was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Survey with id=" + id
        });
      });
};

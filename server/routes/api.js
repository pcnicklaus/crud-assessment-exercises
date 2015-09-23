var express = require('express');
var router = express.Router();
var Exercise = require('../models/exercise');
// var Exercise = mongoose.model('exercises');

// Get All Exercises
router.get('/exercises', function (req, res, next) {
  Exercise.find(function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json(data);
    }
  });
});

// Get One Exercise
router.get('/exercise/:id', function (req, res, next) {
  Exercise.findById(req.params.id, function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json(data);
    }
  });
});

//Post One Exericese
router.post('/exercises', function (req, res, next) {
  var newExercise = new Exercise ({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags
  });
  newExercise.save(function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json({'SUCCESS': data});
    }
  });
});

//Update / put one Exercise
router.put('/exercise/:id', function (req, res, next) {
  Exercise.findByIdAndUpdate(req.params.id, req.body, function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json({'UPDATED': data});
    }
  });
});

// DELETE ONE
router.delete('/exercise/:id', function (req, res, next) {
  Exercise.findByIdAndRemove(req.params.id, function (err, data) {
    if (err) {
      res.json({'error': err});
    } else {
      res.json({'DELETED': data});
    }
  });
});


module.exports = router;

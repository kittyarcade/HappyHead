var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/newPet');

router.post('/', function(req, res){
  var info = req.body;
  console.log('Post route hit:', req.body);
  var postPet = new User ({
    Name: info.Name,
    Animal: info.Animal,
    Age: info.Age,
    Image: info.Image
  });
  postPet.save(function(err){
    if(err){
      res.sendStatus(500);
    } else {
      res.send('pet added');
    }
  });
});

router.delete('/:id', function(req,res){
  console.log('Delete hit ', req.params.id);
  User.remove({_id: req.params.id}, function(err){
    if(err){
      console.log(err);
      res.sendStatus(500);
    } else{
      res.send('deleted!');
    }
  });
});

router.get('/', function(req, res){
  console.log('GET route hit');
  User.find({}, function(err, result){
    if(err){
      console.log('GET Broke');
      res.sendStatus(500);
    } else {
      console.log('GET Sent');
      res.send(result);
    }
  });
});//end get

module.exports = router;

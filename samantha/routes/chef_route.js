'use strict';

var Chefs = require(__dirname + '/../models/chef_model.js');
var express = require('express');
// var tokenauth = require(__dirname + '/../lib/tokenauth');

var chefRouter = module.exports = express.Router();

chefRouter.get('/chefs', (req, res) => {
  Chefs.find({}, (err, chef) => {
    res.json({data: chef});
    console.log(chef)
  });
});

chefRouter.get('/chefs/:id', (req, res) => {
  Chefs.findById(req.params.id)
    .populate('recipes', 'name')
    .exec((err, chef) => {
      // console.log(chef);
      res.json(chef);
    });
});

chefRouter.post('/chefs', (req, res) => {
  var newChef = new Chefs(req.body);
  newChef.save((err, chef) => {
    res.json(chef);
  });
});

// chefRouter.put('/chefs/:id/recipes', (req, res) => {
//   Chefs.findByIdAndUpdate(req.params.id, {$push: req.body}, (err, chef)=>{
//     if (err) return res.send(err);
//     res.json(chef);
//   });
// });

chefRouter.put('/chefs/:id', (req, res) => {
  Chefs.findByIdAndUpdate(req.params.id, req.body, (err, chef) => {
    console.log(chef);

    if (err) return res.send(err);
    res.json(chef);
  });
});


chefRouter.delete('/chefs/:id', (req, res) => {
  Chefs.findById(req.params.id, (err, chef) => {
    chef.remove(() => {
      res.json({message: 'chef removed'});
    });
  });
});

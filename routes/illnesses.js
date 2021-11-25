const express = require('express');
const router = express.Router();
const illness = require("../controllers/IllnessController.js");
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

// Get all persons
router.get('/', ensureAuthenticated, function(req, res) {
  illness.list(req, res);
});

// Get single illness by id
router.get('/show/:id', ensureAuthenticated, function(req, res) {
  illness.show(req, res);
});

// Create illness
router.get('/create', ensureAdmin, function(req, res) {
  illness.create(req, res);
});

// Save illness
router.post('/save', ensureAdmin, function(req, res) {
  illness.save(req, res);
});

// Edit illness
router.get('/edit/:id', ensureAdmin, function(req, res) {
  illness.edit(req, res);
});

// Edit update
router.post('/update/:id', ensureAdmin, function(req, res) {
  illness.update(req, res);
});

// Edit update
router.post('/delete/:id', ensureAdmin, function(req, res, next) {
  illness.delete(req, res);
});

module.exports = router;

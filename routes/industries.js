const express = require('express');
const router = express.Router();
const industry = require("../controllers/IndustryController.js");
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

// Get all persons
router.get('/', ensureAuthenticated, function(req, res) {
  industry.list(req, res);
});

// Get single industry by id
router.get('/show/:id', ensureAuthenticated, function(req, res) {
  industry.show(req, res);
});

// Create industry
router.get('/create', ensureAdmin, function(req, res) {
  industry.create(req, res);
});

// Save industry
router.post('/save', ensureAdmin, function(req, res) {
  industry.save(req, res);
});

// Edit industry
router.get('/edit/:id', ensureAdmin, function(req, res) {
  industry.edit(req, res);
});

// Edit update
router.post('/update/:id', ensureAdmin, function(req, res) {
  industry.update(req, res);
});

// Edit update
router.post('/delete/:id', ensureAdmin, function(req, res, next) {
  industry.delete(req, res);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const industryproviders = require("../controllers/IndustryProviderController.js");
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

// Get all persons
router.get('/', ensureAuthenticated, function(req, res) {
  industryproviders.list(req, res);
});

// Get single industryproviders by id
router.get('/show/:id', ensureAuthenticated, function(req, res) {
  industryproviders.show(req, res);
});

// Create industryproviders
router.get('/create', ensureAdmin, function(req, res) {
  industryproviders.create(req, res);
});

// Save industryproviders
router.post('/save', ensureAdmin, function(req, res) {
  industryproviders.save(req, res);
});

// Edit industryproviders
router.get('/edit/:id', ensureAdmin, function(req, res) {
  industryproviders.edit(req, res);
});

// Edit update
router.post('/update/:id', ensureAdmin, function(req, res) {
  industryproviders.update(req, res);
});

// Edit update
router.post('/delete/:id', ensureAdmin, function(req, res, next) {
  industryproviders.delete(req, res);
});

module.exports = router;

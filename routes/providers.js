const express = require('express');
const router = express.Router();
const provider = require("../controllers/ProviderController.js");
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

// Get all providers
router.get('/', ensureAuthenticated, function(req, res) {
  provider.list(req, res);
});

// Get single provider by id
router.get('/show/:id', ensureAuthenticated, function(req, res) {
  provider.show(req, res);
});

// Create provider
router.get('/create', ensureAdmin, function(req, res) {
  provider.create(req, res);
});

// Save provider
router.post('/save', ensureAdmin, function(req, res) {
  provider.save(req, res);
});

// Edit provider
router.get('/edit/:id', ensureAdmin, function(req, res) {
  provider.edit(req, res);
});

// Edit update
router.post('/update/:id', ensureAdmin, function(req, res) {
  provider.update(req, res);
});

// Edit update
router.post('/delete/:id', ensureAdmin, function(req, res, next) {
  provider.delete(req, res);
});

module.exports = router;

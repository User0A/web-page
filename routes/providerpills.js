const express = require('express');
const router = express.Router();
const providerPills = require("../controllers/ProviderPillController.js");
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

// Get all persons
router.get('/', ensureAuthenticated, function(req, res) {
  providerPills.list(req, res);
});

// Get single providerPills by id
router.get('/show/:id', ensureAuthenticated, function(req, res) {
  providerPills.show(req, res);
});

// Create providerPills
router.get('/create', ensureAdmin, function(req, res) {
  providerPills.create(req, res);
});

// Save providerPills
router.post('/save', ensureAdmin, function(req, res) {
  providerPills.save(req, res);
});

// Edit providerPills
router.get('/edit/:id', ensureAdmin, function(req, res) {
  providerPills.edit(req, res);
});

// Edit update
router.post('/update/:id', ensureAdmin, function(req, res) {
  providerPills.update(req, res);
});

// Edit update
router.post('/delete/:id', ensureAdmin, function(req, res, next) {
  providerPills.delete(req, res);
});

module.exports = router;

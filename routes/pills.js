const express = require('express');
const router = express.Router();
const pill = require("../controllers/PillsController.js");
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

// Get all persons
router.get('/', ensureAuthenticated, function(req, res) {
  pill.list(req, res);
});

// Get single pill by id
router.get('/show/:id', ensureAuthenticated, function(req, res) {
  pill.show(req, res);
});

// Create pill
router.get('/create', ensureAdmin, function(req, res) {
  pill.create(req, res);
});

// Save pill
router.post('/save', ensureAdmin, function(req, res) {
  pill.save(req, res);
});

// Edit pill
router.get('/edit/:id', ensureAdmin, function(req, res) {
  pill.edit(req, res);
});

// Edit update
router.post('/update/:id', ensureAdmin, function(req, res) {
  pill.update(req, res);
});

// Edit update
router.post('/delete/:id', ensureAdmin, function(req, res, next) {
  pill.delete(req, res);
});

module.exports = router;

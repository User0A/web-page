const express = require('express');
const router = express.Router();
const hospital = require("../controllers/HospitalController.js");
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

// Get all persons
router.get('/', ensureAuthenticated, function(req, res) {
  hospital.list(req, res);
});

// Get single hospital by id
router.get('/show/:id', ensureAuthenticated, function(req, res) {
  hospital.show(req, res);
});

// Create hospital
router.get('/create', ensureAdmin, function(req, res) {
  hospital.create(req, res);
});

// Save hospital
router.post('/save', ensureAdmin, function(req, res) {
  hospital.save(req, res);
});

// Edit hospital
router.get('/edit/:id', ensureAdmin, function(req, res) {
  hospital.edit(req, res);
});

// Edit update
router.post('/update/:id', ensureAdmin, function(req, res) {
  hospital.update(req, res);
});

// Edit update
router.post('/delete/:id', ensureAdmin, function(req, res, next) {
  hospital.delete(req, res);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const illnesshospitals = require("../controllers/IllnessHospitalController.js");
const { ensureAuthenticated, ensureAdmin } = require('../config/auth');

// Get all persons
router.get('/', ensureAuthenticated, function(req, res) {
  illnesshospitals.list(req, res);
});

// Get single illnesshospitals by id
router.get('/show/:id', ensureAuthenticated, function(req, res) {
  illnesshospitals.show(req, res);
});

// Create illnesshospitals
router.get('/create', ensureAdmin, function(req, res) {
  illnesshospitals.create(req, res);
});

// Save illnesshospitals
router.post('/save', ensureAdmin, function(req, res) {
  illnesshospitals.save(req, res);
});

// Edit illnesshospitals
router.get('/edit/:id', ensureAdmin, function(req, res) {
  illnesshospitals.edit(req, res);
});

// Edit update
router.post('/update/:id', ensureAdmin, function(req, res) {
  illnesshospitals.update(req, res);
});

// Edit update
router.post('/delete/:id', ensureAdmin, function(req, res, next) {
  illnesshospitals.delete(req, res);
});

module.exports = router;

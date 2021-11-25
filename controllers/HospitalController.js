const mongoose = require("mongoose");
const Hospital = require("../models/Hospital");
const Illness = require("../models/Illness");

let hospitalController = {};

let isAdmin = false;
// Show list of hospitals
hospitalController.list = function(req, res) {
    isAdmin = (req.user.role === "admin");
    Hospital.find({}).exec(function (err, hospitals) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/hospitals/index", {hospitals: hospitals, admin: isAdmin});
        }
    });
};

// Show hospital by id
hospitalController.show = function(req, res) {
    isAdmin = (req.user.role === "admin");
    Hospital.findOne({_id: req.params.id}).exec(function (err, hospital) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/hospitals/show", {hospital: hospital, admin: isAdmin});
        }
    });
};

// Create new hospital
hospitalController.create = function(req, res) {
    res.render("../views/hospitals/create");
};

// Save new hospital
hospitalController.save = function(req, res) {
    isAdmin = (req.user.role === "admin");
    var hospital = new Hospital(req.body);

    hospital.save(function(err) {
        if(err) {
            console.log(err);
            res.render("../views/hospitals/create");
        } else {
            console.log("Successfully created an hospital.");
            res.redirect("/hospitals/show/"+hospital._id);
        }
    });
};

// Edit an hospital
hospitalController.edit = function(req, res) {
    isAdmin = (req.user.role === "admin");
    if(!isAdmin){
        return res.redirect('/dashboard');
    }
    Hospital.findOne({_id: req.params.id}).exec(function (err, hospital) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            return res.render("../views/hospitals/edit", {hospital: hospital});
        }
    });
};

// Update an hospital
hospitalController.update = function(req, res) {
    Hospital.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, region: req.body.region }}, { new: true }, function (err, hospital) {
        if (err) {
            console.log(err);
            return res.render("../views/hospitals/edit", {hospital: req.body});
        }
        return res.redirect("/hospitals/show/"+hospital._id);
    });
};

// Delete an hospital
hospitalController.delete = function(req, res) {
    Hospital.remove({_id: req.params.id}, function(err) {
        if(err) {
            console.log(err);
        }
        else {
            console.log("Hospital deleted!");
            res.redirect("/hospitals");
        }
    });
};

module.exports = hospitalController;

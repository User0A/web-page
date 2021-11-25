const mongoose = require("mongoose");
const Pill = require("../models/Pill");
const Illness = require("../models/Illness");

let pillController = {};
let isAdmin = false;

// Show list of pills
pillController.list = function(req, res) {
  isAdmin = (req.user.role === "admin");
  Pill.find({}).populate("illness").exec(function (err, pills) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/pills/index", {pills: pills, admin: isAdmin});
    }
  });
};

// Show pill by id
pillController.show = function(req, res) {
  let isAdmin = (req.user.role === 'admin');
  Pill.findOne({_id: req.params.id}).exec(function (err, pill) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      // console.log(commitment.illness)
      console.log("isAdmin = " + isAdmin);
      res.render("../views/pills/show", {pill: pill, admin: isAdmin});
    }
  });
};

// Create new pill
pillController.create = function(req, res) {
  Illness.find({}).exec(function (err, illnesses) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/pills/create",  {illnesses});
    }
  });
};

// Save new pill
pillController.save = function(req, res) {
  // console.log("req.user = " + req.user);
  let pill = new Pill({
    name: req.body.name,
    date_expiration: req.body.date_expiration,
    illness: req.body.illness_id
  });

  pill.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/pills/create");
    } else {
      console.log("Successfully created an pills.");
      res.redirect("/pills/show/"+pill._id);
    }
  });
};

// Edit an pill
pillController.edit = function(req, res) {
  Pill.findOne({_id: req.params.id}).exec(function (err, pill) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/pills/edit", {pill: pill});
    }
  });
};

// Update an pill
pillController.update = function(req, res) {
  Illness.findById(req.body.illness, {new: true}, function (err, illness){
    Pill.findByIdAndUpdate(req.params.id, { $set: { name: req.body.name, illness: illness, date_expiration: req.body.date_expiration }}, { new: true }, function (err, pill) {
      if (err) {
        console.log(err);
        res.render("../views/pills/edit", {pill: req.body});
      }
      res.redirect("/pills/show/"+pill._id);
    });
  });

};

// Delete an pill
pillController.delete = function(req, res) {
  Pill.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("pill deleted!");
      res.redirect("/pills");
    }
  });
};

module.exports = isAdmin;
module.exports = pillController;

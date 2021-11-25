const mongoose = require("mongoose");
const ProviderPill = require("../models/ProviderPill");
const Pill = require("../models/Pill");
const Provider = require("../models/Provider");

let providerPillController = {};
let isAdmin = false;

// Show list of providerpill
providerPillController.list = function(req, res) {
  isAdmin = (req.user.role === "admin");
  ProviderPill.find({}).exec(function (err, providerpills) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/providerpills/index", {providerpills: providerpills, admin: isAdmin});
    }
  });
};

// Show providerpill by id
providerPillController.show = function(req, res) {
  let isAdmin = (req.user.role === 'admin');
  ProviderPill.findOne({_id: req.params.id}).exec(function (err, providerpill) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      // console.log(commitment.illness)
      console.log("isAdmin = " + isAdmin);
      res.render("../views/providerpills/show", {providerpill: providerpill, admin: isAdmin});
    }
  });
};

// Create new providerpill
providerPillController.create = function(req, res) {
  Provider.find({}).exec(function (err, providers) {
    Pill.find({}).exec(function (err, pills) {
      if (err) {
        console.log("Error:", err);
      } else {
        res.render("../views/providerpills/create", {providers, pills});
      }
    });
  });
};

// Save new providerpill
providerPillController.save = function(req, res) {
  // console.log("req.user = " + req.user);
  let providerpill = new ProviderPill({
    provider_id: req.body.provider_id,
    pill_id: req.body.pill_id
  });

  providerpill.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/providerpills/create");
    } else {
      console.log("Successfully created an providerpill.");
      res.redirect("/providerpills/show/"+providerpill._id);
    }
  });
};

// Edit an providerpill
providerPillController.edit = function(req, res) {
  ProviderPill.findOne({_id: req.params.id}).exec(function (err, providerpill) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/providerpills/edit", {providerpill: providerpill});
    }
  });
};

// Delete an providerpill
providerPillController.delete = function(req, res) {
  ProviderPill.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("providerpill deleted!");
      res.redirect("/providerpills");
    }
  });
};

module.exports = isAdmin;
module.exports = providerPillController;

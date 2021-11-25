const mongoose = require("mongoose");
const IndustryProvider = require("../models/IndustryProvider");
const Industry = require("../models/Industry");
const Provider = require("../models/Provider");

let industryProviders = {};
let isAdmin = false;

// Show list of industryproviders
industryProviders.list = function(req, res) {
  isAdmin = (req.user.role === "admin");
  IndustryProvider.find({}).exec(function (err, industryproviders) {
    if (err) {
      console.log("Error:", err);
    } else {
      res.render("../views/industryproviders/index", {industryproviders: industryproviders, admin: isAdmin});
    }
  });
};

// Show industryprovider by id
industryProviders.show = function(req, res) {
  let isAdmin = (req.user.role === 'admin');
  IndustryProvider.findOne({_id: req.params.id}).exec(function (err, industryprovider) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      // console.log(commitment.illness)
      console.log("isAdmin = " + isAdmin);
      res.render("../views/industryproviders/show", {industryprovider: industryprovider, admin: isAdmin});
    }
  });
};

// Create new industryprovider
industryProviders.create = function(req, res) {
  Provider.find({}).exec(function (err, providers) {
    Industry.find({}).exec(function (err, industries) {
      if (err) {
        console.log("Error:", err);
      } else {
        res.render("../views/industryproviders/create", {providers, industries});
      }
    });
  });
};

// Save new industryprovider
industryProviders.save = function(req, res) {
  // console.log("req.user = " + req.user);
  let industryprovider = new IndustryProvider({
    industry_id: req.body.industry_id,
    provider_id: req.body.provider_id
  });

  industryprovider.save(function(err) {
    if(err) {
      console.log(err);
      res.render("../views/industryproviders/create");
    } else {
      console.log("Successfully created an industryproviders.");
      res.redirect("/industryproviders/show/"+industryprovider._id);
    }
  });
};

// Edit an industryprovider
industryProviders.edit = function(req, res) {
  IndustryProvider.findOne({_id: req.params.id}).exec(function (err, industryprovider) {
    if (err) {
      console.log("Error:", err);
    }
    else {
      res.render("../views/industryproviders/edit", {industryprovider: industryprovider});
    }
  });
};

// Delete an industryprovider
industryProviders.delete = function(req, res) {
  IndustryProvider.remove({_id: req.params.id}, function(err) {
    if(err) {
      console.log(err);
    }
    else {
      console.log("industryprovider deleted!");
      res.redirect("/industryproviders");
    }
  });
};

module.exports = isAdmin;
module.exports = industryProviders;

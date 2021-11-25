const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Illness = require('./Illness.js');

let Hospital = new Schema({
  name: String,
  region: String,
  kind: String,
  // illnesses: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Illness"
  // }
  // ]
});

module.exports = mongoose.model('Hospital', Hospital);

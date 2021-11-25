const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Hospital = require('./Hospital.js');
const Pill = require('./Pill.js');

let IllnessSchema = new Schema({
  name: String,
  symptoms: String,
  healing: Number,
  // hospitals: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Hospital"
  // }],
  // pills: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Pill"
  // }]
});

module.exports = mongoose.model('Illness', IllnessSchema);

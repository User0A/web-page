const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Pill = require('./Pill.js');
const Industry = require('./Industry.js');

let ProviderSchema = new Schema({
  name: String,
  budget: Number,
  // pills: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Pill"
  // }
  // ],
  // industries: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Industry"
  // }
  // ],
});

module.exports = mongoose.model('Provider', ProviderSchema);

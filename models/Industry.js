const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Provider = require('./Provider.js');

let IndustrySchema = new Schema({
  name: String,
  // providers: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Provider"
  // }
  // ]
});

module.exports = mongoose.model('Industry', IndustrySchema);

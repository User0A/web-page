const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Illness = require('./Illness.js');
const Provider = require('./Provider.js');

let PillSchema = new Schema({
  name: String,
  date_expiration: Date,
  // providers: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "Provider"
  // }
  // ],
  illness: {
    type: Schema.Types.ObjectId,
    ref: "Illness"
  }
});

module.exports = mongoose.model('Pill', PillSchema);

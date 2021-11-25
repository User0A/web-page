const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let HospitalIllnessSchema = new Schema({
    illness_id: String,
    hospital_id: String
});

module.exports = mongoose.model('HospitalIllness', HospitalIllnessSchema);

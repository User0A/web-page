const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let IndustryProviderSchema = new Schema({
    industry_id: String,
    provider_id: String
});

module.exports = mongoose.model('IndustryProvider', IndustryProviderSchema);

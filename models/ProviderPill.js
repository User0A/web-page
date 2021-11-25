const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProviderPillSchema = new Schema({
    pill_id: String,
    provider_id: String
});

module.exports = mongoose.model('ProviderPill', ProviderPillSchema);

var mongoose = require('mongoose');

var TrackerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: {type: String, required: true },
    mobile: {type: String, required: true },
    session: {type: Number, required: true },
    date: {type: Date, default: Date.now },
    storeConsent: {type: String, default: "" },
    badgeHolder: {type: String, default: "" },
});

var Tracker = mongoose.model('Tracker', TrackerSchema);

module.exports = Tracker;

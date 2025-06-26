const mongoose = require('mongoose');

const PeriodEntrySchema = new mongoose.Schema({
  lastPeriod: { type: Date, required: true },
  cycleLength: { type: Number, required: true },
  nextPeriod: { type: Date, required: true },
  ovulationDate: { type: Date, required: true },
  fertileWindow: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  mood: { type: String },
  symptoms: [{ type: String }],
  notes: { type: String },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PeriodEntry', PeriodEntrySchema); 
const express = require('express');
const router = express.Router();
const PeriodEntry = require('../models/PeriodEntry');

// POST /api/period - Save a new period entry
router.post('/', async (req, res) => {
  try {
    const entry = new PeriodEntry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/period - Get all period entries (sorted by timestamp desc)
router.get('/', async (req, res) => {
  try {
    const entries = await PeriodEntry.find().sort({ timestamp: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 
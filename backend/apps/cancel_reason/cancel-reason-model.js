const mongoose = require('mongoose');

const cancelReasonSchema = new mongoose.Schema({
  reason: {
    type: String,
    required: true,
  },
});

const CancelReason = mongoose.model('CancelReason', cancelReasonSchema);

module.exports = CancelReason;

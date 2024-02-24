const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  startupName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  website: { type: String, required: true },
  dateOfAssociation: { type: String, required: true },
  authorizedPerson: { type: String, required: true },
  status: { type: String, required: true },
  dateOfGraduation: { type: String },
  startupOperational: { type: String, default: true },
  description: { type: String, required: true },
});

const Startup = mongoose.model('Startup', startupSchema);

module.exports = Startup;

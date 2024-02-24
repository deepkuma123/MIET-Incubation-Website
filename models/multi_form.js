const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  // Institute Fields
  instituteName: String,
  teamName: String,
  numMembers: Number,
  projectTitle: String,
  mentorName: String,
  mentorDesignation: String,
  mentorPhone: String,
  mentorEmail: String,
  mentorGender: String,
  teamLeaderName: String,
  teamLeaderProfession: String,
  teamLeaderPhone: String,
  teamLeaderEmail: String,
  teamLeaderGender: String,
  teamMembers: [
    {
      name: String,
      profession: String,
      phone: String,
      email: String,
      gender: String,
    },
  ],

  // Startup Fields
  ideaDescription: String,
  noveltyDescription: String,
  socialImpact: String,
  competitors: String,
  targetCustomers: String,
  mentorshipGuidance: String,
  coWorkingSpace: String,
  iprSupport: String,
  incubationSupport: String,
  attachment: String,

  // Institute Sector Fields
  health: String,
  agriculture: String,
  animalHusbandry: String,
  smartVehicles: String,
  foodProcessing: String,
  optionOne: String,
  roboticsAndDrones: String,
  waterManagement: String,
  sustainableSanitization: String,
  cleanWater: String,
  renewableEnergy: String,
  ictAndCybersecurity: String,
  others: String,

  // Stage of Innovation/Project Fields
  ideation: String,
  poc: String,
  product: String,
});

const ApplicationModel = mongoose.model('MultiForm', ApplicationSchema);

module.exports = ApplicationModel;

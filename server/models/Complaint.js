const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  complaint_id: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  email: { type: String },
  description: { type: String, required: true },
  location: { type: Object, required: true },
  area: { type: String, required: true },
  image: { type: String },
  status: { type: String, default: "pending" },
  progress: { type: String, default: "Recorded" },
});


module.exports = mongoose.model("Complaint", ComplaintSchema);

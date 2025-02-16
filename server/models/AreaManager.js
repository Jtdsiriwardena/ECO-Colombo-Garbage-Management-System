const mongoose = require('mongoose');

const areaManagerSchema = new mongoose.Schema({
  NIC_no: {
    type: String,
    required: true,
    unique: true, 
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  password: {
    type: String,
    required: true,
  },
});

const AreaManager = mongoose.model('AreaManager', areaManagerSchema);

module.exports = AreaManager;

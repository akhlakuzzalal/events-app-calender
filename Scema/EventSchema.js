const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = Schema(
  {
    email: String,
    name: String,
    date: String,
    description: String,
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model('Comment', eventSchema);

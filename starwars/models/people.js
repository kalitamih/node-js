const mongoose = require('mongoose');

const { Schema } = mongoose;

const peopleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birth_year: {
    type: String,
    required: true,
  },
  eye_color: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'unknown', 'n/a', 'none', 'hermaphrodite'],
    required: true,
  },
  hair_color: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  mass: {
    type: String,
    required: true,
  },
  skin_color: {
    type: String,
    required: true,
  },
  homeworld: {
    type: String,
    required: true,
  },
  films: {
    type: [String],
    required: true,
  },
  species: {
    type: [String],
    required: true,
  },
  starships: {
    type: [String],
    required: true,
  },
  vehicles: {
    type: [String],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  created: {
    type: String,
    required: true,
  },
  edited: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('People', peopleSchema);

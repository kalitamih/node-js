const mongoose = require('mongoose');

const { Schema } = mongoose;

const peopleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  birth_year: {
    type: String,
    validate: {
      validator: v => (
        /^[\d.]{1,4}BBY$|^unknown$/.test(v)
      ),
      message: props => `${props.value} is not a valid year!`,
    },
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
    validate: {
      validator: v => (
        /^\d{1,3}$|^unknown$/.test(v)
      ),
      message: props => `${props.value} is not a valid height!`,
    },
    required: true,
  },
  mass: {
    type: String,
    validate: {
      validator: v => (
        /^[\d.,]{1,5}$|^unknown$/.test(v)
      ),
      message: props => `${props.value} is not a valid mass!`,
    },
    required: true,
  },
  skin_color: {
    type: String,
    required: true,
  },
  homeworld: {
    type: String,
    validate: {
      validator: v => (
        /^https:\/\/swapi.co\/api\/planets\/\d{1,2}\/$/.test(v)
      ),
      message: props => `${props.value} is not a valid homeworld!`,
    },
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
    validate: {
      validator: v => (
        /^https:\/\/swapi.co\/api\/people\/\d{1,2}\/$/.test(v)
      ),
      message: props => `${props.value} is not a valid url!`,
    },
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

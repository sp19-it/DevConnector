const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  const errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  // data.name = !isEmpty(data.name) ? data.name : '';
  // data.avatar = !isEmpty(data.avatar) ? data.avatar : '';

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 200 characters';
  }

  // if (Validator.isEmpty(data.name)) {
  //   errors.name = 'Name field is required'
  // }

  // if (Validator.isEmpty(data.avatar)) {
  //   errors.avatar = 'Avatar field is required'
  // }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
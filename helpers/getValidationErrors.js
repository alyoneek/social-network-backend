const getValidationErrors = (error) => {
  let errors = {};

  Object.keys(error.errors).forEach((key) => {
    errors[key] = error.errors[key].message;
  });

  return { validationErrors: errors };
};

module.exports = getValidationErrors;

const errorHandler = function (payload, schema) {

  const { error } = schema.validate(payload, { abortEarly: false });

  let errors = {};

  if (error) {
    error.details.forEach((item) => {
      let key = item.context.key;

      let errorBag = {
        message: item.message,
      };

      errors[key] = errorBag;
    });

    return errors;
  }

  return null;
};

export default errorHandler;

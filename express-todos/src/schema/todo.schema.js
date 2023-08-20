// import dependencies
import Joi from "joi";

// define handler
// let expirationDate = new Date('2023-07-26T11:43:33');
const todoValidationSchema = Joi.object({
  title: Joi.string().min(3).max(10).required(),
  completed: Joi.bool().default(false),

  body: Joi.string().min(3).max(500),
  dueDate: Joi.date().greater('now'),
  //.max(expirationDate),
  priority: Joi.string().valid('High', 'Medium', 'Low').default('High'),
});

// export handler
export default todoValidationSchema;
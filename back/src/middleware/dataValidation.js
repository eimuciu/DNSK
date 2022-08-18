const joi = require('joi');
const { reformatError } = require('../utils/errorFormatter');

const dataschema = joi
  .object({
    id: joi.string().trim(),
    name: joi.string().trim().required(),
    plate: joi.string().trim().required(),
  })
  .options({ abortEarly: false });

async function validateData(req, res, next) {
  const { baseUrl } = req;
  try {
    let data = req.body;

    if (baseUrl === '/plates') {
      data = await dataschema.validateAsync(data);
    }

    req.body = data;
    next();
  } catch (err) {
    res.status(400).json(reformatError(err));
  }
}

module.exports = { validateData };

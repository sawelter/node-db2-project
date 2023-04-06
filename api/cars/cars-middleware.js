const Car = require('./cars-model');
const vinValidator = require('vin-validator');
const db = require('../../data/db-config');



//checkCarId returns a status 404 with a { message: "car with id <car id> is not found" } if the id in req.params does not exist in the database.
const checkCarId = async (req, res, next) => {
  const { id } = req.params;
  
  try {
    const car = await Car.getById(id);
    if(car) {
      req.car = car;
      next();
    } else {
      res.status(404).json({
        message: `car with id ${id} is not found`
      })
    }

  } catch (err) {
    next(err);
  }
}

//checkCarPayload returns a status 400 with a { message: "<field name> is missing" } if any required field is missing.
const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body;

  if(!vin) {
    res.status(400).json({message: "vin is missing"});
  } else if(!make) {
    res.status(400).json({message: "make is missing"});
  } else if(!model) {
    res.status(400).json({message: "model is missing"});
  } else if (mileage === null || mileage === undefined) {
    res.status(400).json({message: "mileage is missing"});
  } else {
    next();
  }
}

// checkVinNumberValid returns a status 400 with a { message: "vin <vin number> is invalid" } if the vin number is invalid.
const checkVinNumberValid = (req, res, next) => {
  let { vin } = req.body;
  vin = vin.toString();
  if(vinValidator.validate(vin)) {
    next();
  } else {
    res.status(400).json({message: `vin ${vin} is invalid` })
  }
}

// checkVinNumberUnique returns a status 400 with a { message: "vin <vin number> already exists" } if the vin number already exists in the database.
const checkVinNumberUnique = async (req, res, next) => {
  const { vin } = req.body;

  const carExists = await db('cars').where('vin', vin).first();

  if(carExists) {
    res.status(400).json({message: `vin ${vin} already exists`})
  } else {
    next();
  }
}


module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}
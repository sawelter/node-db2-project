const mid = require('./cars-middleware');
const Car = require('./cars-model');
const router = require('express').Router();


router.get('/', (req, res, next) => {
    Car.getAll()
        .then(cars => {
            res.json(cars);
        })
        .catch(next);
})

router.get('/:id', mid.checkCarId, (req, res, next) => {
    const { id } = req.params;
    Car.getById(id)
        .then(car => {
            res.json(car);
        })
        .catch(next);
})

router.post('/', mid.checkCarPayload, mid.checkVinNumberUnique, (req, res, next) => {
    Car.create(req.body)
        .then(newCar => {
            res.json(newCar);
        })
        .catch(next);
})


module.exports = router;


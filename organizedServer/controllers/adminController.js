const models = require('../models');
const Validator = require('fastest-validator')

function addCar(req, res) {
    const car = {
        brand   : req.body.brand,
        model   : req.body.model,
        year    : req.body.year,
        capacity: req.body.capacity,
        color   : req.body.color,
        type    : req.body.type,
        status  : req.body.status,
    };

    const schema = {
        brand   : {type: 'string', optional: false, max: "100"},
        model   : {type: 'string', optional: false, max: "100"},
        year    : {type: 'string', optional: false, max: "9999"},
        capacity: {type: 'number', optional: false, max: "100"},
        color   : {type: 'string', optional: false, max: "100"},
        type    : {type: 'string', optional: false, max: "100"},
        status  : {type: 'string', optional: false},
    };

    const v = new Validator();
    const validationResponse = v.validate(car, schema);

    if(validationResponse != true) {
        return res.status(400).json({
            message: 'Validation failed',
            error: validationResponse
        });
    };

    models.car.create(car).then(result => {
        res.status(201).json({
            message: "Car added successfully",
            post: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
};

module.exports = {
    addCar: addCar
}
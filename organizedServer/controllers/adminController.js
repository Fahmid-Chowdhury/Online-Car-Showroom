const models = require('../models');
const Validator = require('fastest-validator')

function addCar(req, res) {
    const car = {
        brand   : req.body.brand,
        model   : req.body.model,
        year    : req.body.year,
        capacity: parseInt(req.body.capacity),
        color   : req.body.color,
        type    : req.body.type,
        status  : req.body.status,
    };

    const schema = {
        brand   : {type: 'string', optional: false},
        model   : {type: 'string', optional: false},
        year    : {type: 'string', optional: false},
        capacity: {type: 'number', optional: false},
        color   : {type: 'string', optional: false},
        type    : {type: 'string', optional: false},
        status  : {type: 'string', optional: false}
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
        res.status(200).json({
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
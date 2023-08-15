const Validator = require('fastest-validator');
const mysql = require('mysql');
const fs = require('fs');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'carshowroom',
  });

function addCar(req, res) {
    const car_info = {
        brand       : req.body.brand,
        model       : req.body.model,
        year        : req.body.year,
        price       : req.body.price,
        engine      : req.body.engine,
        transmission: req.body.transmission,
        fuel        : req.body.fuel,
        description : req.body.description
    };

    const schema = {
        brand       : {type: 'string', optional: false},
        model       : {type: 'string', optional: false},
        year        : {type: 'string', optional: false, max: "4"},
        price       : {type: 'string', optional: false},
        engine      : {type: 'string', optional: false},
        transmission: {type: 'string', optional: false},
        fuel        : {type: 'string', optional: false},
        description : {type: 'string', optional: false, max: "6000"}
    };

    const v = new Validator();
    const validationResponse = v.validate(car_info, schema);

    if(validationResponse != true) {
        fs.unlink(`./uploads/${req.body.image}`, (err) => {
            if(err) {
                res.status(500).json({
                    message: "Something went wrong, please try again",
                    error: err
                });
            };
        });
        return res.status(400).json({
            message: 'Validation failed',
            error: validationResponse
        });
    };

    pool.getConnection((err, connection) => {
        if(err) {
            fs.unlink(`./uploads/${req.body.image}`, (err) => {
                if(err) {
                    res.status(500).json({
                        message: "Something went wrong, please try again",
                        error: err
                    });
                };
            });
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        };

        const sqlQuery = 'SELECT * FROM car WHERE brand = ? AND model = ? AND year = ?';
        const car = [
            req.body.brand,
            req.body.model,
            req.body.year
        ]
        connection.query(sqlQuery, car, (queryErr, results) => {
            if(queryErr) {
                fs.unlink(`./uploads/${req.body.image}`, (err) => {
                    if(err) {
                        res.status(500).json({
                            message: "Something went wrong, please try again",
                            error: err
                        });
                    };
                });
                res.status(400).json({
                    message: "Something went wrong, please try again",
                    error: queryErr
                });
            };
            if(results.length != 0){
                fs.unlink(`./uploads/${req.body.image}`, (err) => {
                    if(err) {
                        res.status(500).json({
                            message: "Something went wrong, please try again",
                            error: err
                        });
                    };
                });
                res.status(409).json({
                    message: "This car already exists",
                    results: results
                });

            }else {
                const sqlQuery = 'INSERT INTO car (brand, model, year, price, engine, transmission, fuel, description,images) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)';
                const new_car = [
                    req.body.brand,
                    req.body.model,
                    req.body.year,
                    req.body.price,
                    req.body.engine,
                    req.body.transmission,
                    req.body.fuel,
                    req.body.description,
                    req.body.image
                ]
                connection.query(sqlQuery, new_car, (queryErr, results) => {
                    connection.release();
                    if(queryErr) {
                        fs.unlink(`./uploads/${req.body.image}`, (err) => {
                            if(err) {
                                res.status(500).json({
                                    message: "Something went wrong, please try again",
                                    error: err
                                });
                            };
                        });
                        res.status(400).json({
                            message: "Something went wrong, please try again",
                            error: queryErr
                        });
                    };

                    if(results) {
                        res.status(200).json({
                            message: "New car inserted successfully",
                            results: results
                        });
                    };
                })
            }
        })
    });
};

module.exports = {
    addCar: addCar
}
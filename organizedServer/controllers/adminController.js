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
                const sqlQuery = 'INSERT INTO car (brand, model, year, price, engine, transmission, fuel, description, images) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
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
function getOrders(req, res) {
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connectio",
                error: err
            });
        };

        const sqlQuery = 'SELECT c.car_id, co.order_id, co.user_id, co.order_date, co.total_price, co.contact_number, c.brand, c.model, c.year, c.price FROM customer_order co INNER JOIN car c ON co.car_id = c.car_id and co.order_status = "pending"';
        connection.query(sqlQuery, (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong, please try again",
                    error: queryErr
                });
            };

            if(results) {
                res.status(200).json({
                    message: "Orders retrieved successfully",
                    results: results
                });
            };
        })
    });
};

function confirmOrder(req, res) {
    const order_info = {
        order_id: req.body.order_id,

    };
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');

    const paymentReference = `${year}${month}${day}${hour}${minute}${second}`;
    console.log(paymentReference);
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        };
        const sqlQuery = 'UPDATE customer_order SET order_status = "confirmed", payment_status = "pending", payment_reference = ?  WHERE order_id = ?';
        connection.query(sqlQuery, [paymentReference, order_info.order_id], (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong, please try again",
                    error: queryErr
                });
            };

            
                res.status(200).json({
                    message: "Order confirmed successfully",
                    results: results
                });
            
        })  

    });
};
function cancelOrder(req, res) {
    
    const order_info = {
        order_id: req.body.order_id,
    };
    console.log(order_info);
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        };
        const sqlQuery = 'UPDATE customer_order SET order_status = "cancelled" WHERE order_id = ?';
        connection.query(sqlQuery, order_info.order_id, (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong, please try again",
                    error: queryErr
                });
            };

            
                res.status(200).json({
                    message: "Order cancelled successfully",
                    results: results
                });
            
        })  

    });
};


function confirmPayment(req, res) {
    const order_info = {
        order_id: req.body.order_id,

    };
    

    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        };
        const sqlQuery = 'UPDATE customer_order SET order_status = "processing", payment_status = "paid"  WHERE order_id = ?';
        connection.query(sqlQuery, [order_info.order_id], (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong, please try again",
                    error: queryErr
                });
            };

            
                res.status(200).json({
                    message: "Payment status 'paid'",
                    results: results
                });
            
        })  

    });
};

function getPayments(req, res) {
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connectio",
                error: err
            });
        };

        const sqlQuery = 'SELECT c.car_id, co.order_id, co.user_id, co.order_date, co.total_price, co.contact_number, c.brand, c.model, c.year, c.price,co.payment_reference FROM customer_order co INNER JOIN car c ON co.car_id = c.car_id and co.order_status = "confirmed" and co.payment_status = "pending"';
        connection.query(sqlQuery, (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong, please try again",
                    error: queryErr
                });
            };

            if(results) {
                res.status(200).json({
                    message: "Orders retrieved successfully",
                    results: results
                });
            };
        })
    });
};

module.exports = {
    addCar: addCar,
    getOrders: getOrders,
    confirmOrder: confirmOrder,
    cancelOrder: cancelOrder,
    getPayments: getPayments,
    confirmPayment: confirmPayment
}
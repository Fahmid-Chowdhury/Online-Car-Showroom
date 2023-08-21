
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator')
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'carshowroom',
  });

function signUp(req, res) {
    const credentials = {
        name    : req.body.name,
        email   : req.body.email,
        password: req.body.password,
        phone   : req.body.phone,
        address : req.body.address,
        role    : 'user'
    };
    const schema = {
        name    : {type: 'string', optional: false, max: "100", min: "1"},
        email   : {type: 'string', optional: false, max: "100", min: "6"},
        password: {type: 'string', optional: false, min: "6"},
        address : {type: 'string', optional: false},
        phone   : {type: 'string', optional: false}
    };
    const v = new Validator();
    const validationResponse = v.validate(credentials, schema);

    if(validationResponse != true) {
        return res.status(400).json({
            message: 'Validation failed',
            error: validationResponse
        });
    };

    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }

        const sqlQuery = 'SELECT * FROM user WHERE email = ?';
        connection.query(sqlQuery, credentials.email, (queryErr, results) => {
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong, please try again",
                    error: queryErr
                });
            };
            console.log(results)
            if(results.length != 0){
                res.status(409).json({
                    message: 'This email already exists',
                    results: results
                })
            }else {
                bcryptjs.genSalt(10, function(err, salt) {
                    bcryptjs.hash(req.body.password, salt, function(err, hash) {
                        const users = [
                            req.body.name,
                            req.body.email,
                            hash,
                            req.body.phone,
                            req.body.address,
                            'user'
                        ];
                        const sqlQuery = 'INSERT INTO user (user_name, email, password, phone, address, role) VALUES (?, ?, ?, ?, ?, ?)';
                        connection.query(sqlQuery, users, (queryErr, results) => {
                            connection.release();
                            if(queryErr) {
                                res.status(400).json({
                                    message: "Something went wrong",
                                    error: queryErr
                                });
                            };
                            if(results) {
                                res.status(200).json({
                                    message: "User created successfully",
                                    results: results
                                });
                            };
                        });
                    });
                }); 
            };
        });
    });
};

function login(req, res){
    const credentials = {
        email   : req.body.email,
        password: req.body.password,
    };

    const schema = {
        email   : {type: 'string', optional: false, max: "100", min: "10"},
        password: {type: 'string', optional: false, min: "6"}
    };

    const v = new Validator();
    const validationResponse = v.validate(credentials, schema);

    if(validationResponse != true) {
        return res.status(400).json({
            message: 'Validation failed',
            error: validationResponse
        });
    };
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }

        const sqlQuery = 'SELECT * FROM user WHERE email = ?';
        connection.query(sqlQuery, req.body.email, (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong. Please try again",
                    error: queryErr
                });
            };
            if(results.length == 0){
                res.status(409).json({
                    message: 'This email does not exist',
                    results: results
                })
            }else {
                const user = results[0];
                const user_id = user.user_id;
                const email = user.email;
                const name = user.user_name;
                const role = user.role;
                const passwordHash = user.password;
                bcryptjs.compare(req.body.password, passwordHash, function(err, result){
                    if(result){
                        const token = jwt.sign({
                            user_id: user_id,
                            email  : email,
                            name   : name,
                            role   : role
                        }, process.env.JWT_KEY, function(err, token) {
                            res.status(200).json({
                                message: 'Authentication successful',
                                token: token
                            })
                        });
                    }else {
                        res.status(401).json({
                            message: 'Invalid credentials, please try again'
                        });
                    };
                });
            };
        });
    });
};

function allcars(req, res){
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }
        const sqlQuery = 'SELECT * FROM car';
        connection.query(sqlQuery, (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong. Please try again",
                    error: queryErr
                });
            };
            if(results.length == 0){
                res.status(409).json({
                    message: 'No cars available',
                    results: results
                })
            }else {
                res.status(200).json({
                    message: 'Cars found',
                    results: results
                })
            };
        });
    });
};

function userProfile(req, res){
    const credentials = {
        user_id: req.params.userId
    };
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }

        const sqlQuery = 'SELECT * FROM user WHERE user_id = ?';
        connection.query(sqlQuery, credentials.user_id, (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong. Please try again",
                    error: queryErr
                });
            };
            if(results.length == 0){
                res.status(409).json({
                    message: 'No user found',
                    results: results
                })
            }else {
                res.status(200).json({
                    message: 'User found', 
                    results: results
                })
            };
        });
    });
};

function userNameUpdate(req, res){
    const credentials = {
        user_id: req.body.user_id,
        newName: req.body.newName
    };
    const schema = {
        newName: {type: 'string', optional: false, max: "100", min: "1"},
    };
    const v = new Validator();
    const validationResponse = v.validate(credentials, schema);

    if(validationResponse != true) {
        return res.status(401).json({
            message: 'User Name cannot be empty and must be less than 100 characters',
            error: validationResponse
        });
    };

    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }
        const sqlQuery = 'UPDATE user SET user_name = ?  WHERE user_id = ?';
        connection.query(sqlQuery, [credentials.newName, credentials.user_id], (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong. Please try again",
                    error: queryErr
                });
            };
            return res.status(200).json({
                message: 'Profile update successfull',
                result: results
            });
        });
    });
};

function userEmailUpdate(req, res){
    const credentials = {
        user_id : req.body.user_id,
        newEmail: req.body.newEmail
    };
    const schema = {
        newEmail   : {type: 'string', optional: false, max: "100", min: "6"},
    };
    const v = new Validator();
    const validationResponse = v.validate(credentials, schema);

    if(validationResponse != true) {
        console.log(validationResponse)
        return res.status(400).json({
            message: 'Email cannot be empty and must be atleat 6 characters',
            error: validationResponse
        });
    };

    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }
        
        const sqlQuery = 'SELECT * FROM user WHERE email = ?';
        connection.query(sqlQuery, credentials.newEmail, (queryErr, results) => {
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong, please try again",
                    error: queryErr
                });
            };
            console.log(results)
            if(results.length != 0){
                res.status(409).json({
                    message: 'This email already exists',
                    results: results
                })
            }
            else{
                const sqlQuery = 'UPDATE user SET email = ?  WHERE user_id = ?';
                connection.query(sqlQuery, [credentials.newEmail, credentials.user_id], (queryErr, results) => {
                connection.release();
                if(queryErr) {
                    res.status(400).json({
                        message: "Something went wrong. Please try again",
                        error: queryErr
                    });
                };
                return res.status(200).json({
                    message: 'Profile update successfull',
                    result: results
                });
                });
            };

        });
    });
};

function userPhoneUpdate(req, res){
    const credentials = {
        user_id : req.body.user_id,
        newPhone: req.body.newPhone
    };
    const schema = {
        newPhone   : {type: 'string', optional: false, min: "10"}
    };
    const v = new Validator();
    const validationResponse = v.validate(credentials, schema);

    if(validationResponse != true) {
        return res.status(400).json({
            message: 'Phone number cannot be empty and must be atleat 10 characters',
            error: validationResponse
        });
    };

    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }
        const sqlQuery = 'UPDATE user SET phone = ?  WHERE user_id = ?';
        connection.query(sqlQuery, [credentials.newPhone, credentials.user_id], (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong. Please try again",
                    error: queryErr
                });
            };
            return res.status(200).json({
                message: 'Profile update successfull',
                result: results
            });
        });
    });
};

function userAddressUpdate(req, res){
    const credentials = {
        user_id   : req.body.user_id,
        newAddress: req.body.newAddress
    };
    const schema = {
        newAddress   : {type: 'string', optional: false, min:"2"}
    };
    const v = new Validator();
    const validationResponse = v.validate(credentials, schema);

    if(validationResponse != true) {
        return res.status(400).json({
            message: 'Validation failed',
            error: validationResponse
        });
    };

    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }
        const sqlQuery = 'UPDATE user SET address = ?  WHERE user_id = ?';
        connection.query(sqlQuery, [credentials.newAddress, credentials.user_id], (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong. Please try again",
                    error: queryErr
                });
            };
            return res.status(200).json({
                message: 'Profile update successfull',
                result: results
            });
        });
    });
};

function passwordUpdate(req, res){
    const credentials = {
        user_id    : req.body.user_id,
        newPassword: req.body.newPassword
    };
    console.log(req.params.userId)
    const schema = {
        user_id    : {type: 'number'},
        newPassword: {type: 'string', optional: false, min: "6"},
    };
    const v = new Validator();
    const validationResponse = v.validate(credentials, schema);

    if(validationResponse != true) {
        return res.status(400).json({
            message: 'Password must be at least 6 characters long',
            error: validationResponse
        });
    };
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }
        bcryptjs.genSalt(10, function(err, salt) {
            bcryptjs.hash(req.body.newPassword, salt, function(err, hash) {
                const sqlQuery = 'UPDATE user SET password = ?  WHERE user_id = ?';
                connection.query(sqlQuery, [hash, credentials.user_id], (queryErr, results) => {
                    connection.release();
                    if(queryErr) {
                        res.status(400).json({
                            message: "Something went wrong",
                            error: queryErr
                        });
                    };
                    return res.status(200).json({
                        message: "Password update successfull",
                        results: results
                    });
                });
            });
        });
    });     
};
function orderRetrieve(req, res){
    const credentials = {
        user_id: req.body.userId
    }; 

    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }
        const sqlQuery = "SELECT co.order_id, c.brand, c.model, c.year, co.order_date, co.total_price, co.payment_reference, co.payment_status, co.delivery_address, co.contact_number, co.order_status FROM customer_order co JOIN car c ON co.car_id = c.car_id and co.user_id = ? ORDER BY co.order_id DESC;"
        connection.query(sqlQuery, credentials.user_id, (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong",
                    error: queryErr
                });
            };
            return res.status(200).json({
                message: "Orders retrieved successfully",
                orders: results
            });
        });
    });
}

module.exports = {
    signUp: signUp,
    login: login,
    allCars: allcars,
    userProfile: userProfile,
    userNameUpdate: userNameUpdate,
    userEmailUpdate: userEmailUpdate,
    userPhoneUpdate: userPhoneUpdate,
    userAddressUpdate: userAddressUpdate,
    passwordUpdate: passwordUpdate,
    orderRetrieve: orderRetrieve
}
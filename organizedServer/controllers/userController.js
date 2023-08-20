
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
        role    : 'user'
    };
    const schema = {
        name    : {type: 'string', optional: false, max: "100", min: "1"},
        email   : {type: 'string', optional: false, max: "100", min: "6"},
        password: {type: 'string', optional: false, min: "6"},
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
        email: req.body.email,
        password: req.body.password,
    };

    const schema = {
        email: {type: 'string', optional: false, max: "100", min: "10"},
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
                            email: email,
                            name: name,
                            role: role
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

function userprofile(req, res){

    const credentials = {
        user_id: req.params.userid
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
module.exports = {
    signUp: signUp,
    login: login,
    allCars: allcars,
    userProfile: userprofile
}
const Validator = require('fastest-validator');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'carshowroom',
});

function enquiry(req, res){
    const enquiryInfo = {
        car_id : req.body.car_id,
        user_id: req.body.user_id,
        message: req.body.message
    }
    const schema = {
        message: {type: 'string', optional: false, max: "6000", min: "1"},
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
                message: "Error getting database connectio",
                error: err
            });
        };

        const sqlQuery = 'INSERT INTO user_enquiry (user_id, car_id, enquiry, status) VALUES (?, ?, ?, ?)';
        connection.query(sqlQuery, [enquiryInfo.user_id, enquiryInfo.car_id, enquiryInfo.message, 'pending'], (queryErr, results) => {
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong, please try again",
                    error: queryErr
                });
            };
            if(results) {
                res.status(200).json({
                    message: "Message posted successfully",
                    results: results
                });
            };
        });
    });
};

function response(req, res){
    const responseInfo = {
        enquiry_id: req.body.enquiry_id,
        message   : req.body.message
    }

    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connectio",
                error: err
            });
        };

        const sqlQuery = 'UPDATE user_enquiry SET response = ?, status = ? WHERE enquiry_id = ?';
        connection.query(sqlQuery, [responseInfo.message, 'Answered'], (queryErr, results) => {
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong, please try again",
                    error: queryErr
                });
            };
            if(results) {
                res.status(200).json({
                    message: "Message posted successfully",
                    results: results
                });
            };
        });
    });
};

function updateEnquiry(req, res){
    const enquiryInfo = {
        enquiry_id: req.body.enquiry_id,
        message   : req.body.message
    }

    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connectio",
                error: err
            });
        };

        const sqlQuery = 'UPDATE user_enquiry SET enquiry = ?, status = ? WHERE enquiry_id = ?';
        connection.query(sqlQuery, [enquiryInfo.message, 'recently updated'], (queryErr, results) => {
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong, please try again",
                    error: queryErr
                });
            };
            if(results) {
                res.status(200).json({
                    message: "Message posted successfully",
                    results: results
                });
            };
        });
    });
};

module.exports = {
    enquiry: enquiry,
    response: response,
    updateEnquiry: updateEnquiry
}
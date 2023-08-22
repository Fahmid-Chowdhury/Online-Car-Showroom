const Validator = require('fastest-validator');
const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'carshowroom',
  });

function testDrive(req, res){
    console.log(req.body);
    const testDriveInfo = {
        user_id: req.body.userId,
        car_id : req.body.carId,
        date   : req.body.date,
        status : "pending" 
    };


    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }

        const sqlQuery = 'INSERT INTO test_drive (user_id, car_id, date, status) VALUES (?, ?, ?, ?)';
        connection.query(sqlQuery, [testDriveInfo.user_id, testDriveInfo.car_id, testDriveInfo.date, testDriveInfo.status], (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong",
                    error: queryErr
                });
            };
            if(results) {
                res.status(200).json({
                    message: "Test Drive request posted successfully",
                    results: results
                });
            };
        });
    });
};

function testDriveList(req, res){
    const status = req.body.status;
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }

        const sqlQuery = 'SELECT * FROM test_drive WHERE status = ?';
        connection.query(sqlQuery, [status], (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong",
                    error: queryErr
                });
            };
            if(results) {
                res.status(200).json({
                    message: "Test Drive list fetched successfully",
                    results: results
                });
            };
        });
    });
}

function testDriveUserList(req, res){
    const user_id = req.body.user_id;
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        };

        const sqlQuery = 'SELECT * FROM test_drive WHERE user_id = ?';
        connection.query(sqlQuery, [user_id], (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong",
                    error: queryErr
                });
            };
            if(results) {
                res.status(200).json({
                    message: "Test Drive list fetched successfully",
                    results: results
                });
            };
        });
    });
};

function confirmTestDrive(req, res){
    const testDriveInfo = {
        testdrive_id: req.body.testdrive_id,
        status : 'approved'
    };
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }

        const sqlQuery = 'UPDATE test_drive SET status = ? WHERE testdrive_id = ?';
        connection.query(sqlQuery, [testDriveInfo.status, testDriveInfo.testdrive_id], (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong",
                    error: queryErr
                });
            };
            if(results) {
                res.status(200).json({
                    message: "Test Drive request approved",
                    results: results
                });
            };
        });
    });
};

module.exports = {
    testDrive: testDrive,
    testDriveList: testDriveList,
    testDriveUserList: testDriveUserList,
    confirmTestDrive: confirmTestDrive
}

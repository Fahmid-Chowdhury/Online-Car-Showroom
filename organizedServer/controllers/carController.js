const Validator = require('fastest-validator');
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'carshowroom',
  });

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
                message: 'No cars found',
                results: results
            })
        }else {
            res.status(200).json({
                message: 'Cars found',
                data: results
            })
        };
    });
});
};

// admin controllers


function removeCar(req, res) {
    const car_id = req.body.car_id;
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        };
        const sqlQuery = 'DELETE FROM car WHERE car_id = ?';
        connection.query(sqlQuery, car_id, (queryErr, results) => {
            connection.release();
            if(queryErr) {
                res.status(400).json({
                    message: "Something went wrong. Please try again",
                    error: queryErr
                });
            };

            if(results.affectedRows == 0){
                res.status(409).json({
                    message: 'No car found',
                    results: results
                })

            }else {
                res.status(200).json({
                    message: 'Car deleted successfully',
                    results: results
                })
            };
        });
    });
};






module.exports = {
    
    allCars: allcars,
    deleteCar: removeCar
}
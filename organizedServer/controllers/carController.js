const Validator = require('fastest-validator');
const mysql = require('mysql');
const { get } = require('../routes/user');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'carshowroom',
  });

function listcars(req, res) {
    const page = parseInt(req.query.page || 1);
    const pageSize = parseInt(req.query.pageSize || 10);
    const offset = (page - 1) * pageSize;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }
        const countQuery = 'SELECT COUNT(*) AS total FROM car';
        
        const sqlQuery = 'SELECT * FROM car LIMIT ? OFFSET ?';
        connection.query(countQuery, (countQueryErr, countResults) => {
            if (countQueryErr) {
                connection.release();
                return res.status(400).json({
                    message: "Error fetching car data",
                    error: countQueryErr
                });
            }
            const total = countResults[0].total;
            connection.query(sqlQuery, [pageSize, offset], (queryErr, results) => {
                connection.release();

                if (queryErr) {
                    return res.status(400).json({
                        message: "Error fetching car data",
                        error: queryErr
                    });
                }

                return res.status(200).json({
                    message: 'Car data retrieved successfully',
                    count: total,
                    data: results
                });
        });
    });
    });
}

function allcars(req, res) {
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }

        const sqlQueryBrands = 'SELECT DISTINCT brand FROM car';
        const sqlQueryYears = 'SELECT DISTINCT year FROM car';
        const sqlQueryAllCars = 'SELECT * FROM car';
        
        let response = {
            brands: ['All'],
            years: ["All"],
            cars: []
        };
        connection.query(sqlQueryBrands, (brandsQueryErr, brandsResults) => {
            if (brandsQueryErr) {
                connection.release();
                return res.status(400).json({
                    message: "Something went wrong while fetching brands. Please try again",
                    error: brandsQueryErr
                });
            }

            response.brands = response.brands.concat(brandsResults.map(brand => brand.brand));

            connection.query(sqlQueryYears, (yearsQueryErr, yearsResults) => {
                if (yearsQueryErr) {
                    connection.release();
                    return res.status(400).json({
                        message: "Something went wrong while fetching years. Please try again",
                        error: yearsQueryErr
                    });
                }

                response.years = response.years.concat(yearsResults.map(year => year.year));

                connection.query(sqlQueryAllCars, (carsQueryErr, carsResults) => {
                    connection.release();

                    if (carsQueryErr) {
                        return res.status(400).json({
                            message: "Something went wrong while fetching cars. Please try again",
                            error: carsQueryErr
                        });
                    }

                    response.cars = carsResults;

                    return res.status(200).json({
                        message: 'Car data retrieved successfully',
                        data: response
                    });
                });
            });
        });
    });
}

// admin controllers



function deleteCar(req, res) {
    const carId = req.body.car_id;

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }

        const deleteQuery = 'DELETE FROM car WHERE car_id = ?';
        connection.query(deleteQuery, carId, (queryErr, results) => {
            connection.release();

            if (queryErr) {
                console.log(queryErr);
                if (queryErr.code === 'ER_ROW_IS_REFERENCED_2') {
                    console.log('here');
                    return res.status(409).json({
                        message: "Cannot delete car. It is referenced by other records.",
                    });
                } else {
                    return res.status(400).json({
                        message: "Error deleting carrrrr",
                        error: queryErr
                    });
                }
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: 'No car found for deletion',
                });
            }

            return res.status(200).json({
                message: 'Car deleted successfully',
            });
        });
    });
}

function allreviews(req, res) {
    const carId = req.query.carId;
    console.log("carId", carId);
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }
        const sqlQuery = 'select u.user_name, r.review_id, r.review_date, r.message, r.rating from user u, review r where u.user_id = r.user_id and r.car_id = ?;';
        connection.query(sqlQuery, carId, (queryErr, results) => {
            connection.release();
            if (queryErr) {
                return res.status(400).json({
                    message: "Error fetching reviews",
                    error: queryErr
                });
            }
            return res.status(200).json({
                message: 'Reviews retrieved successfully',
                comment: results
            }); 
        });
    });

}
function getcar(req, res) {
    const carId = req.query.carId;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }
        const sqlQuery = 'select * from car where car_id = ?';
        connection.query(sqlQuery, carId, (queryErr, results) => {
            connection.release();
            if (queryErr) {
                return res.status(400).json({
                    message: "Error fetching car",
                    error: queryErr
                });
            }
            return res.status(200).json({
                message: 'Car retrieved successfully',
                carData: results[0]
            });
        });
    });
}
function userreview(req, res) {
    const userId = req.query.userId;
    const carId = req.query.carId;
    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }
        const sqlQuery = 'select r.review_id, r.review_date, r.message, r.rating from car c, review r where c.car_id = r.car_id and r.user_id = ?;';
        connection.query(sqlQuery, userId, (queryErr, results) => {
            connection.release();
            if (queryErr) {
                return res.status(400).json({
                    message: "Error fetching reviews",
                    error: queryErr
                });
            }
            const response = {
                reviews: results,
                commented: true
            };
            if (results.length === 0) {
                response.commented = false;
            }
            return res.status(200).json({
                message: 'Reviews retrieved successfully',
                comment: results,
                commented: response.commented

            });
        });
    });
}


module.exports = {
    allCars: allcars,
    deleteCar: deleteCar,
    listCars: listcars,
    listComments: allreviews,
    getCar: getcar,
    userReview: userreview
}
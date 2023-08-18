const Validator = require('fastest-validator');
const mysql = require('mysql');


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
        const sqlQuery = 'select u.user_name,u.user_id, r.review_id, r.review_date, r.message, r.rating from user u, review r where u.user_id = r.user_id and r.car_id = ?;';
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
        const sqlQuery = 'select r.review_id, r.review_date, r.message, r.rating from review r where r.user_id = ? and r.car_id = ?;';
        connection.query(sqlQuery, [userId,carId], (queryErr, results) => {
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
function addcomment(req, res) {
    const carId = req.body.carId;
    const userId = req.body.userId;
    const message = req.body.comment;
    const rating = req.body.rating;
    const reviewDate = new Date();
    const update = req.query.update;
    console.log("update", update);

    pool.getConnection((err, connection) => {
        if (err) {
            return res.status(500).json({
                message: "Error getting database connection",
                error: err
            });
        }
        if (update === 'true') {
            const updateQuery = 'UPDATE review SET message = ?, rating = ?, review_date = ? WHERE car_id = ? and user_id = ?';
            connection.query(updateQuery, [message, rating, reviewDate, carId, userId], (queryErr, results) => {
                if (queryErr) {
                    connection.release();
                    return res.status(400).json({
                        message: "Error updating review",
                        error: queryErr
                    });
                }
                return res.status(200).json({
                    message: 'Review updated successfully',
                });
            });
            return;
        }

        const insertQuery = 'INSERT INTO review (car_id, user_id, message, rating, review_date) VALUES (?, ?, ?, ?, ?)';
        connection.query(insertQuery, [carId, userId, message, rating, reviewDate], (queryErr, results) => {

            if (queryErr) {
                connection.release();
                return res.status(400).json({
                    message: "Error adding review",
                    error: queryErr
                });
            
            }
            return res.status(200).json({
                message: 'Review added successfully',
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
    userReview: userreview,
    addComment: addcomment
}
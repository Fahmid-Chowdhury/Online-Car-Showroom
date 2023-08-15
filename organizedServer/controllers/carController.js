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
    deleteCar: removeCar,
    listCars: listcars
}
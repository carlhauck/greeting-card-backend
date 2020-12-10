require('dotenv').config();
const { Pool } = require("pg");

// Code for Production Server
// const isProduction = process.env.NODE_ENV === 'production';
// const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;

// const pool = new Pool({
//   connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
//   ssl: isProduction
// });

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: `${process.env.DATABASE_URL}`,
  port: 5432
});

const getImages = (req, res) => {
  pool.query("SELECT * FROM images;", (error, result) => {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};

const getImageById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query("SELECT * FROM images WHERE id = $1", [id], function (error, result) {
    if (error) {
      throw error;
    }
    res.status(200).json(result.rows);
  });
};


module.exports = {
  getImages,
  getImageById,
};
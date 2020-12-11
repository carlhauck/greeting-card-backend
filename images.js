require('dotenv').config();
const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === 'production';

const connectionString = process.env.DATABASE_URL;

const pool = (isProduction)
  ? new Pool({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false
    }
  })
  : new Pool({
    connectionString: connectionString,
  });

pool.connect();

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
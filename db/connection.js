const mongoose = require('mongoose')

const ENV = process.env.NODE_ENV || 'dev' ;

require('dotenv').config({
  path: `${__dirname}/../.env.${ENV}`,
});

if (!process.env.MGDATABASE && !process.env.DATABASE_URL) {
  throw new Error('MGDATABASE not set');
}

const config = {};

if(ENV === 'prod'){
	config.connectionString = process.env.DATABASE_URL,
	config.max = 2
}


module.exports = new mongoose(config);
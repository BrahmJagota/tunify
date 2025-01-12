const dotenv = require('dotenv'); 
dotenv.config();
module.exports = {
  AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
  AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  MONGODB_URI: process.env.MONGODB_URI
};
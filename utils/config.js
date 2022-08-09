const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;

const SECRET = "MySecretToken";

const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGO_URI;

module.exports = {
  PORT,
  MONGO_URI,
  SECRET,
};

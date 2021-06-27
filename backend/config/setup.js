require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    secretOrKey: process.env.SECRET,
    MONGO_URI: process.env.MONGO_URI
}
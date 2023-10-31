const mongoose = require('mongoose')
require('dotenv').config();
const connectDb = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_URI)
        console.log(`Connected successfully`);
    } catch (error) {
        throw error;
    }
}

module.exports = connectDb;
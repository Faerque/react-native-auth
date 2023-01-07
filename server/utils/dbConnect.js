// import mongoose
const mongoose = require('mongoose');

// connect database
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.Mongo_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log(`Database connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDB;
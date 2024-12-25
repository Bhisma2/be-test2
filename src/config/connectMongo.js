const mongoose = require('mongoose')

const connectDB = async () => {
    const url = process.env.MONGO_DB_URI || "";
    try {
        await mongoose.connect(url)
        console.log("MongoDB okee")
    } catch (error) {
        console.log("Ngga bisa connect ngab " + error.message)
    }
}

module.exports = connectDB
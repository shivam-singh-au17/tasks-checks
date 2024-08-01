require("dotenv").config();
const mongoose = require("mongoose");

/**
 * Function to establish a connection to a MongoDB database.
 */
const connect = async () => {
    if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI is not defined in the environment variables.");

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to database...");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        throw new Error("Unable to connect to the database.");
    }
};

module.exports = { connect };
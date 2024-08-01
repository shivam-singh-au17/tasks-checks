require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { connect } = require("./app/config/dbConnection");
const routes = require('./app/routes');

// Server Configurations
const app = express();

// parse application/json
app.use(bodyParser.json());

// Routes
app.use('/api', routes);

// Welcome route
app.use('/', (req, res) => {
    res.send('Welcome to the NodeJs Assessment - Connect');
});

// Error handling middleware
app.use(require('./app/middleware/errorHandlerMiddleware'));

// Get port from environment
const port = process.env.PORT;
if (!port) throw new Error("PORT is not defined in the environment variables.");

app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
    await connect();
});

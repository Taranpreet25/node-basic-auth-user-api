const express = require('express');
const bodyParser = require('body-parser');
const onboardingRoutes = require('./routes/routes');
require('dotenv').config();
const sequelize = require('./config/database_connection');

const app = express();
app.use(bodyParser.json());

app.use('/api', onboardingRoutes);

sequelize.sync()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err));

module.exports = app;

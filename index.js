const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const app = express();

connectDB();

const PORT = 5000;

// Setup Models
const Wine = require('./models/wineModel');
const Vendor = require('./models/vendorModel');

// Setup Routes
const wineRouter = require('./routes/wineRouter')(Wine);
const vendorRouter = require('./routes/vendorRouter')(Vendor);

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', wineRouter);
app.use('/api', vendorRouter);


app.listen(PORT, () => console.log(`Server running on port ${PORT}.  Environment: ${process.env.ENV}`));

module.exports = app;
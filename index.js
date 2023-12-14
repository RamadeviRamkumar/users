const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const loginRoutes = require("./Routes/Login.js");
const OrgRoutes = require("./Routes/orgroutes.js");
const StaffRoutes = require("./Routes/StaffDetails");
const mongodb = require("./Mongo/DB.js");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongo = mongoose.connect(mongodb.url, { useNewUrlParser: true, useUnifiedTopology: true });
mongo.then(() => {
    console.log('Server Connected to MongoDB');
}).catch(error => {
    console.log('Error while connecting to MongoDB:', error);
});


const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server running on port ' + port);
});

app.get('/', (req, res) => {
    res.send('Welcome to Employee Management System');
});

app.use('/Staff', StaffRoutes);
app.use("/org", OrgRoutes);
app.use("/login",loginRoutes);

module.exports = app;

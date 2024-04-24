const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const contactRoutes = require('./routes/user');
const sequelize = require('./utils/database');

app.use(bodyParser.json());

app.use('/v1', contactRoutes);

sequelize.sync({force:true})
    .then(result => {
        console.log("connected");
        app.listen(8080);
    })
    .catch(err=>{
        console.log(err)
    })
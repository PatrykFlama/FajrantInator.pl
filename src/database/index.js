const mongoose = require('mongoose');

mongoose
    .connect(`mongodb://` + 
             (process.env.DB_USER && process.env.DB_PASS ? `${process.env.DB_USER}:${process.env.DB_PASS}@` : ``) + 
             `${process.env.DB_HOST}:${process.env.DB_PORT}/db_FajrantInator`)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));
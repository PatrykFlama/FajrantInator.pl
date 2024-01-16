const mongoose = require('mongoose');

mongoose
    .connect(`mongodb://` + 
             (process.env.DB_URI ||
                ((process.env.DB_USER && process.env.DB_PASS ? `${process.env.DB_USER}:${process.env.DB_PASS}@` : ``) + 
                 (process.env.DB_HOST ? `${process.env.DB_HOST}:${process.env.DB_PORT}` : 'localhost:27017'))) +
             `/db_FajrantInator`)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

// if there is no 'admin' account create one with default password

async function addAdmin() {
    const User = require('./schemas/Users');
    const { hashPassword } = require('../utils/helpers');

    const adminExists = await User.findOne({ type: 'admin' });
    if (!adminExists) {
        const newAdmin = new User({
            username: 'admin',
            password: hashPassword('admin'),
            type: 'admin',
            email: 'admin@admin.com',
        });
        await newAdmin.save();
    }
}

addAdmin();

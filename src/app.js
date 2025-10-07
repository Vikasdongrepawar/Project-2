const express   = require('express');
const authRoutes = require('./routes/auth.routes')
const User  = require('./models/user.model')


 const app = express();

 app.use(express.json());
 app.use('/auth', authRoutes);
 app.use('/user', User);


 module.exports = app;

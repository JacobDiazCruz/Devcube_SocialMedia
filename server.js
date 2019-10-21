const express = require('express');
const connectDB = require('./config/db')
const app = express();
const dotenv = require('dotenv').config();
const cloudinary = require('cloudinary');

// dotenv
if (dotenv.error) {
  throw dotenv.error
}
console.log(dotenv.parsed);

//Connect Database 
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// connect cloudinary environment
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

//Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));

//Connect Server
app.get('/', (req, res) => res.send('API running'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started at ${PORT}`));	
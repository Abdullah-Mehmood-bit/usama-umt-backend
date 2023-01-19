const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const morgan = require('morgan')
/**import routes */
const user = require('./routes/user')
const product = require('./routes/product');
const order = require('./routes/order');

const app = express();


dotenv.config({ path: "./config/config.env" });

/**middleware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('tiny'));


/** define api routes */

app.use('/api/v1' , user);
app.use('/api/v1', product);
app.use('/api/v1', order);

app.get('/', (req, res)=>  {
    res.send("Api is Working....")
})

module.exports = app;
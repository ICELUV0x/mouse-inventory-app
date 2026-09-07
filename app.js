// External Files
const express = require('express');
const app = express();
const path = require('path');
const { body, validationResult } = require('express-validator');
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
require('dotenv').config();
//

// Internal Files
const brandsRouter = require('./routes/brandsRouter');
const modelsRouter = require('./routes/modelsRouter');
app.use(express.static(path.join(__dirname, 'public')));
//

app.listen((process.env.PORT || 9999), () => console.log('Server started on port 9999'));

app.get('/', (req, res) => { res.render('!main/index')});
 
app.use('/brands', brandsRouter);
app.use('/models', modelsRouter);
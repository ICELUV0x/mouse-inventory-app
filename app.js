// External Files
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
//

// Internal Files
const brandsRouter = require('./routes/brandsRouter');
const modelsRouter = require('./routes/modelsRouter');
//


app.get('/', (req, res) => { res.render('!main/index')});
 
app.use('/brands', brandsRouter);
app.use('/models', modelsRouter);

module.exports = {app};
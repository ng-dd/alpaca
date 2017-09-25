const express = require('express');
const parser = require('body-parser');
const logger = require('morgan');
const routes = require('./routes/routes');

const app = express(); 
const port = 4200;

app.use(parser.json());
app.use(parser.urlencoded({extended: true}));
app.use(logger('dev')); 

app.use('/api', routes);


app.listen(port, function() {
  console.log('Server listening on port: ', port);
})
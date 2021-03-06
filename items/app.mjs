import createError from 'http-errors';
import express from 'express';
import * as path from 'path';
import logger from 'morgan';

import apiRouter from './routes/api.mjs';
import bodyParser from 'body-parser';



const __dirname = path.resolve();
const app = express();

// view engine setup

app.use(logger('dev'));
app.use((bodyParser).urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/build')));

app.use('/', apiRouter);

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});



export default app;

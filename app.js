var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var console = require('console');
var nj = require('numjs');
var fs = require('fs');
var cache = require('memory-cache');
// var cache = require( "node-cache" );
// const myCache = new cache();
var bodyParser = require("body-parser");
var increaseMemoryLimit = require("increase-memory-limit");
// var sharp = require('sharp');
// var canvas = require('canvas');

////////////////////////////////////////////////////////////
//    Read images and add to cache when project starts    //
////////////////////////////////////////////////////////////


  // var ogimageshape = img.shape;


// var imagesrc = path.join( __dirname, '/public', 'images', 'IMG_5813.jpg');
// // var imagesrc = path.join( __dirname, '/public', 'images', 'paint.jpg');
//
//   console.log("ABOUT TO READ IMAGE");
//   var img = nj.images.read(imagesrc);
//   var ogimageshape = img.shape;
//   console.log("DID READ IMAGE");
//   // console.log(img);
//   console.log(img.shape);

  // cache.put('imagendarray', img);
  // myCache.put('imagendarray', img);
//   myCache.set( 'imagendarray', img, function( err, success ){
//   if( !err && success ){
//     console.log( success );
//     // true
//     // ... do something ...
//   }
// });
//   console.log("it's in cache");

  // console.log('cachesize: ' + cache.size());
//////////////////////////////////////////////////////

var index = require('./routes/index');
var users = require('./routes/users');
var imageshow = require('./routes/imageshow');
var imagestream = require('./routes/giveimagestream');
var giveimagefile = require('./routes/giveimagefile');
var getimageshape = require('./routes/getimageshape');


var app = express();

var imagesrc = path.join( __dirname, '/public', 'images', 'IMG_5813.jpg');
// var imagesrc = path.join( __dirname, '/public', 'images', 'paint.jpg');

  console.log("ABOUT TO READ IMAGE");
  var img = nj.images.read(imagesrc);
   app.set('img', img);
   // var shape = img.shape;
   // cache.put('imgshape', shape);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/imageshow', imageshow);
app.use('/img1', imagestream);
app.use('/img2', giveimagefile);
app.use('/getimageshape', getimageshape);

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());



app.get('/img/resized.png', function(req, res) {

  res.sendFile(path.join(__dirname,'img.png'))
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.log(err);
});

module.exports = app;

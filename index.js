
let express = require('express')
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let morgan = require('morgan');
let _  = require('lodash');
let path = require('path');
//create the applicaiton
let app = express();

let fs = require('fs');
let http  = require('http');
let https = require('https');

let privateKey  = fs.readFileSync('./ssCert/privatekey.pem', 'utf8');
let certificate = fs.readFileSync('./ssCert/server.crt', 'utf8');
let credentials = {key: privateKey, cert: certificate};

//Add middleware necessary for REST API's
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

//path to morgan log and log stream
var LogStream = fs.createWriteStream(path.join(__dirname,'morgan.log'),  {flags: 'a'})


//CORS Support
app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use('/hello', function(req, res, next){
    res.send('Hellow World');
    next();
});

app.use('/fb', function(req, res, next){
   res.sendFile(path.join(__dirname + '/fb.html'));
});

app.use('/bodyDemo', function(req, res, next){
  res.sendFile(path.join(__dirname + '/body.html'));
});

app.use(morgan('combined',{stream: LogStream}))
app.get('/MorganTest', function(req,res){
  res.send('Testing Morgan');
})


//app.post('/body', function(req, res){
//   console.log(req.body.inputPassword2);
//   res.redirect('/hello');
//});

let  httpServer = http.createServer(app);
let httpsServer = https.createServer(credentials, app);

//connect to mogodb
//mongoose.connect('mongodb://localhost/meanapp');
mongoose.connect('mongodb://admin:admin1@ds045694.mlab.com:45694/580project');
mongoose.connection.once('open', function(){
    //load the models ...
    app.models = require('./models/index');
    //load the routes.
    let routes = require('./routes');
    _.each(routes, function(controller, route){
        app.use(route, controller(app, route));
    });
   console.log('listening on port 3000...');
   httpServer = httpServer.listen(3000); 
   //httpsServer = httpsServer.listen(3000);
});

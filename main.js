const express = require('express');
const router = require('./routers/router');
const http = require('http');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const dbHandelr = require('./dbHndler')
const path = require('path');

const db = dbHandelr.initDb()

const routerClass = new router.Router(db);

const app = express();
const server = http.createServer(app);


app.use(cookieParser());


app.use(express.json());

app.set('view engine', 'ejs');

server.listen(3000)



console.log( __dirname + '/public');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
res.locals.path = req.path;
next();
});
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });
  



app.use(routerClass.getRouter())


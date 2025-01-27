const express = require('express');
const app = express();
const cors = require('cors'); // new line of code
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const compression = require('compression');
const fileUpload = require('express-fileupload')
const session = require('express-session');
const router = require('./server/router/index');
import("@babel/plugin-proposal-class-properties");
import("@babel/plugin-proposal-object-rest-spread")

require('dotenv').config();

app.disable('x-powered-by');

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/views"));
app.use(express.static(path.join(__dirname, "src/public")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/js/")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist/css/")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap-icons/font/")));
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(flash())
app.use(fileUpload())

app.use(session({
    secret: process.env.SECRET,
    permission: process.env.PERMISSION,
    saveUninitialized: false,
    resave: false
}));

global.loggedIn = null;

app.use("*",(req,res,next)=>{
    loggedIn = req.session.userId
    next()
})

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
})
if(mongoose){
    console.log('Db connected')
} else {
    console.log('No Db connected')
}

const port = process.env.PORT;
app.listen(port || 8000,() => { // changed from app to httpServer
    console.log(`App listening on ${port}`)
});

app.use('/', compression(), router)

app.use(function(req, res, next){
    res.status(404).render('notFound.ejs', {title: "Sorry, page not found"});
});
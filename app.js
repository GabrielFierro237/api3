var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
require(`dotenv`).config();
var indexRouter = require('./routes/index');
var PermisosRouter =require(`./routes/Permisos`);
var RolesRouter =require(`./routes/Roles`);
var UsuarioRouter = require('./routes/Usuarios');
var app = express();
app.use(cors());
app.use(logger('dev'));
app.use(express.json()); //Nos va a permitir receptar las peticiones con post
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use(`/users`, UsuarioRouter)
app.use('/permissions', PermisosRouter);
app.use('/roles', RolesRouter);

module.exports = app;

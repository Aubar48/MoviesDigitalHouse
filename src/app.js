require('dotenv').config(); 
const express = require('express');
const path = require('path');

/* requiers by me: */
const methodOverride = require('method-override');


const indexRouter = require('./routes/index');

const moviesRoutes = require('./routes/moviesRoutes');
const genresRoutes = require('./routes/genresRoutes');
const app = express();

// view engine setup
app.set('views', path.resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(express.static(path.resolve(__dirname, '../public')));

//URL encode  - Para que nos pueda llegar la información desde el formulario al req.body
app.use(express.urlencoded({ extended: false }));
//MethodOverride
app.use(methodOverride('_method'));


app.use('/', indexRouter);
app.use(moviesRoutes);
app.use(genresRoutes);
app.use('/actors',require('./routes/actorsRoutes'))
app.listen('3001', () => console.log('Servidor corriendo en el puerto 3001'));

const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const port = 8080

//For overriding post methods to use PATCH/DELETE
app.use(methodOverride('_method'));

//To parse form data in POST request body:
app.use(express.urlencoded({ extended: true }));

// To parse incoming JSON in POST request body:
app.use(express.json());

//for ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//To serve the css file to the ejs files
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) =>{
    res.render('home');
})

app.listen(port, () =>{
    console.log("Listening on port %d...", port);
})
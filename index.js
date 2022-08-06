const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const {v4: uuid} = require('uuid');
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

let fakeDataBase = [
    {
        id: uuid(),
        username: 'Yustin',
        description: 'Look at this image! Wow!',
        img: 'https://images.unsplash.com/photo-1659734770479-a930448b560c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1175&q=80'
    },
    {
        id: uuid(),
        username: 'DogFan78',
        description: "I can't stop posting photos of my dog! She's so cute!",
        img: 'https://images.unsplash.com/photo-1588327398703-52961096ffd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    },
    {
        id: uuid(),
        username: 'thatOnlineGuy',
        description: 'A pretty treeline I saw on my vacation to Canada!',
        img: 'https://images.unsplash.com/photo-1548195667-1d329af0a472?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
    },
    {
        id: uuid(),
        username: 'Nature_Explorer',
        description: 'A lovely waterfall',
        img: 'https://images.unsplash.com/photo-1659724546564-b10424f9296f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    }
];

//**************************
// HOMEPAGE
//**************************
app.get('/', (req, res) =>{
    res.render('home');
})

//**************************
// INDEX FOR THE IMAGE BOARD
//**************************
app.get('/images', (req, res) =>{
    res.render('images/index', {fakeDataBase});
})

//**************************
// CREATING A NEW POST
//**************************
app.get('/images/new', (req, res) => {
    res.render('images/new')
})

app.post('/images', (req, res) => {
    //Form requires all fields to be filled out, no need to check for undefs
    const {username, description, img} = req.body;
    fakeDataBase.unshift({ username, description, img, id: uuid() });
    res.redirect('images');
})

//**************************
// INSPECTING A POST
//**************************
app.get('/images/:id', (req, res) => {
    const { id } = req.params
    const post = fakeDataBase.find(function(p){ 
        return p.id === id;
    });
    res.render('images/inspect', { post });
})

//**************************
// EDITING/UPDATING A POST
//**************************
app.get('/images/:id/edit', (req, res) => {
    const { id } = req.params;
    //finds comment with matching id, renders with that information
    const post = fakeDataBase.find(p => p.id === id);
    res.render('images/edit', { post });
})

//Patch request from edit.ejs form. It's required, so no need to check for empty fields
app.patch('/images/:id', (req, res) => {
    const { id } = req.params;
    const foundPost = fakeDataBase.find(p => p.id === id);
    //The found post is updated with the info from the edit.ejs form's info
    foundPost.description = req.body.description;
    foundPost.img = req.body.img;
    res.redirect('/images');
})

//**************************
// DELETING A POST
//*************************
app.delete('/images/:id', (req, res) => {
    const { id } = req.params;
    //callback func, var c, if the id's are not equal you keep the post
    fakeDataBase = fakeDataBase.filter(p => p.id !== id); 
    res.redirect('/images');
})


//**************************
// ERROR 404 PAGE
//*************************
app.get('*', (req, res) => {
    res.render('404');
})
app.listen(port, () =>{
    console.log("Listening on port %d...", port);
})

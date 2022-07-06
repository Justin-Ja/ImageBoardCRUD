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
        username: 'YaBoiYustin',
        description: 'Look at this image! Wow!',
        img: 'https://images.unsplash.com/photo-1548195667-1d329af0a472?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
    },
    {
        id: uuid(),
        username: 'DogFan78',
        description: "I can't stop posting photos of my dog! She's so cute!",
        img: 'https://images.unsplash.com/photo-1588327398703-52961096ffd9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    },
    {
        id: uuid(),
        username: 'SomeGuy',
        description: 'I am unsure of what this is',
        img: 'https://images.unsplash.com/photo-1548195667-1d329af0a472?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
    },
    {
        id: uuid(),
        username: 'Test',
        description: 'This image here is a test.',
        //CHANGE THIS LATER TO A FREE TO USE IMAGE 
        img: 'https://assets.roguefitness.com/f_auto,q_auto,c_limit,w_1600,b_rgb:ffffff/catalog/Bodyweight%20and%20Gymnastics/Ropes/Conditioning%20Ropes/KRP50/KRP50-web4_go92u4.png'
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
    fakeDataBase.unshift({username, description, img, id: uuid() });
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

app.patch('/images/:id', (req, res) => {
    const { id } = req.params;
    const foundPost = fakeDataBase.find(c => c.id === id);

    //If a section of the form is empty, then dont change it
    if(req.body.description != undefined){
    const newDesc = req.body.description;
    foundPost.description = newDesc;
    }
    res.redirect('/images');
    
})

//**************************
// DELETING A POST
//*************************
app.delete('/images/:id', (req, res) => {
    const { id } = req.params;
    fakeDataBase = fakeDataBase.filter(p => p.id !== id); //callback func, var c, if id is not equal you keep the post
    res.redirect('/images');
})
//const post = fakeDataBase.find(p => p.id === id

app.listen(port, () =>{
    console.log("Listening on port %d...", port);
})

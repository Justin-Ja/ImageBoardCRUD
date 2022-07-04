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
    const {username, description, img} = req.body;
    if(username.length != 0 && description.length != 0 && img.length != 0){
        fakeDataBase.unshift({username, description, img, id: uuid() });
        res.redirect('/images');
    }
    else{
        //Make a new page explaining error, will be different, instead of 404, use 422
        res.redirect('/images/new');
    }
})



app.listen(port, () =>{
    console.log("Listening on port %d...", port);
})
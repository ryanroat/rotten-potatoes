const express = require('express');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {
    allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rotten-potatoes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String,
    description: String
});

const app = express();

const PORT_SERVER = 3030;

app.engine(
    'handlebars',
    exphbs({
        defaultLayout: 'main',
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set('view engine', 'handlebars');

// use express built-in 'body parser' middleware
app.use(express.urlencoded({ extended: true }));

// OUR MOCK ARRAY OF PROJECTS
// const reviews = [
//     { title: 'Great Review', movieTitle: 'Batman II' },
//     { title: 'Awesome Movie', movieTitle: 'Titanic' }
// ];

// render all reviews on index
app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', { reviews });
        })
        .catch(err => {
            console.log(err);
        });
});

// route to individual review
app.get('/reviews/:id', (req, res) => {
    Review.findById(req.params.id)
        .then(review => {
            res.render('reviews-show', { review });
        })
        .catch(err => {
            console.log(err.message);
        });
});

// render form to add new review
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
});

// create new review
app.post('/reviews', (req, res) => {
    // console.log(req.body);
    Review.create(req.body)
        .then(review => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err.message);
        });
});

// route to /reviews eventually /INDEX
// app.get('/reviews', (req, res) => {
//     res.render('reviews-index', { reviews });
// });

app.listen(PORT_SERVER, () => {
    console.log(`app server started on port ${PORT_SERVER}.`);
});

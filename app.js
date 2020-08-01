const express = require('express');
const methodOverride = require('method-override');
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

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

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

// render form to add new review
app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', {});
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

// create new review
app.post('/reviews', (req, res) => {
    Review.create(req.body)
        .then(review => {
            // redirect to new review after post
            res.redirect(`/reviews/${review._id}`);
        })
        .catch(err => {
            console.log(err.message);
        });
});

// edit review
app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, (err, review) => {
        res.render('reviews-edit', { review });
    });
});

// PUT edited review
app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body).then(review => {
        res.redirect(`/reviews/${review._id}`);
    });
});

app.delete('/reviews/:id', (req, res) => {
    Review.findByIdAndRemove(req.params.id)
        .then(review => {
            res.redirect('/');
        })
        .catch(err => {
            console.log(err.message);
        });
});

app.listen(PORT_SERVER, () => {
    console.log(`app server started on port ${PORT_SERVER}.`);
});

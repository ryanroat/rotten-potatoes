const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rotten-potatoes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const Review = mongoose.model('Review', {
    title: String,
    movieTitle: String
});

const app = express();

const PORT_SERVER = 3030;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// use express built-in 'body parser' middleware
app.use(express.urlencoded({ extended: true }));

// OUR MOCK ARRAY OF PROJECTS
// const reviews = [
//     { title: 'Great Review', movieTitle: 'Batman II' },
//     { title: 'Awesome Movie', movieTitle: 'Titanic' }
// ];

// render all reviews
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

// create new review
app.post('/reviews', (req, res) => {
    console.log(req.body);
    // res.render('reviews-new', {});
});

// route to /reviews eventually /INDEX
// app.get('/reviews', (req, res) => {
//     res.render('reviews-index', { reviews });
// });

app.listen(PORT_SERVER, () => {
    console.log(`app server started on port ${PORT_SERVER}.`);
});

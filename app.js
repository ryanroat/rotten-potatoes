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

const reviews = require('./controllers/reviews')(app, Review);

const PORT_SERVER = 3030;

app.engine(
    'handlebars',
    exphbs({
        defaultLayout: 'main',
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    })
);
app.set('view engine', 'handlebars');
mongoose.set('useFindAndModify', false);
// use express built-in 'body parser' middleware
app.use(express.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

app.listen(PORT_SERVER, () => {
    console.log(`app server started on port ${PORT_SERVER}.`);
});

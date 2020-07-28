const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rotten-potatoes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

const PORT_SERVER = 3030;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// OUR MOCK ARRAY OF PROJECTS
const reviews = [
    { title: 'Great Review', movieTitle: 'Batman II' },
    { title: 'Awesome Movie', movieTitle: 'Titanic' }
];

app.get('/', (req, res) => {
    res.render('reviews-index', { reviews });
});

// route to /reviews eventually /INDEX

app.get('/reviews', (req, res) => {
    res.render('reviews-index', { reviews });
});

app.listen(PORT_SERVER, () => {
    console.log(`app server started on port ${PORT_SERVER}.`);
});

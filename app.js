const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

const PORT_SERVER = 3030;

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', { msg: 'Handlebars working...' });
});

app.listen(PORT_SERVER, () => {
    console.log(`app server started on port ${PORT_SERVER}.`);
});

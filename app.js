/* eslint-disable no-unused-vars */
const express = require('express');
const methodOverride = require('method-override');
const Handlebars = require('handlebars');
const {
    allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const moment = require('moment');

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rotten-potatoes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();

const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);

const PORT_SERVER = 3030;

app.set('view engine', 'handlebars');
app.engine(
    'handlebars',
    exphbs({
        defaultLayout: 'main',
        handlebars: allowInsecurePrototypeAccess(Handlebars),
        helpers: {
            //  format an ISO date using Moment.js in Handlebars templates
            //  http://momentjs.com/
            //  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
            //  usage: {{dateFormat creation_date format="MMMM YYYY"}}
            dateFormat(context, block) {
                if (moment) {
                    const f = block.hash.format || 'MMM Do, YYYY';
                    return moment(Date(context)).format(f);
                }
                return context; //  moment plugin not available. return data as is.
            }
        }
    })
);

mongoose.set('useFindAndModify', false);
// use express built-in 'body parser' middleware
app.use(express.urlencoded({ extended: true }));

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'));

app.listen(PORT_SERVER, () => {
    // eslint-disable-next-line no-console
    console.log(`app server started on port ${PORT_SERVER}.`);
});

module.exports = app;

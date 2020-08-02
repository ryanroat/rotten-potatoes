// reviews.js

module.exports = function(app, Review) {
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
};

/* eslint-disable no-console */
// comments.js

const express = require('express');
const methodOverride = require('method-override');
const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = app => {
    // use express built-in 'body parser' middleware
    app.use(express.urlencoded({ extended: true }));
    // override with POST having ?_method=DELETE or ?_method=PUT
    app.use(methodOverride('_method'));

    // CREATE Comment
    app.post('/reviews/comments', (req, res) => {
        Comment.create(req.body)
            .then(comment => {
                console.log(comment);
                res.redirect(`/reviews/${comment.reviewId}`);
            })
            .catch(err => {
                console.log(err.message);
            });
    });
};

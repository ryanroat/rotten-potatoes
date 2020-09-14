/* eslint-disable linebreak-style */
/* eslint-disable no-console */
// reviews.js

const express = require('express');
const methodOverride = require('method-override');
const moment = require('moment');
const Review = require('../models/review');
const Comment = require('../models/comment');

module.exports = (app) => {
  // use express built-in 'body parser' middleware
  app.use(express.urlencoded({ extended: true }));
  // override with POST having ?_method=DELETE or ?_method=PUT
  app.use(methodOverride('_method'));

  // render all reviews on index
  app.get('/', (req, res) => {
    Review.find()
      .then((reviews) => {
        res.render('reviews-index', { reviews });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // render form to add new review
  app.get('/reviews/new', (req, res) => {
    res.render('reviews-new', { title: 'New Review' });
  });

  // route to SHOW individual review
  app.get('/reviews/:id', (req, res) => {
    // find review by id
    Review.findById(req.params.id)
      .then((review) => {
        // process timestamp into display format
        let { createdAt } = review;
        createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
        review.createdAtFormatted = createdAt;
        // find (any) comments for this review id
        Comment.find({ reviewId: req.params.id }).then((comments) => {
          // display review and any comments
          res.render('reviews-show', { review, comments });
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // create new review
  app.post('/reviews', (req, res) => {
    Review.create(req.body)
      .then((review) => {
        // redirect to new review after post
        res.redirect(`/reviews/${review._id}`);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  // edit review
  app.get('/reviews/:id/edit', (req, res) => {
    Review.findById(req.params.id, (err, review) => {
      res.render('reviews-edit', { review, title: 'Edit Review' });
    });
  });

  // PUT edited review
  app.put('/reviews/:id', (req, res) => {
    Review.findByIdAndUpdate(req.params.id, req.body).then((review) => {
      res.redirect(`/reviews/${review._id}`);
    });
  });

  // DELETE review
  app.delete('/reviews/:id', (req, res) => {
    Review.findByIdAndRemove(req.params.id)
      .then((review) => {
        res.redirect('/');
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
};

/* eslint-disable linebreak-style */
// models/review.js

const mongoose = require('mongoose');

const Review = mongoose.model(
  'Review',
  new mongoose.Schema(
    {
      title: String,
      description: String,
      movieTitle: String,
    },
    {
      timestamps: true,
    },
  ),
);

const Comment = require('./comment');

module.exports = Review;

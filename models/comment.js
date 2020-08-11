// comment.js

const mongoose = require('mongoose');

const { Schema } = mongoose;

const Comment = mongoose.model('Comment', {
    title: String,
    content: String,
    ReviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
});

module.exports = Comment;

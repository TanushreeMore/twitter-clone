// Importing required packages/modules
const mongoose = require("mongoose");
const moment = require("moment");

// Defining the user schema
const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
  },
  username: {
    type: String,
    required: true, // Username is a required field
  },
  password: {
    type: String,
    required: true, // Password is a required field
  },
  followers: {
    type: Array,
  },
  followBtn: {
    type: String,
    default: "Follow",
  },
  tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tweet" }],
});

// Defining the tweet schema
const tweetSchema = new mongoose.Schema(
  {
    content: {
      type: String,
    },
    image: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postedTweetTime: {
      type: String,
      default: moment().format("MMMM Do YYYY, h:mm:ss a"), // Default timestamp format
    },
    likes: {
      type: Array,
    },
    likeTweetBtn: {
      type: String,
      default: "black",
    },
    retweetBtn: {
      type: String,
      default: "black",
    },
    retweetedByUser: {
      type: String,
    },
    isRetweeted: {
      type: Boolean,
      default: false,
    },
    retweets: {
      type: Array,
      default: [],
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

// Defining the comment schema
const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true, // Comment content is required
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postedCommentTime: {
      type: String,
      default: moment().format("MMMM Do YYYY, h:mm:ss a"), // Default timestamp format
    },
    likes: {
      type: Array,
    },
    likeCommentBtn: {
      type: String,
      default: "black",
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Creating mongoose models for User, Tweet, and Comment
const User = mongoose.model("User", userSchema);
const Tweet = mongoose.model("Tweet", tweetSchema);
const Comment = mongoose.model("Comment", commentSchema);

// Exporting models for use in other modules
module.exports = { User, Tweet, Comment };

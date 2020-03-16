const express = require("express");
const router = express.Router();
const passport = require('passport');

const Post = require('../../models/Post');

const validatePostInput = require('../../validation/post');

// @route GET api/posts
// @desc Get ALL Posts by chronologial order
// @access Public
router.get('/', (req, res) => {
  Post.find()
  .sort({ date: -1 })
  .then(posts => res.json(posts))
  .catch(err => res.status(404).json({ nopostsfound: 'No posts found'}))
 }
);

// @route GET api/posts/:id -> id meaning "Post" _id
// @desc Get Post by ID
// @access Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id) 
  .then(post => {
    if (post) {
      return res.json(post);
    } else {
      return res.status(404).json({ postnotfound: 'Post not found' });
    }
  })
  .catch(err => res.status(404).json({postnotfound: 'Post not found'}));
})

// @route POST api/posts
// @desc CREATE a Post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
    })

    newPost.save()
    .then(post => res.json(post));
  }
);

// @route DELETE api/posts/:id
// @desc DELETE Post by ID
// @access Priavte
router.delete(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  (req, res) => {
    // Post has its own id from MongoDB. _id
    Post.findById(req.params.id)
    .then(post => {
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized'});
      } 

      post.remove()
      .then(() => res.json({ success: true }))
      .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
  }
);

// @route POST api/posts/like/:id
// @desc LIKE Post
// @access Private
router.post(
  // id is Post _id
  '/like/:id', 
  passport.authenticate('jwt', {session:false}),
  (req, res) => {
    Post.findById(req.params.id)
    .then(
      post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({alreadyliked: 'You already liked this post!'});
        }

        post.likes.unshift({ user: req.user.id });

        post.save()
        .then(post => res.json(post))
      }
    )
    .catch(err => res.json(err));
  }
)

// @route POST api/posts/unlike/:id
// @desc UNLIKE the post
// @access Private
router.post(
  // id is POST _id
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
      if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({notliked: 'You have not liked this post yet!'});
      }

      //If the user already liked, then remove the like
      const removeIndex = post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      post.save()
      .then(post => res.json(post))
     }
    )
   .catch(err => res.json(err));  
  }
)

// @route POST api/posts/comment/:id
// @desc ADD Comment to the post
// @access Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
    .then(post => {
      if (post) {
        // When there is the matching post, add a new comment
        const newComment = {
          user: req.user.id,
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar
        };

        // shifting the comment to the comments array
        post.comments.unshift(newComment);

        post.save()
        .then(post => res.json(post));
      }
    })
    .catch(err => res.json(err));
  }
);

// @route DELETE api/posts/comment/:id/:comment_id -> 1) id is Post _id, 2) comment_id is comment _id
// @desc DELETE Post from the comment
// @access Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Post.findById(req.params.id)
    .then(post => {
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({commentnotexists: 'Comment does not exists'});
      }

      // params are "strings". Always stringify the numbers!
      const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);

      post.save()
      .then(post => res.json(post))

    })
    .catch(err => req.json(err));
  }
)

module.exports = router;


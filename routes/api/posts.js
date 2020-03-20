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
  .catch(() => res.status(404).json({ nopostsfound: 'No posts found'}))
 }
);

// @route GET api/posts/:id -> id meaning Post _id
// @desc Get Post by Post _id
// @access Public
router.get('/:id', (req, res) => {
  // Each Post has its own unique "_id" genereated by MongoDB
  Post.findById(req.params.id) 
  .then(post => {
    if (post) {
      return res.json(post);
    } else {
      return res.status(404).json({ postnotfound: 'Post not found' });
    }
  })
  .catch(() => res.status(404).json({postnotfound: 'Post not found'}));
})

// @route POST api/posts
// @desc CREATE a Post
// @access Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // validate the fields
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    // create a new post
    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      name: req.user.name, //question: user? body?
      avatar: req.user.avatar,
    })

    // save
    newPost.save()
    .then(post => res.json(post));
  }
);

// @route DELETE api/posts/:id -> id is Post _id
// @desc DELETE Post by Post _id
// @access Priavte
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // each Post has its own unique "_id" genereated by MongoDB
    Post.findById(req.params.id)
    .then(post => {
      if (post.user.toString() !== req.user.id) {
        return res.status(401).json({ notauthorized: 'User not authorized'});
      } 

      // remove the post
      post.remove()
      .then(() => res.json({ success: true }))
      .catch(err => res.json(err))
    })
    .catch(() => res.status(401).json({ notauthorized: 'User not authorized' }));
  }
);

// @route POST api/posts/like/:id  ->  id is Post _id
// @desc LIKE the post
// @access Private
router.post(
  '/like/:id', 
  passport.authenticate('jwt', { session:false }),
  (req, res) => {
    Post.findById(req.params.id)
    .then(
      post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(400).json({alreadyliked: 'You already liked this post!'});
        }

        // Add like to the likes array
        post.likes.unshift({ user: req.user.id });

        // save
        post.save()
        .then(post => res.json(post))
      }
    )
    .catch(() => res.json({ postnotfound: 'Post not found' }));
  }
);

// @route POST api/posts/unlike/:id  ->  id is Post _id
// @desc UNLIKE the post
// @access Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
    .then(post => {
      if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({notliked: 'You have not liked this post yet!'});
      }

      // if the user had already liked, then remove the like fromt the likes array
      const removeIndex = 
      post.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      // save
      post.save()
      .then(post => res.json(post))
     }
    )
    .catch(() => res.json({ postnotfound: 'Post not found' }));  
  }
);

// @route POST api/posts/comment/:id  ->  id is Post _id
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
        // When there is the matching post, add a new comment on that post
        const newComment = {
          user: req.user.id,  // grabing from "user" id
          text: req.body.text,
          name: req.user.name,
          avatar: req.user.avatar
        };

        // shifting new comment to the comments array
        post.comments.unshift(newComment);

        // save
        post.save()
        .then(post => res.json(post));
      }
    })
    .catch(() => res.json({ postnotfound: 'Post not found' }));
  }
);

// @route DELETE api/posts/comment/:id/:comment_id  ->  1) id is Post _id, 2) comment_id is comment _id
// @desc DELETE comment on the post
// @access Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    Post.findById(req.params.id)
    .then(post => {
      // each comment has its own unique _id generated by MongoDB
      if (post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({commentnotexists: 'Comment does not exists'});
      }

      // params are "strings". Always stringify the numbers!
      const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.comment_id);

      post.comments.splice(removeIndex, 1);

      // save
      post.save()
      .then(post => res.json(post))

    })
    .catch(() => res.json({ postnotfound: 'Post not found' }));
  }
);

module.exports = router;


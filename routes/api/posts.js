const express = require("express");

// another layer of express. Only loading the router portion.
const router = express.Router();

// @route   GET api/posts/test
// @desc    Tests post route
// access   Public
router.get('/test', (req, res) => res.json({ msg: "Posts Works!" }));

module.exports = router;
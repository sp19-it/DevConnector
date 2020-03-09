const express = require("express");

// another layer of express. Only loading the router portion.
const router = express.Router();

router.get('/test', (req, res) => res.json({ msg: "Profile Works!" }));

module.exports = router;
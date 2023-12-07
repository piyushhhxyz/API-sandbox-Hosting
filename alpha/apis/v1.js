const express = require('express');
const topLanguagesRouter = require('../routes/gh-languages');
const githubStatsRouter = require('../routes/gh-stats');
const testing = require('../routes/test');

const router = express.Router();

router.use('/top-languages', topLanguagesRouter);
router.use('/github-stats', githubStatsRouter);
router.use('/test', testing);

module.exports = router;
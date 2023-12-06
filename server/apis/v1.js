const express = require('express');
const topLanguagesRouter = require('../routes/topLanguages');
const githubStatsRouter = require('../routes/githubStats');
const testing = require('../routes/testing');

const router = express.Router();

router.use('/top-languages', topLanguagesRouter);
router.use('/github-stats', githubStatsRouter);
router.use('/test', testing);

module.exports = router;

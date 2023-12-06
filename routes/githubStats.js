const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const response = await axios.get(`https://github-readme-stats.vercel.app/api?username=${username}&theme=nightowl&hide_border=false&include_all_commits=true&count_private=false`);
    const svgData = response.data;

    const $ = cheerio.load(svgData);

    const stars = $('text:contains("Total Stars Earned:") + text').text().trim();
    const commits = $('text:contains("Total Commits:") + text').text().trim();
    const prs = $('text:contains("Total PRs:") + text').text().trim();
    const issues = $('text:contains("Total Issues:") + text').text().trim();
    const contribs = $('text:contains("Contributed to (last year):") + text').text().trim();

    res.json({
      totalStars: stars,
      totalCommits: commits,
      totalPRs: prs,
      totalIssues: issues,
      contributions2023: contribs,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

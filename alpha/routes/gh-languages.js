const express = require('express');
const axios = require('axios');

const router = express.Router();

router.get('/:username', async (req, res) => {
  try {
    const username = req.params.username;
    // console.log(username);
    const response = await axios.get(`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=nightowl&hide_border=false&include_all_commits=true&count_private=false&layout=compact`);
    const svgData = response.data;

    const langRegExp = /<text data-testid="lang-name"\s*x="\d+"\s*y="\d+"\s*class='lang-name'>\s*([^<]+)\s*<\/text>\s*<\/g>/g;
    const matches = [...svgData.matchAll(langRegExp)];
    const languages = matches.map(match => match[1].trim());

    res.json({ languages });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

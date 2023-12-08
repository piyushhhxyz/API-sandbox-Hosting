const express = require('express');
const app = express();
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());
app.get('/', (req, res) => {
  res.json({ message: 'Simple Node.js API is running!' });
});
app.get('/test', (req, res) => {
  res.json({ message: 'Simple Node.js API "Piyush Bhawsar" is running!' });
});

app.use('/github-wrapped/api/v1/top-languages/:username', async (req, res) => {
  try {
    const username = req.params.username;
    console.log(username + 'Your Data is Now Hacked haha 😈😈');
    const response = await axios.get(`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&theme=nightowl&hide_border=false&include_all_commits=true&count_private=false&layout=compact`);
    const svgData = response.data;

    const langRegExp = /<text data-testid="lang-name"\s*x="\d+"\s*y="\d+"\s*class='lang-name'>\s*([^<]+)\s*<\/text>\s*<\/g>/g;
    const matches = [...svgData.matchAll(langRegExp)];
    const languages = matches.map(match => match[1].trim());

    res.json({ data: languages }); // Sending data in the form of an array
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.use('/github-wrapped/api/v1/github-stats/:username', async (req, res) => {
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
      data: [
        { label: 'Total Stars Earned', value: stars },
        { label: 'Total Commits', value: commits },
        { label: 'Total PRs', value: prs },
        { label: 'Total Issues', value: issues },
        { label: 'Contributions 2023', value: contribs },
      ],
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

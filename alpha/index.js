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

    res.json({ data: languages.map(language => ({ name: language })) });
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
      totalStars: stars,
      totalCommits: commits,
      totalPRs: prs,
      totalIssues: issues,
      contributions2023: contribs,
    });
    
  } catch (error) {
    res.status(500).json({ error: 'Bhosde Khul Gaye Server ka XD' });
  }
})
// const githubUsername = 'hkirat';



app.use('/github-wrapped/api/Praash_Babie_Ke_Lie/githubKiTopReposLeloJii/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const githubActivityUrl = `https://github.com/${username}`;
    const response = await axios.get(githubActivityUrl);
    const html = response.data;
    const $ = cheerio.load(html);

    const topLanguages = [];
    $('.lang').each((index, element) => {
      topLanguages.push($(element).text().trim());
    });

    const topRepos = [];
    $('.repo').each((index, element) => {
      topRepos.push($(element).text().trim());
    });
    console.log('Top Repositories:', topRepos);
    res.json({Top_Repositories: topRepos});

  } catch (error) {
    res.status(500).json({ error: 'Bhosde Khul Gaye Server ka XD' });
  }
})


// async function scrapeGitHubData() {
//   try {
//     const response = await axios.get(githubActivityUrl);
//     const html = response.data;
//     const $ = cheerio.load(html);

//     const topLanguages = [];
//     $('.lang').each((index, element) => {
//       topLanguages.push($(element).text().trim());
//     });

//     const topRepos = [];
//     $('.repo').each((index, element) => {
//       topRepos.push($(element).text().trim());
//     });

//     const commitFrequency = $('.day').length;

//     const totalCommits = $('.commits span').first().text().trim();

//     console.log('Top Repositories:', topRepos);
//   } catch (error) {
//     console.error('Bhosde Khul Gaye Server ka XD:', error.message);
//   }
// }
// scrapeGitHubData();

app.use('/', async (req, res) => res.send('ZETA KA SERVER JO SABKE BHOSDE KHOL DEE DING DING DING!!!'))

app.listen(port, () => {
  console.log(`ZETA KA SERVER is running at http://localhost:${port}`);
})
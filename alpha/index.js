const express = require('express');
const app = express();
const apiV1Router = require('./apis/v1');
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Simple Node.js API is running!' });
});
app.get('/test', (req, res) => {
  res.json({ message: 'Simple Node.js API "Piyush Bhawsar" is running!' });
});

app.use('/github-wrapped/api/v1', apiV1Router);



app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
})
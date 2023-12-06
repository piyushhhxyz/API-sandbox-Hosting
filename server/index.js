const express = require('express');
const apiV1Router = require('./apis/v1');
const cors = require('cors');

app.use(cors());

const app = express();
app.use(express.json())

const port = 3000;

app.use('/github-wrapped/api/v1', apiV1Router);

app.get('/', (_,res) => res.json({msg:'Github-Wrapped By Prassh ka APIs Server'}))
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

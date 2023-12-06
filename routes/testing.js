const express = require('express');

const router = express.Router();

router.get('/:pb', async (req, res) => {
    const name = req.params.pb;
    console.log(name);
    res.send("hiii");
})

module.exports = router;
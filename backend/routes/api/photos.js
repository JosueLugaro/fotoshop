const express = require('express')
const asyncHandler = require('express-async-handler');
const Image = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler( async(req, res) => {
    const photos = await Image.findAll();

    res.send(photos);
}));

module.exports = router;

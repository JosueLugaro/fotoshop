const express = require('express')
const asyncHandler = require('express-async-handler');
const db = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler( async(req, res) => {
    const photos = await db.Image.findAll();

    res.json(photos);
}));

module.exports = router;

const express = require('express')
const asyncHandler = require('express-async-handler');
const db = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler( async(req, res) => {
    const photos = await db.Image.findAll();

    res.json(photos);
}));

router.get('/:photoId', asyncHandler( async(req, res) => {
    const photo = await db.Image.findByPk(req.params.photoId);

    res.json(photo);
}))

module.exports = router;

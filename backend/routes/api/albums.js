const express = require('express')
const asyncHandler = require('express-async-handler');
const db = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler( async(req, res) => {
    const albums = await db.Album.findAll();

    res.json(albums);
}));

router.get('/:albumId(\\d+)', asyncHandler( async(req, res) => {
    const album = await db.Album.findByPk(req.params.albumId);

    res.json(album);
}))

router.post('/', asyncHandler( async(req, res) => {
    const { userId, title } = req.body;

    const album = await db.Album.create({
        userId,
        title
    });

    return album;
}))

module.exports = router;

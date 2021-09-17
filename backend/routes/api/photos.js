const express = require('express')
const asyncHandler = require('express-async-handler');
const db = require('../../db/models')

const router = express.Router();

router.get('/', asyncHandler( async(req, res) => {
    const photos = await db.Image.findAll();

    res.json(photos);
}));

router.get('/:photoId(\\d+)', asyncHandler( async(req, res) => {
    const photo = await db.Image.findByPk(req.params.photoId);

    res.json(photo);
}))

router.post('/new', asyncHandler( async(req, res) => {
    const { userId, albumId, imageUrl, title, description } = req.body;
    const newPhoto = await db.Image.create({
        userId,
        albumId,
        imageUrl,
        title,
        content: description
    });

    res.json(newPhoto);
}))

router.post('/:photoId(\\d+)/delete', asyncHandler(async(req, res) => {
    const photo = await db.Image.findByPk(req.params.photoId);
    await photo.destroy();

    res.redirect("/");
}))

router.post('/:photoId(\\d+)/update', asyncHandler(async(req, res) => {
    const { albumId } = req.body;
    const photo = await db.Image.findByPk(req.params.photoId);
    photo.albumId = albumId;

    await photo.save();

    res.json(photo);
}))

module.exports = router;

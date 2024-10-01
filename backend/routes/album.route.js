const express = require('express');
const router = express.Router();
const { album } = require('../services/album.service');
const albumService = new album();

router.get('/', (req, res) => {
    res.send(albumService.getAlbum());
});
router.post('/', (req, res) => {
    albumService.addAlbum(req.body);
    res.send('Album added');
});

module.exports = router;
const e = require("express");

class album {
  constructor() {
    this.album = [];
  }

  addAlbum(album) {
    this.album.push(album);
  }

  getAlbum() {
    return this.album;
  }
}

exports.album = album;
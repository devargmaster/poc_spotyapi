// no utiliza express ni faker, solo es un servicio que guarda los datos en memoria, pero 
// se podria agregar la api de spotify para obtener los datos de los albumes

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
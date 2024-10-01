const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const redirect_uri = 'http://localhost:3000/callback';  // URL de redirección de Spotify
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

// 1. Ruta para autenticar con Spotify
app.get('/login', (req, res) => {
  const scopes = 'playlist-modify-public playlist-modify-private';
  const spotifyAuthUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scopes)}`;
  res.redirect(spotifyAuthUrl);
});

// 2. Ruta de callback para recibir el token de Spotify
app.get('/callback', async (req, res) => {
  const code = req.query.code || null;
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
        client_id: client_id,
        client_secret: client_secret
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { access_token, refresh_token } = response.data;
    res.json({ access_token, refresh_token });
  } catch (error) {
    console.error('Error al obtener el token:', error);
    res.send('Error en el proceso de autenticación');
  }
});

// 3. Ruta para agregar temas a la lista de reproducción
app.post('/add-to-playlist', async (req, res) => {
  const { access_token, playlist_id, track_uri } = req.body;

  try {
    const response = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
      {
        uris: [track_uri]
      },
      {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }
    );

    res.status(200).json({ message: 'Track agregado a la lista!' });
  } catch (error) {
    console.error('Error al agregar el tema:', error.response.data);
    res.status(400).json({ error: error.response.data });
  }
});

app.listen(5000, () => {
  console.log('Servidor corriendo en http://localhost:5000');
});

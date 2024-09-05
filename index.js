const express = require('express');
const app = express();
const { initRoutes } = require('./routes/index');
require('dotenv').config();
const port = 3000;
app.use(express.json());
initRoutes(app);

const clientid= process.env.SPOTIFY_CLIENT_ID;
const clientsecret= process.env.SPOTIFY_CLIENT_SECRET;
const authString = Buffer.from(`${clientid}:${clientsecret}`).toString('base64');
console.log(authString);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);
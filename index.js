const express = require('express');
const app = express();
const { initRoutes } = require('./routes/index');
const port = 3000;
app.use(express.json());
initRoutes(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);
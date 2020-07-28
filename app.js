const express = require('express');

const app = express();

const PORT_SERVER = 3030;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT_SERVER, () => {
    console.log(`app server started on port ${PORT_SERVER}.`);
});

const express = require('express');
const axios = require('axios');
const app = express();
const path = require('path');
const fs = require('fs');

app.get('/endpoint1', (req, res) => {
    const fileName = req.query.fileName;
    const directory = 'safe_directory';
    const absolutePath = path.join(__dirname, directory, fileName);

    if (absolutePath.indexOf(path.join(__dirname, directory)) !== 0) {
        return res.status(400).send('Invalid file path');
    }

    fs.readFile(absolutePath, (err, data) => {
        if (err) {
            res.status(500).send('File not found');
            return;
        }
        res.send(data);
    });
});

app.get('/endpoint2', async (req, res) => {
    const url = req.query.url;

    try {
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching the URL');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


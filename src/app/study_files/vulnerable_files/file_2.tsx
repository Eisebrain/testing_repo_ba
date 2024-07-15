const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.get('/endpoint1', (req, res) => {
    const filePath = req.query.filePath;
    const absolutePath = path.join(__dirname, filePath);

    fs.readFile(absolutePath, (err, data) => {
        if (err) {
            res.status(500).send('File not found');
            return;
        }
        res.send(data);
    });
});

app.get('/endpoint2', (req, res) => {
    const fileName = req.query.fileName;
    const directory = req.query.directory || 'public';
    const absolutePath = path.join(__dirname, directory, fileName);

    res.download(absolutePath, (err) => {
        if (err) {
            res.status(500).send('Error downloading file');
        }
    });
});

app.get('/endpoint3', (req, res) => {
    const user = {
        name: 'John Doe',
        content: 'Hello, I am John Doe.'
    };

    const escapeHtml = (unsafe) => {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    };

    res.send(`
        <h1>Welcome, ${escapeHtml(user.name)}</h1>
        <p>Your content: ${escapeHtml(user.content)}</p>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


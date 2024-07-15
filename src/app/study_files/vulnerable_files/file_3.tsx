const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const fs = require('fs');
const path = require('path');

app.use(fileUpload());

app.post('/endpoint1', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let sampleFile = req.files.sampleFile;
    let uploadPath = path.join(__dirname, 'uploads', sampleFile.name);

    sampleFile.mv(uploadPath, (err) => {
        if (err) {
            return res.status(500).send(err);
        }

        res.send('File uploaded!');
    });
});

app.post('/endpoint2', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    const storedName = process.env.USERNAME;
    const storedPassword = process.env.PASSWORD;

    if (name === storedName && password === storedPassword) {
        res.send('Login successful');
    } else {
        res.status(401).send('Invalid credentials');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


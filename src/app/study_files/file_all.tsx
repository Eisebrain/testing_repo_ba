const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

app.use(bodyParser.urlencoded({ extended: true }));

// Setup database
db.serialize(() => {
    db.run("CREATE TABLE records (id INT, name TEXT, password TEXT, email TEXT)");
    db.run("INSERT INTO records (id, name, password, email) VALUES (1, 'admin', 'password123', 'admin@example.com')");
    db.run("INSERT INTO records (id, name, password, email) VALUES (2, 'user', 'userpass', 'user@example.com')");
});


app.get('/endpoint1/:id', (req, res) => {
    const userId = req.params.id;
    const authToken = req.headers.authorization;

    if (!authToken || authToken !== 'Bearer securetoken123') {
        return res.status(401).send('Unauthorized');
    }

    db.get("SELECT * FROM records WHERE id = ?", [userId], (err, row) => {
        if (row) {
            res.send(`User: ${row.name}, Email: ${row.email}`);
        } else {
            res.send('User not found');
        }
    });
});

app.post('/endpoint2', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    db.get(`SELECT * FROM records WHERE name = '${name}' AND password = '${password}'`, (err, row) => {
        if (row) {
            res.send(`Welcome ${row.name}, your email is ${row.email}`);
        } else {
            res.send('Invalid name or password');
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

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


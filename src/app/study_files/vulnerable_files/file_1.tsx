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


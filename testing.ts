// api/database.js
import sqlite3 from 'sqlite3';

export default async function handler(req, res) {
    const { benutzer_eingabe } = req.query;

    if (!benutzer_eingabe) {
        return res.status(400).json({ error: 'Benutzer-Eingabe fehlt' });
    }

    const query = `SELECT * FROM benutzer WHERE benutzername = '${benutzer_eingabe}'`;


    const connection = new sqlite3.Database('./datenbank.db');

    connection.all(query, (err, ergebnisse) => {
        if (err) {
            return res.status(500).json({ error: 'Datenbankfehler' });
        }

        res.status(200).json({ ergebnisse });
        connection.close();
    });
}

const sqlite3 = require('sqlite3').verbose();
const md5 = require('md5');

const DDSOURCE = "db.sqlite";

    const db = new sqlite3.Database(DDSOURCE, (err) => {
        if (err) {
            //Cannot open DB
            console.log(err.message);
            throw err;
        } else {
            console.log('Connected to the SQLite Database.');
            db.run('Create TABLE products (id INTEGER PRIMARY KEY AUTOINCREMENT, navn TEXT, varenummer INTEGER, placering TEXT, pris INTEGER, antal INTEGER, status TEXT)',
            (err) => {
                if (err) {
                    // Table already Created
                } else {
                    // Table just created, creating some rows
                    const insert = 'INSERT INTO products (navn, varenummer, placering, pris, antal, status)  VALUES (?, ?, ?, ?, ?, ?)';
                    db.run(insert, ["Citroen C1 Sport", "1", "Gang 3", "5", "paa lager"]);
                    db.run(insert, ["Citroen DS7 Crossback", "2", "Gang 4", "5", "paa lager"]);
                }   
        });
    }
});


module.exports = db;
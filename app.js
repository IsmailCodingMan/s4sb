const express = require('express');
const mysql = require('mysql');

const app = express();

// Create Connection
const db = mysql.createConnection({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 's4s.db',
});

//Connect 

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySql Connected...');

});

// Create DataBase

app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE skilldb';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('DATABASE Created...');

    });
});

// Create Table

app.get('/createtable', (req, res) => {
    let sql = 'CREATE TABLE user (id int AUTO_INCREMENT, nom VARCHAR(255), prenom VARCHAR(255), username VARCHAR(255), password VARCHAR(255), comp_acq VARCHAR(255), comp_souh VARCHAR(255), PRIMARY KEY (id))';
    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Table Created...');
    });
});

// Add user 1

app.get('/adduser1', (req, res) => {
    let post = { nom: 'Cherrak', prenom: 'Walid', username: 'dimaocs', password: 'dimaocs1996', comp_acq: 'CATIA V5', comp_souh: 'BlaBla' };
    let sql = 'INSERT INTO user SET ?';

    db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User one created successfully...');
    });
})

// Add user 2

app.get('/adduser2', (req, res) => {
    let post = { nom: 'Elkhettabi', prenom: 'Yassine', username: 'pubgmaroc', password: 'kaka1998', comp_acq: 'English', comp_souh: 'Darija' };
    let sql = 'INSERT INTO user SET ?';

    db.query(sql, post, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User two created successfully...');
    });
})

// Select users 

app.get('/getusers', (req, res) => {
    let sql = 'SELECT * FROM user';

    db.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.send('Users fetched...');
    });
})

// Select user

app.get('/getuser/:id', (req, res) => {
    let sql = `SELECT * FROM user WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User fetched...');
    });
})

// Update user's comp_souh 

app.get('/updateusersouh/:id', (req, res) => {
    let newSkill = 'Test';
    let sql = `UPDATE user SET comp_souh = '${newSkill}' WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User Updated...');
    });
})

// Update user comp_acq

app.get('/updateuseracq/:id', (req, res) => {
    let newSkill = 'Finance';
    let sql = `UPDATE user SET comp_acq = '${newSkill}' WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User Updated...');
    });
})

// Delete user

app.get('/deleteuser/:id', (req, res) => {

    let sql = `DELETE FROM user WHERE id = ${req.params.id}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('User deleted...');
    });
})

// it's a Match 

app.get('/match/:id/:comp_souh', (req, res) => {

    let sql = `SELECT * FROM user WHERE comp_acq = ${req.params.comp_souh}`;

    db.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('MAAAAAAAAAAAATCH!!!!');
    });
})


app.listen('3000', () => {
    console.log('Server started on port 3000');
})
'use strict';

const PORT = 8080;

// PACKAGES
const express = require('express');
const path = require('path');
const mysql = require('mysql');

// APP
const app = express();
app.use('/static', express.static(path.join(__dirname, 'static')));

// DATABASE
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '19910616',
  database: 'reporter',
});
conn.connect((err) => {
    if (err) {
      console.log('Connection error.', err);
      throw err;
    }
    console.log('Connected!');
  });


// FRONTEND ENDPOINT
app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(path.join(__dirname, 'page/home.html'));
  });

// GET USERS
app.get('/users', (req, res) => {
    conn.query('SELECT * FROM users', (err, rows) => {
      if (err) {
        res.status(500);
        res.json({
          message: 'Cannot get the Users',
        });
        throw err;
      }
  
      res.json(rows);
    });
  });
  
// GET TICKETS
app.get('/tickets', (req, res) => {
     
  if(req.query.manufacturer !== undefined){
      conn.query(`SELECT * FROM tickets WHERE tickets.manufacturer = ${req.query.manufacturer}`, (err, rows) => {
          if (err) {
              res.status(500);
              res.json({
                  message: `Problem to get the Tickets from ${req.query.manufacturer} manufacturer`,
              });
              throw err;
          }
      res.json(rows);
      });
  }
   
  else if(req.query.reporter !== undefined){
      conn.query(`SELECT * FROM tickets WHERE tickets.reporter = ${req.query.reporter}`, (err, rows) => {
          if (err) {
              res.status(500);
              res.json({
                  message: `Problem to get the Tickets from ${req.query.reporter} reporter`,
              });
              throw err;
          }
      res.json(rows);
      });
  }
       
  else {
      conn.query('SELECT * FROM tickets', (err, rows) => {
          if (err) {
              res.status(500);
              res.json({
                  message: 'Problem to get the Tickets',
              });
              throw err;
          }
      res.json(rows);
      });
  }
});

app.listen(PORT, () => {
    console.log(`App is up and running on port ${PORT}`);
  });
  
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

app.listen(PORT, () => {
    console.log(`App is up and running on port ${PORT}`);
  });
  
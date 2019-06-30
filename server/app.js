const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 3000;

app.use((req, res, next) => {
    // write your logging code here

    let agent = req.headers['user-agent'];
    let time = new Date().toISOString();
    let method = req.method;    
    let resource = req.path;
    let version = 'HTTP/' + req.httpVersion;
    let status = res.statusCode;
    let logger = agent + ',' + time + ',' + method + ',' + resource + ',' + version + ',' + status;

    fs.appendFile('log.csv', logger + "\n", (err) => { 
        if (err) throw err;
    });
    next();
});  

app.get('/', (req, res) => {
// write your code to respond "ok" here
    res.send('ok');
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
    res.json(__dirname + 'log.csv');
});

module.exports = app;

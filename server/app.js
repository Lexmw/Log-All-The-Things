const express = require('express');
const fs = require('fs');
const csv = require("csvtojson/v2");
const app = express();

const PORT = 3000;

app.use((req, res, next) => {
    // write your logging code here

    let agent = req.headers['user-agent'].replace(',','');
    let time = new Date().toISOString(); 
    let method = req.method;    
    let resource = req.path;
    let version = 'HTTP/' + req.httpVersion;
    let status = res.statusCode;
    let logger = agent + ',' + time + ',' + method + ',' + resource + ',' + version + ',' + status + "\n";

    fs.appendFile('log.csv', logger, (err) => { 
        if (err) throw err;
    });
    next();
});   

app.get('/', (req, res) => {
// write your code to respond "ok" here
    res.send('ok').status(200);
    console.log('node-superagent');
});


// fix the function to convert csv to json object

app.get("/logs", (req, res) => {
    // write your code to return a json object containing the log data here
    csv()
    .fromFile('./log.csv')
    .then((obj)=>{
    console.log(obj);
    res.json(obj);
 })
    });

module.exports = app;

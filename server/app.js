const express = require('express');
const fs = require('fs');
const app = express();

const PORT = 3000;

app.use((req, res, next) => {
    // write your logging code here

    let agent = req.headers['user-agent'].replace(',','');
    let time = new Date().toISOString(); 
    let method = req.method;    
    let resource = req.path;
    let version = 'HTTP:/' + req.httpVersion;
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

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
    fs.readFile('log.csv', 'utf8', (err, csv) => {
        if (err) throw err;
        res.json(toJson(csv));
    });

    function toJson(csv) {
        var lines = csv.split("\n");
        let content = [];
        for (let i = 1; i < lines.length - 1; i++) {
          content.push(lines[i].split(","));
        }
        let finalArr = [];
        for (let i = 0; i < content.length; i++) {
          let obj = {};
          obj["Agent"] = content[i][0];
          obj["Time"] = content[i][1];
          obj["Method"] = content[i][2];
          obj["Resource"] = content[i][3];
          obj["Version"] = content[i][4];
          obj["Status"] = content[i][5];
          finalArr.push(obj);
          console.log(finalArr);
        }
        return finalArr;
      };
    });

module.exports = app;

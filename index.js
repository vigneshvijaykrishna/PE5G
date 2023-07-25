const express = require('express');
const fs = require('fs');
const app = express();
const readline = require('readline');
const csv = require('csv-parser');
const cors = require("cors");
const exp = require('constants');



// handling CORS
// app.use((req, res, next) => {
// 	res.header("Access-Control-Allow-Origin",
// 			"http://localhost:4200");
// 	res.header("Access-Control-Allow-Headers",
// 			"Origin, X-Requested-With, Content-Type, Accept");
// 	next();
// });

app.use(cors());

//read data from txt file
app.get('/api/data', (req, res) => {
var filepath = '/home/vkchlt0731/Downloads/du_stats_23_07_03_15_46_39.txt'

    fs.readFile(filepath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error reading file');
      } else {

        res.send(data);
      }
    });
  });

    //convert csv into JSON
    app.get('/api/csvkey', (req, res) => {
      var results = [];
      var splitend = [];
      fs.createReadStream('/home/vkchlt0731/Downloads/cu_stats_23_06_29_12_28_30.csv')
        .pipe(csv())
        .on('data', (data) => 
        results.push(data)
        )
        .on('end', () => {
        results =  results[results.length - 1]
        var res1 = Object.values(results)
        res1.forEach((emp)=>{
          splitend.push(emp.split(':'))
        })
        
        const keyvaluePairs = splitend.reduce((result,[key,value])=>{
          result[key] = value;
          return result;
        },{})

        res.json(keyvaluePairs);

        });
    });
  

app.use(express.static("frontend"))

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

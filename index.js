// Import libraries 
const express = require('express');
const request = require('request-promise');
const fs = require('fs');
const lineReader = require('line-reader');

// Initilize all import constant variables
const app = express();
const PORT = process.env.PORT || 5000;
const safe_url = 'https://raw.githubusercontent.com/TabulateJarl8/randfacts/master/randfacts/safe.txt';
const unsafe_url = 'https://raw.githubusercontent.com/TabulateJarl8/randfacts/master/randfacts/unsafe.txt';
const safe_facts = [];
const unsafe_facts = [];

app.set('view engine', 'ejs');

app.use(express.json());

function Trim(list) {
    return list.replace('\r\n ','');
  }

//////////////////////////////////////////////////////
function download_fact_list(url, filename) {
  request(url)
    .then(function(html){
      //success!
      Trim(html);
      // console.log(html);
      fs.writeFile(filename, html, (err) => {
      
          // In case of a error throw err.
          if (err) throw err;
      })
    })
    .catch(function(err){
      //handle error
    });
}

download_fact_list(safe_url, 'safe.txt');
download_fact_list(unsafe_url, 'unsafe.txt');
/////////////////////////////////////////////////////////

// scrapes github for facts and puts them in files
// request(safe_url)
//   .then(function(html){
//     //success!
//     Trim(html);
//     // console.log(html);
//     fs.writeFile('safe.txt', html, (err) => {
      
//         // In case of a error throw err.
//         if (err) throw err;
//     })
//   })
//   .catch(function(err){
//     //handle error
//   });

// request(unsafe_url)
//   .then(function(html){
//     //success!
//     Trim(html);
//     // console.log(html);
//     fs.writeFile('unsafe.txt', html, (err) => {
      
//         // In case of a error throw err.
//         if (err) throw err;
//     })
//   })
//   .catch(function(err){
//     //handle error
// });

// Creates lists of facts to randomly choose from.
lineReader.eachLine('safe.txt', function(line) {
  safe_facts.push(line);
});

lineReader.eachLine('unsafe.txt', function(line) {
  unsafe_facts.push(line);
});

// index page
app.get('/', function(req, res) {
  res.render('pages/index');
});


app.get('/fact/safe', async (req, res) => {
  var safe_fact = safe_facts[Math.floor(Math.random()*safe_facts.length)];
  res.send(safe_fact);
});

app.get('/fact/unsafe', async (req, res) => {
  var unsafe_fact = unsafe_facts[Math.floor(Math.random()*unsafe_facts.length)];
  res.send(unsafe_fact);
});


app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
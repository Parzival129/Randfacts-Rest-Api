const express = require('express');
const request = require('request-promise');
const fs = require('fs');
const lineReader = require('line-reader');

const app = express();
const PORT = process.env.PORT || 5000;
const safe_url = 'https://raw.githubusercontent.com/TabulateJarl8/randfacts/master/randfacts/safe.txt';
const unsafe_url = 'https://raw.githubusercontent.com/TabulateJarl8/randfacts/master/randfacts/unsafe.txt';


app.use(express.json());

function Trim(list) {
    return list.replace('\r\n ','');
  }

// scrapes github for facts and puts them in files
request(safe_url)
  .then(function(html){
    //success!
    Trim(html);
    // console.log(html);
    fs.writeFile('safe.txt', html, (err) => {
      
        // In case of a error throw err.
        if (err) throw err;
    })
  })
  .catch(function(err){
    //handle error
  });

request(unsafe_url)
  .then(function(html){
    //success!
    Trim(html);
    // console.log(html);
    fs.writeFile('unsafe.txt', html, (err) => {
      
        // In case of a error throw err.
        if (err) throw err;
    })
  })
  .catch(function(err){
    //handle error
});

app.get('/', (req, res) => {
    res.send('Welcome to the Randfacts REST-API!');
});

app.get('/fact/safe', async (req, res) => {
    console.log(t);
});

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
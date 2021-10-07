const express = require('express')
const fs = require('fs')
const app = express()
  
app.get('/', (req, res) => {
  res.end('Hello World!, 🙂 ');
});
  
app.get("/users", (req, res) => {
    fs.readFile(__dirname + '/' + 'users.json', 'utf8', (err, data) => {
        res.end(data);
    });
});
  
app.listen(8000, () => {
    console.log(`app listening at http://localhost:8000`)
  });

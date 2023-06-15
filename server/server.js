const express = require('express');
const fs = require('fs');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const jsonParser = express.json();
const port = 3002;

app.use(cors());

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});

app.get('/users', (request, response) => {
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      return response.status(500).send(err);
    } else {
      try {
        const users = JSON.parse(data);
        return response.send(users);
      } catch (err) {
        return response.status(500).send(err);
      }
    }
  });
});



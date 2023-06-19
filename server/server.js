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

app.post('/user', jsonParser, (request, response) => {
  const requestedUser = request.body;

  if (!requestedUser) {
    response.status(400).send('There is no any user data');
  } else {
    fs.readFile('./users.json', 'utf8', (err, data) => {
      if (err) {
        return response.status(500).send(err);
      } else {
        try {
          const users = JSON.parse(data);

          requestedUser.id = uuidv4();
          users.push(requestedUser);
          const json = JSON.stringify(users, null, 2, '\t');
          fs.writeFile('./users.json', json, 'utf8', (err) => {
            if (err) {
              return response.status(500).send(err);
            }
            return response.status(200).json('OK');
          });
        } catch (err) {
          return response.status(500).send(err);
        }
      }
    });
  }
});

app.delete('/user', (request, response) => {
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      return response.status(500).send(err);
    } else {
      try {
        const users = JSON.parse(data);
        const id = request.query.id;

        if (users.length) {
          const filteredList = users.filter(todo => todo.id !== id);
          const json = JSON.stringify(filteredList, null, 2, '\t');
          fs.writeFile('./users.json', json, 'utf8', (err) => {
            if (err) {
              return response.status(500).send(err);
            }
            return response.status(200).json('OK');
          });
        } else {
          return response.status(500).send('User list is empty');
        }
      } catch (err) {
        return response.status(500).send(err);
      }
    }
  });
});

app.post('/users', jsonParser, (request, response) => {
  const updatedUsers = request.body;
  fs.readFile('./users.json', 'utf8', (err, data) => {
    if (err) {
      return response.status(500).send(err);
    } else {
      try {
        let users = JSON.parse(data);

        if (users.length) {
          users = users.map((user) => {
            const updatedUserInfo = updatedUsers.find((u) => u.id === user.id);

            return updatedUserInfo ? updatedUserInfo : user;
          })
          const json = JSON.stringify(users, null, 2, '\t');
          fs.writeFile('./users.json', json, 'utf8', (err) => {
            if (err) {
              return response.status(500).send(err);
            }
            return response.status(200).json('OK');
          });
        } else {
          return response.status(500).send('User list is empty');
        }
      } catch (err) {
        return response.status(500).send(err);
      }
    }
  });
});

// Load packages
const express = require('express');
var fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();

var corsOptions = {
  origin: 'http://example.com',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.json());
app.use(cors(corsOptions))

// Récupération des données du fichier json
var obj = JSON.parse(fs.readFileSync('data.json', 'utf8'));

console.log(obj["version"]);

function getUser(name) {
  users = obj["users"];
  for (var i = 0; i < users.length; i++) {
    if (name == users[i]) {
      return users[i];
    }
  }
  return "not found";
}

app.route('/api/users/:name').get((req, res) => {
  let user = getUser(req.params['name']);
  res.send(200, user);
});

app.route('/api/users').get((req,res) => {
  res.send(200, obj["users"]);
})

app.route('/api/users').post((req, res) => {
  let user = req.body;
  obj["users"].push(user);
  res.send(201, req.body);
});

// On va juste changer l'age ici
app.route('/api/users/:name').put((req, res) => {
  let user = getUser(req.params['name']);
  user["age"] = req.body.age;
  res.send(200, user);
});

app.route('/api/users/:name').delete((req, res) => {
  users = obj["users"];
  newUsers = [];
  for (var i = 0; i < obj.length; i++) {
    if (users[i] != req.params['name']) {
      newUsers.push(users[i]);
    }
  }
  obj["users"] = newUsers;
  res.sendStatus(204);
});

app.listen(8000, () => {
  console.log('Server started on port 8000!');
});



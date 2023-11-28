const express = require("express");
var cors = require("cors");
const mysql = require("mysql");
var bodyParser = require("body-parser");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;
const saltRounds = 10;

var loginTemp = {}

app.use(cors());
var jsonParser = bodyParser.json();

const connection = mysql.createConnection({
  host: "localhost",
  user: "node",
  password: "adminpass",
  multipleStatements: true,
});

var placeholderEventData = {
  0: {
    title: "Garbage Pickup",
    subtitle: "Picking up garbage in Champaign",
    desc: "Garbage bags and gloves will be provided.",
    tags: ["Community Service", "Environmental"],
  },
  1: {
    title: "Food Pantry Visit",
    subtitle: "Help us pack food baskets for the homeless!",
    desc: "Please sign up below, first 20 volunteers get a tote bag!",
    tags: ["Community Service", "Food"],
  },
  2: {
    title: "Soup Kitchen Visit",
    subtitle: "Serve soup to impoverished communities",
    desc: "Bring your own set of gloves please.",
    tags: ["Community Service", "Food"],
  },
  3: {
    title: "Teaching Children",
    subtitle: "Read a book to communities of impoverished children",
    desc: "Books will be provided, please show up to the library 30 minutes before your assigned time.",
    tags: ["Community Service", "Educational"],
  },
  4: {
    title: "Save the Birds",
    subtitle: "Feed endangered birds in our community",
    desc: "Enjoy birdwatching and nature? This will be perfect for you! Bird food will be provided.",
    tags: ["Environmental", "Food"],
  },
  5: {
    title: "Serve as a Mentor",
    subtitle: "Spend a day with children coming from neglected households",
    desc: "We encourage you to keep in contact with your assigned child after the program is over.",
    tags: ["Community Service", "Educational"],
  },
  6: {
    title: "Spread Your Recipes",
    subtitle: "Prepare food for poor communities",
    desc: "Please prepare enough to feed about 10 families. Share your recipes with other particpants!",
    tags: ["Educational", "Food"],
  },
};

initQuery = `
CREATE DATABASE IF NOT EXISTS ngo;
USE ngo;
CREATE TABLE IF NOT EXISTS events (eventID BINARY(16) PRIMARY KEY, title VARCHAR(255) NOT NULL, subtitle VARCHAR(255) NOT NULL, description VARCHAR(1000) NOT NULL, tags VARCHAR(255) NOT NULL);
CREATE TABLE IF NOT EXISTS users (userID INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(100) NOT NULL, password VARCHAR(255) NOT NULL, salt VARCHAR(255) NOT NULL);
`;

connection.query(initQuery, function (err, result) {
  if (err) throw err;
  console.log("Database Initialized");
});

connection.query("SELECT * FROM events", function (err, result, fields) {
  if (err) throw err;
  if (result.length == 0) {
    for (key in placeholderEventData) {
      var eventData = placeholderEventData[key];
      var tags = "";
      for (index in eventData.tags) {
        if (index != 0) {
          tags += ",";
        }
        tags += eventData.tags[index];
      }
      var query = `INSERT INTO events VALUES (UUID_TO_BIN(UUID()), '${eventData.title}','${eventData.subtitle}','${eventData.desc}', '${tags}')`;
      connection.query(query, function (err, result) {
        if (err) throw err;
        console.log("Database Initialized");
      });
    }
  }
});

app.get("/", (req, res) => {
  res.send("Backend Running");
});

app.post("/register", jsonParser, (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send("Username and password are required");
  }

  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).send("Username and password is of invalid data types");
  }

  console.log("testing", req.body);
  bcrypt.genSalt(saltRounds, function (err, salt) {
    if (err) {
      return res.status(500).send("Error generating salt");
    }

    bcrypt.hash(req.body["password"], salt, function (err, hash) {
      if (err) {
        return res.status(500).send("Error hashing password");
      }

      query = `INSERT INTO users (username, password, salt) VALUES ('${req.body["username"]}','${hash}','${salt}')`;
      connection.query(query, function (err, result, fields) {
        if (err) {
          return res.status(500).send("Error creating user");
        }

        res.status(200).send("User created successfully");
      });
    });
  });
});

app.post("/login", jsonParser, (req, res) => {
  const data = req.body;
  const findUserQuery = `SELECT * FROM users WHERE username = ?`;
  console.log("query", findUserQuery);
  connection.query(findUserQuery, data["username"], function (err, result, fields) {
    if (err) {
      return res.status(500).send("Server error during user lookup");
    }

    if (result.length > 0) {
      const realPass = result[0]["password"];
      bcrypt.compare(data["password"], realPass, function (err, compResult) {
        if (compResult) {
          loginTemp[data['username']] = makeToken()
          res.status(200).send({userName:data['username'], token:loginTemp[data['username']]})
        } else {
          res.sendStatus(401)
        }
      });
    } else {
      res.sendStatus(401)
    }
  });
});

app.post("/logout", jsonParser, (req, res) => {
  const data = req.body;
  const user = data['user']

  for (userName in loginTemp) {
    if (userName == user) {
      delete loginTemp[user]
      console.log("200 sent")
      return res.sendStatus(200)
    }
  }
  return res.sendStatus(400)
});

app.get("/events", (req, res) => {
  connection.query("SELECT * FROM events", function (err, result, fields) {
    if (err) {
      return res.status(500).send("Error fetching events");
    }
    res.send(result);
  });
});

app.get("/events/:eventID", (req, res) => {
  connection.query(`SELECT * FROM events WHERE eventID = '${req.params["eventID"]}'`, function (err, result, fields) {
    if (err) {
      return res.status(500).send("Error retrieving events");
    }

    if (result.length == 0) {
      return res.status(500).send("Event not found");
    }

    res.send(result);
  });
});

app.post("/events", jsonParser, (req, res) => {
  var data = req.body;
  var title = data[0];
  var subtitle = data[1];
  var description = data[2];
  var tags = data[3];
  var failed = false
  query = `INSERT INTO events VALUES (UUID_TO_BIN(UUID()), '${title}','${subtitle}','${description}', '${tags}')`;
  console.log(data)
  console.log(query)
  connection.query(query, function (err, result, fields) {
    if (err) {
      failed = true
      console.log(err)
    }
  });
  if (failed) {
    return res.sendStatus(500)
  }
  return res.sendStatus(200)
});

app.post("/auth", jsonParser, (req, res) => {
  var data = req.body
  const token = data.token
  const user = data.user
  for (userName in loginTemp) {
    if (userName = user) {
      if (token == loginTemp[user]) {
        return res.sendStatus(200)
      }
    }
  }
  return res.sendStatus(401)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


function makeToken() {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 20) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
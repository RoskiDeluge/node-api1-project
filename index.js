const express = require('express');
const shortid = require('shortid');

const server = express();

let users = [
  {
    name: "Jane Doe", 
    bio: "Not Tarzan's Wife, another Jane"
  }
];

server.listen(5000, () => {
  console.log("*** server listening on port 5000 ***")
})

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello world!")
})

server.get("/api/users", (req, res) => {
  res.status(200).json(users);
})

server.get("/api/users", (req, res) => {
  res.status(500).json({ errorMessage: "The users info could not be retrieved" });
})

server.post("/api/users", (req, res) => {
  const userInfo = req.body;

  userInfo.id = shortid.generate();

  if (userInfo.name === undefined || userInfo.bio === undefined) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    users.push(userInfo)
    res.status(201).json(userInfo)
  }
})

server.post("/api/users", (req, res) => {
  res.status(500).json({errorMessage: "There was an error while saving the user to the database"})
})


server.get("/users/:id", (req, res) => {
  const found = users.find(user => user.id === id);

  if (found) {
      res.status(200).json(found);
  } else {
      res
          .status(404)
          .json({ success: false, message: "The user with the specified ID does not exist." });
  }
});


server.delete("/users/:id", (req, res) => {
  const { id } = req.params;

  const deleted = users.find(user => user.id === id);

  if (deleted) {
      users = users.filter(user => user.id !== id);

      res.status(200).json(deleted);
  } else {
      res
          .status(404)
          .json({ success: false, message: "The user with the specified ID does not exist." });
  }
});


server.put("/users/:id", (req, res) => {
 
  const { id } = req.params;

  const changes = req.body;


  let index = users.findIndex(user => user.id === id);

  if (index !== -1) {
      users[index] = changes;
      res.status(200).json(users[index]);
  } else {
      res
          .status(404)
          .json({ success: false, message: "The user with the specified ID does not exist." });
  }
});
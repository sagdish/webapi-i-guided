const express = require("express");
const db = require('./data/hubs-model');

const server = express();

server.use(express.json());

server.listen(4000, () => {
  console.log("==== server listening on PORT 4000 ====");
});

server.get("/", (req, res) => {
  console.log("you asked for it .");
  res.send('sample response');

})

server.get("/hubs", (req, res) => {
  db.find()
    .then(hubs => {
      res.status(200).json(hubs);
    })
    .catch(err => {
      res.status(500).json({ error: err })
    })
});

server.post("/hubs", (req, res) => {
  const hubInfo = req.body

  db.add(hubInfo)
    .then(hub => {
      res.status(201).json({ success: true, hub })
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

server.delete("/hubs/:id", (req, res) => {
  const { id } = req.params

  db.remove(id)
    .then(deletedHub => {
      if (deletedHub) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: `I couldn't find id = ${id}`});
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err })
    });
})

server.put("/hubs/:id", (req, res) => {
  const { id } = req.params;
  const hubInfo = req.body;

  db.update(id, hubInfo)
    .then(hub => {
      if (hub) {
        res.status(200).json({ success: true, hub })
      } else {
        res.status(404).json({ success: false, message: `id ${id} does not exist`})
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err })
    });
});

server.get("/hubs/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(hub => {
      if (hub) {
        res.status(200).json({ success: true, hub })
      } else {
        res.status(404).json({ success: false, message: `id ${id} does not exist`})
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
})

// console.log("hello world");

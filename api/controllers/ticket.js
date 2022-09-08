import ticketRepo from "../../db/models/ticket-schema.js";

function retrieveAll(req, res) {
  const email = req.params.email;
  ticketRepo
    .find({ Email: email })
    .then((tickets) => {
      res.send(tickets);
    })
    .catch((err) => {
      res.send({ message: err });
    });
}

function retrieve(req, res) {
  const id = req.params.id;
  ticketRepo
    .findById(id)
    .then((ticket) => {
      res.send(ticket);
      console.log(ticket);
    })
    .catch((err) => {
      res.send({ message: err });
    });
}

export { retrieveAll, retrieve };

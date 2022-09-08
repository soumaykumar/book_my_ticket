import ticketRepo from "../models/ticket-schema.js";

function submitTicket(req, res) {
  const ticket = req.body;
  console.log(ticket);
  const newTicket = new ticketRepo({
    Movie: ticket.Movie,
    Date: ticket.Date,
    Cinema_Hall: ticket.Cinema_Hall,
    NT: ticket.NT,
    Email: ticket.Email,
  });
  newTicket
    .save()
    .then((ticket) => {
      res.send({
        status: "success",
        id: ticket._id,
        message: "Ticket Booked Successfully!",
      });
    })
    .catch((err) => {
      res.send({ status: "success", message: err });
    });
}

export { submitTicket };

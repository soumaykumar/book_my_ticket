import express from "express";
const app = express.Router();

import { retrieveAll, retrieve } from "../controllers/ticket.js";
import { submitTicket } from "../../db/repository/ticket-operations.js";

app.post("/issueTicket", submitTicket);
app.get("/retrieveAll/:email", retrieveAll);
app.get("/retrieve/:id", retrieve);

export default app;

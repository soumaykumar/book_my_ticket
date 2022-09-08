import express from "express";
const app = express.Router();

import {usercheck, Login} from "../controllers/user.js";

app.post("/login", Login);
app.post("/register", usercheck);
app.get("/validate/:token", usercheck);

export default app;

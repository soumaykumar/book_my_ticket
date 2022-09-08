import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../db/models/user-schema.js";

var usercheck = express.Router();

function Login(req, res) {
  const userLoggingIn = req.body;
  User.findOne({ email: userLoggingIn.email }).then((dbUser) => {
    if (!dbUser) {
      return res.send({ message: "No Account Found with this Email" });
    }
    bcrypt
      .compare(userLoggingIn.password, dbUser.password)
      .then((isCorrect) => {
        if (isCorrect) {
          const payload = {
            id: dbUser._id,
            email: dbUser.email,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "864000000" },
            (err, token) => {
              if (err) return res.data({ message: err });
              return res.send({
                message: "Logged In Successfully",
                token: token,
                email: req.body.email,
              });
            }
          );
        } else {
          return res.send({ message: "Incorrect Password" });
        }
      });
  });
}

usercheck.post("/register", async (req, res) => {
  const user = req.body;
  const takenEmail = await User.findOne({ email: user.email });

  if (takenEmail) {
    res.send({ message: "Account already Exists" });
  } else {
    user.password = await bcrypt.hash(user.password, 10);
    const dbUser = new User({
      email: user.email,
      password: user.password,
      name: user.name,
    });
    dbUser
      .save()
      .then((user) => {
        res.send({
          message: "Account Created Successfully! Please Login",
        });
      })
      .catch((err) => {
        res.send({ message: err });
      });
  }
});

function verifyJWT(req, res, next) {
  const token = req.params.token;
  if (token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.send({
          isLogged: false,
          message: "Failed to Authenticate",
        });
      }
      res.email = decoded.email;
      next();
    });
  } else {
    console.log("Incorrect Token");
    return res.send({
      isLogged: false,
      message: "Incorrect Token Provided",
    });
  }
}

usercheck.get("/validate/:token", verifyJWT, (req, res) => {
  res.send({
    isLogged: true,
    message: "Logged In",
    email: res.email,
  });
});

export {usercheck, Login};

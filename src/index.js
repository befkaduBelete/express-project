import express, { request, response } from "express";
import { PORT } from "./lib/connection.js";
import { users } from "./lib/userList.js";
import { products } from "./lib/productList.js";
import routes from "./routers/index.js";

import mongoose from "mongoose";
import connectDB from "./util/db.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./stratajes/local-stratagy.js";
const app = express();

// const loginMiddleware = (request, response, next) => {
//   console.log(`${request.method} - ${request.url}`);
// };

// app.use(loginMiddleware);

// app.use((req, res, next) => {
//   console.log("Time:", Date.now());
//   next();
// });

connectDB();
app.use(express.json());
app.use(cookieParser("helloworld"));
app.use(
  session({
    secret: "AASTU",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/api", (request, response) => {
  console.log(request.session);
  console.log(request.sessionID);
  request.session.visited = true;
  response.cookie("hello", "world", { maxAge: 10000 });
  response.status(201).send({ message: "Hello" });
  // return;
});

app.post("/api/auth", passport.authenticate("local"), (request, response) => {
  return response.sendStatus(200);
});

app.get("/api/auth/status", (request, response) => {
  const user = request.user;
  console.log(` This is status ${JSON.stringify(user)}`);
  console.log(request.session);

  return response.status(200).send(user);
});

app.post("/api/auth/logout", (request, response) => {
  if (!request.user) return response.sendStatus(401);
  request.logout((err) => {
    if (err) return response.sendStatus(400);
    response.send(200);
  });
});

app.use(routes);

app.listen(PORT, () => {
  console.log(`The server run at port ${PORT}`);
});

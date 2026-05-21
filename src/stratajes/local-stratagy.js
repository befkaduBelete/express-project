import passport from "passport";

import { Strategy } from "passport-local";
import { users } from "../lib/userList.js";
import { User } from "../schemas/user.js";
import { comparePassowrd } from "../lib/hellper.js";

passport.serializeUser((user, done) => {
  console.log("Srializaing Page");
  console.log(user);
  done(null, user.username);
});

passport.deserializeUser(async (username, done) => {
  console.log("Deserilized");
  console.log(`Username is ${username}`);
  try {
    const findUser = await User.findById(id);
    // const findUser = users.find((user) => user.username === username);
    if (!findUser) throw new Error("User not found");
    done(null, findUser);
  } catch (err) {
    done(err, null);
  }
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    console.log(`username : ${username}`);
    console.log(`Password ${password}`);
    try {
      const findUser = await User.findOne({ username: username });

      //   const findUser = users.find((user) => user.username === username);
      if (!findUser) throw new Error("User not found");
      //   if (findUser.password != password) throw new Error("Invalid Credentials");
      //hashed password comparission
      if (!comparePassowrd(password, findUser.password))
        throw new Error("Invalid Credentials");
      done(null, findUser);
    } catch (error) {
      done(error, null);
    }
  }),
);

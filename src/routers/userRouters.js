import { Router } from "express";
import { users } from "../lib/userList.js";
import { User } from "../schemas/user.js";
import {
  body,
  checkSchema,
  matchedData,
  validationResult,
} from "express-validator";
import { userAddSchemaValidation } from "../util/userSchemaValidation.js";
import { hashPassword } from "../lib/hellper.js";

const userRouter = Router();

userRouter.get("/api/users", async (request, response) => {
  console.log(request.sessionID);
  request.sessionStore.get(request.session.id, (err, sessionData) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log(sessionData);
  });

  try {
    const userList = await User.find();
    response.status(200).send(userList);
  } catch (error) {
    response.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

userRouter.get("/api/users/:id", async (request, response) => {
  const parsedId = request.params.id;
  try {
    // const findUser = await User.find({ _id: parsedId });
    const findUser = await User.findById(parsedId);
    return response.status(200).send(findUser);
  } catch (err) {
    response.status(500).send({
      message: "The user not exist",
      error: err.message,
    });
  }
});

// userRouter.get("/api/users/:id", (request, response) => {
//   const parsedId = parseInt(request.params.id);
//   if (isNaN(parsedId))
//     return response.status(400).send({ message: "Bad request" });
//   const userFind = users.find((user) => user.id === parsedId);
//   if (!userFind) return response.status(404).send({ message: "Not found " });
//   else return response.status(200).send(userFind);
//   console.log(request.url);
//   console.log(request.params);
// });

userRouter.post(
  "/api/users",
  checkSchema(userAddSchemaValidation),
  async (request, response) => {
    console.log("jjjjjjjjjjjjjj");
    const result = validationResult(request);
    console.log(result);
    if (!result.isEmpty())
      return response.status(400).send({ errors: result.array() });
    const data = matchedData(request);
    console.log(result);
    // const { body } = request;

    // const newUser = new User(body);
    data.password = hashPassword(data.password);

    const newUser = new User(data);
    try {
      const savedUser = await newUser.save();
      return response.status(201).send(savedUser);
    } catch (err) {
      console.log(err);
    }
  },
);

userRouter.delete("/api/users/:id", async (request, response) => {
  const parsedId = request.params.id;
  try {
    // const findUser = await User.find({ _id: parsedId });
    const findUser = await User.findByIdAndDelete(parsedId);
    return response.status(200).send({
      message: "User has been deleted successfuly ",
    });
  } catch (err) {
    response.status(500).send({
      message: "The user not exist",
      error: err.message,
    });
  }
});

userRouter.put("/api/users/:id", async (request, response) => {
  const userId = request.params.id;
  const updatedData = request.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return response.status(404).send({
        message: "User not found",
      });
    }

    return response.status(200).send({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (err) {
    return response.status(500).send({
      message: "Failed to update user",
      error: err.message,
    });
  }
});
export default userRouter;

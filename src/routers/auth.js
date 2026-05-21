import { Router } from "express";

const authRouter = Router();

authRouter.post("/api/auth", (request, response) => {
  const {
    body: { username, password },
  } = request;
  const findUser = users.find((user) => user.username === username);
  if (!findUser || findUser.password !== password) {
    console.log(" USER NOT FOUND");
    return response.status(401).send({ message: "BAD Request" });
  }

  request.session.user = findUser;
  return response.status(200).send(findUser);
});

authRouter.get("/api/auth/status", (request, response) => {
  return request.session.user
    ? response.status(200).send(request.session.user)
    : response.status(401).send({ message: "Not Authenticated " });
});

export default authRouter;

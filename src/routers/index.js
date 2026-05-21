import { Router } from "express";
import userRouter from "./userRouters.js";
import productRoute from "./productRouters.js";

const routes = Router();

routes.use(userRouter);
routes.use(productRoute);

export default routes;

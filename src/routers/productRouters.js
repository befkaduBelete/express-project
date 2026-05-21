import { Router } from "express";
import { products } from "../lib/productList.js";

const productRoute = Router();

productRoute.get("/api/products", (request, response) => {
  console.log(request.headers.cookie);
  console.log(request.cookies);
  if (request.cookies.hello && request.cookies.hello === "world")
    return response.status(200).send(products);
  else
    return response
      .status(401)
      .send({ message: "Sorry you have no right cookies" });
});

export default productRoute;

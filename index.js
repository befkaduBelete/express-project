import express from "express";
import dotenv from "dotenv";

dotenv.config({ path: "local.env" });
const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`The server run at port ${PORT}`);
});

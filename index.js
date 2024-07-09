
import express from "express";
import AppRouter from "./src/routers/router.js";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = Number(process.env.PORT);

app.use(cors());
app.use(express.json());
app.use("/", AppRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the Server! 🌐");
});

mongoose
  .connect(`$localhost:27017`)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

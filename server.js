import express from "express";
import "dotenv/config";
import connectDB from "./config/db.js";
import router from "./routes/routes.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.use("/api/v1", router);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});

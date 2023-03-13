//import express
import express from "express";
import cors from "cors";

const app = express();

//Settings
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(express.json(), cors());

//Router
import noteRouter from "./src/routes/NoteRoute.js";
import { log } from "console";
//Route
app.use("/Note", noteRouter);

app.use("/test", (req, res) => {
  res.send("Test route");
});

app.use("/", (req, res) => {
  res.send("That's my server.");
});

app.listen(app.get("port"), () => {
  console.log("Start server on port " + app.get("port"));
});

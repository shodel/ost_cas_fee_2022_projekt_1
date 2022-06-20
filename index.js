import express from "express";
import bodyParser from "body-parser";
import { todoRoutes } from "./routes/todo-routes.js";

const app = express();

app.use(express.static("source/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.use("/todos", todoRoutes);

const hostname = "127.0.0.1";
const port = 3001;
app.listen(port, hostname, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://${hostname}:${port}`);
});

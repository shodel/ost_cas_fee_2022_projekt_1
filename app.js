import express from "express";
// import bodyParser from "body-parser";
import path, { dirname } from "path";

// import { fileURLToPath } from "url";
import { todoRoutes } from "./routes/todo-routes.js";

// const directoryName = dirname(fileURLToPath(import.meta.url));

export const app = express();

// app.use(express.static(path.resolve("public/html")));
// app.use(express.static(path.resolve("public")));

// app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("hello world!");
  // res.sendFile("/html/index.html", { root: `${directoryName}/public/` });
});

app.use("/todos", todoRoutes);
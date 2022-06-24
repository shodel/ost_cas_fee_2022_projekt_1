import express from 'express';
import { TodoController } from "../source/controller/todo-controller.js";

const router = express.Router();

router.get("/", TodoController.getAllTodos);
router.post("/", TodoController.createTodo);
router.put("/", TodoController.updateTodo);
router.get("/:id/", TodoController.getTodo);

export const todoRoutes = router;
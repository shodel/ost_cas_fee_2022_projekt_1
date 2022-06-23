import express from 'express';
import {todoController} from '../source/controller/todo-controller.js';

const router = express.Router();

router.get("/", todoController.getAllTodos);
router.post("/", todoController.createTodo);
router.put("/", todoController.updateTodo);
router.get("/:id/", todoController.getTodo);
// router.delete("/:id/", ordersController.deleteOrder);

export const todoRoutes = router;
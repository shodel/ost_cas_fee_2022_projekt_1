import { todoStore } from "../services/todo-store.js";

export class TodoController {
  createTodo = async (req, res) => {
    const newTodo = req.body;
    res.json(
      await todoStore.addTodo(
        newTodo.title,
        newTodo.importance,
        newTodo.dueDate,
        newTodo.finished,
        newTodo.description
      )
    );
  };

  updateTodo = async (req, res) => {
    const todoToUpdate = req.body;
    res.json(
      await todoStore.updateTodo(
        todoToUpdate.id,
        todoToUpdate.title,
        todoToUpdate.importance,
        todoToUpdate.dueDate,
        todoToUpdate.finished,
        todoToUpdate.description
      )
    );
  };

  getAllTodos = async (req, res) => {
    res.json(await todoStore.getAllTodos());
  };

  // getTodo = async (req, res) => {
  //   res.json(await orderStore.get(req.params.id, SecurityUtil.currentUser(req)));
  // };
}

export const todoController = new TodoController();
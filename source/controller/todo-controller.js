import { todoStore } from "../services/todo-store.js";

export class TodoController {
  createTodo = async (req, res) => {
    const newTodo = req.body;
    let addedTodo = await todoStore.addTodo(
      newTodo.title,
      newTodo.importance,
      newTodo.dueDate,
      newTodo.finished,
      newTodo.description
    );
    res.location("/todos/" + addedTodo._id);
    res.status(201);
    res.json(addedTodo);
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

  getTodo = async (req, res) => {
    res.json(await todoStore.getTodo(req.params.id));
  };
}

export const todoController = new TodoController();

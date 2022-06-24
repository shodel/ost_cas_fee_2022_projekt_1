import { todoStore } from "../services/todo-store.js";

export class TodoController {
  static async createTodo(req, res) {
    const newTodo = req.body;
    const addedTodo = await todoStore.addTodo(
      newTodo.title,
      newTodo.importance,
      newTodo.dueDate,
      newTodo.finished,
      newTodo.description,
      newTodo.creationDate
    );
    // eslint-disable-next-line no-underscore-dangle
    res.location(`/todos/${addedTodo._id}`);
    res.status(201);
    res.json(addedTodo);
  }

  static async updateTodo(req, res) {
    const todoToUpdate = req.body;
    res.json(
      await todoStore.updateTodo(
        todoToUpdate.id,
        todoToUpdate.title,
        todoToUpdate.importance,
        todoToUpdate.dueDate,
        todoToUpdate.finished,
        todoToUpdate.description,
        todoToUpdate.creationDate
      )
    );
  }

  static async getAllTodos(req, res) {
    res.json(await todoStore.getAllTodos());
  }

  static async getTodo(req, res) {
    res.json(await todoStore.getTodo(req.params.id));
  }
}

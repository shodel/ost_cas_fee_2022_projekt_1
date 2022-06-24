import { HttpService } from "./http-service.js";

export class TodoService {
  static async createTodo(
    title,
    importance,
    dueDate,
    finished,
    description,
    creationDate
  ) {
    return HttpService.ajax("POST", "/todos/", {
      title,
      importance,
      dueDate,
      finished,
      description,
      creationDate,
    });
  }

  static async updateTodo(
    id,
    title,
    importance,
    dueDate,
    finished,
    description,
    creationDate
  ) {
    return HttpService.ajax("PUT", "/todos/", {
      id,
      title,
      importance,
      dueDate,
      finished,
      description,
      creationDate
    });
  }

  static async getAllTodos() {
    return HttpService.ajax("GET", "/todos/");
  }

  static async getTodo(id) {
    return HttpService.ajax("GET", `/todos/${id}`);
  }
}

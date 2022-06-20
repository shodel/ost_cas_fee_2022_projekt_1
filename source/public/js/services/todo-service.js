import { httpService } from "./http-service.js";

class TodoService {
  async createTodo(title, importance, dueDate, finished, description) {
    return httpService.ajax("POST", "/todos/", {
      title,
      importance,
      dueDate,
      finished,
      description
    });
  }

  async updateTodo(id, title, importance, dueDate, finished, description) {
    return httpService.ajax("PUT", "/todos/", {
      id,
      title,
      importance,
      dueDate,
      finished,
      description
    });
  }

  async getAllTodos() {
    return httpService.ajax("GET", "/todos/");
  }

  // async getOrder(id) {
  //   return httpService.ajax("GET", `/todos/${id}`, undefined);
  // }
  //
  // async deleteOrder(id) {
  //   return httpService.ajax("DELETE", `/todos/${id}`, undefined);
  // }
}

export const todoService = new TodoService();

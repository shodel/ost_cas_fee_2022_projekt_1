import Datastore from "nedb-promises";

export class TodoStore {
  constructor(database) {
    const options = { filename: "./data/todos.db", autoload: true };
    this.database = database || new Datastore(options);
  }

  async addTodo(title, importance, dueDate, finished, description) {
    console.log(`todo inserted, title = ${title}`);
    return this.database.insert({
      title,
      importance,
      dueDate,
      finished,
      description
    });
  }

  async updateTodo(id, title, importance, dueDate, finished, description) {
    console.log(`todo updated, id = ${id}`);
    return this.database.update(
      { _id: id },
      {
        title,
        importance,
        dueDate,
        finished,
        description
      }
    );
  }

  // async get(id, currentUser) {
  //   return this.db.findOne({ _id: id, orderedBy: currentUser });
  // }

  async getAllTodos() {
    return (
      this.database
        .find({})
        // .sort({ orderDate: -1 })
        .exec()
    );
  }
}

export const todoStore = new TodoStore();

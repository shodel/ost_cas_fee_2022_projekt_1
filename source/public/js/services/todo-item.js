export class TodoItem {
  constructor(id, title, importance, dueDate, finished, description, creationDate) {
    this.id = id;
    this.title = title;
    this.importance = importance;
    this.dueDate = dueDate;
    this.finished = finished;
    this.description = description;
    this.creationDate = creationDate;
  }
}

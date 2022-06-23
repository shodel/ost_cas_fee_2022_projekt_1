export const SORT_ORDER_ASC = "ascending";
export const SORT_ORDER_DESC = "descending";

export const SORT_ATTR_TITLE = "title";
export const SORT_ATTR_DUE_DATE = "due-date";
export const SORT_ATTR_CREATION_DATE = "creation-date";
export const SORT_ATTR_IMPORTANCE = "importance";

export function sortByTitle(todoItems, order) {
  todoItems.sort((todoItem1, todoItem2) => {
    const title1 = todoItem1.title.toLowerCase();
    const title2 = todoItem2.title.toLowerCase();
    if (title1 < title2) {
      return -1;
    }
    if (title1 > title2) {
      return 1;
    }
    return 0;
  });
  if (order === SORT_ORDER_DESC) {
    return todoItems.reverse();
  }
  return todoItems;
}

export function sortByDueDate(todoItems, order) {
  todoItems.sort((todoItem1, todoItem2) => {
    const dueDate1 = todoItem1.dueDate;
    const dueDate2 = todoItem2.dueDate;
    if (dueDate1 < dueDate2) {
      return -1;
    }
    if (dueDate1 > dueDate2) {
      return 1;
    }
    return 0;
  });
  if (order === SORT_ORDER_DESC) {
    return todoItems.reverse();
  }
  return todoItems;
}

export function sortByCreationDate(todoItems, order) {
  todoItems.sort((todoItem1, todoItem2) => {
    const creationDate1 = todoItem1.creationDate;
    const creationDate2 = todoItem2.creationDate;
    if (creationDate1 < creationDate2) {
      return -1;
    }
    if (creationDate1 > creationDate2) {
      return 1;
    }
    return 0;
  });
  if (order === SORT_ORDER_DESC) {
    return todoItems.reverse();
  }
  return todoItems;
}

export function sortByImportance(todoItems, order) {
  todoItems.sort((todoItem1, todoItem2) => {
    const importance1 = todoItem1.importance;
    const importance2 = todoItem2.importance;
    if (importance1 < importance2) {
      return -1;
    }
    if (importance1 > importance2) {
      return 1;
    }
    return 0;
  });
  if (order === SORT_ORDER_DESC) {
    return todoItems.reverse();
  }
  return todoItems;
}

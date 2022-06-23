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

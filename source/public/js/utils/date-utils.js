/* global moment */

function getToday() {
  return moment(new Date());
}

export function getTodayFormatted() {
  return getToday().format("YYYY-MM-DD");
}

export function getDifferenceInDaysFromNow(dateToCompare) {
  if (!dateToCompare) {
    return "someday";
  }
  const date = moment(dateToCompare).startOf("day");
  const today = getToday().startOf("day");
  const dateToday = moment(date).isSame(today, "day");
  if (dateToday) {
    return "today";
  }
  const dateInFuture = moment(date).isAfter(today, "day");
  if (dateInFuture) {
    const differenceInDays = moment(date).diff(today, "days", false);
    if (differenceInDays === 1) {
      return "in a day";
    }
    return `in ${differenceInDays} days`;
  }
  const differenceInDays = moment(today).diff(date, "days", false);
  if (differenceInDays === 1) {
    return "a day ago";
  }
  return `${differenceInDays} days ago`;
}


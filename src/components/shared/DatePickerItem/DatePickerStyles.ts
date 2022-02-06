export const datePickerDay = (
  date: Date,
  startDate: Date | null,
  dayStyle: string,
  defaultDaysStyle: string
) => {
  if (date.toDateString() === startDate?.toDateString()) {
    return dayStyle;
  }
  if (date.getTime() > new Date().getTime()) {
    return defaultDaysStyle;
  }
  return null;
};

export const datePickerTime = (
  date: Date,
  startDate: Date | null,
  timeStyle: string,
  defaultTimeStyle: string
) => {
  if (date.toTimeString() === startDate?.toTimeString()) {
    return timeStyle;
  }
  return defaultTimeStyle;
};

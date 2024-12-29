const getDayOfYear = (date: Date): number => {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay) + 1;
}

const getDaysLeftInthisYear = (date: string) => {
  const start_day = new Date(date);
  const year = start_day.getFullYear();
  const lastDay = new Date(year, 11, 31);
  const daysLeft = Math.floor(
    (lastDay.getTime() - start_day.getTime()) / (1000 * 60 * 60 * 24)
  );
  console.log(daysLeft);
  return daysLeft;
};


export { getDayOfYear, getDaysLeftInthisYear };
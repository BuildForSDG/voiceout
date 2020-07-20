export const dateFromData = (oneReport) => {
  const date = new Date(oneReport.created_at).getDate();
  const day = new Date(oneReport.created_at).getDay();
  const month = new Date(oneReport.created_at).getMonth();
  const year = new Date(oneReport.created_at).getFullYear();
  const hour = new Date(oneReport.created_at).getHours();
  const minute = new Date(oneReport.created_at).getMinutes();
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const hours = (hour < 10) ? `0${hour}`: hour;
  const minutes = (minute < 10) ? `0${minute}`: minute;
  return {
    date,
    day,
    month,
    year,
    days,
    months,
    hours,
    minutes        
  }
}
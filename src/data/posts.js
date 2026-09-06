const monthYear = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric', timeZone: 'UTC' });
const full = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

export const formatMonthYear = (date) => monthYear.format(date).toUpperCase();
export const formatDate = (date) => full.format(date).toUpperCase();

export const byNewest = (a, b) => b.data.date - a.data.date;

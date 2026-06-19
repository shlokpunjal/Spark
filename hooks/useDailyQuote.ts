import { quotes } from '../data/quotes';
import { Quote } from '../types/Quote';

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

export function useDailyQuote(): Quote {
  const dayOfYear = getDayOfYear(new Date())
  const index = dayOfYear % quotes.length
  return quotes[index];
}
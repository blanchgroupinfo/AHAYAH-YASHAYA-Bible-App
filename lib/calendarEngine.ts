import { CreatorDate, MONTH_DAYS, WEEKDAYS_HEBREW } from '../types';

/**
 * CREATOR CALENDAR ENGINE
 * Anchor: March 17, 2013 = Creator Year 1, Day 1
 * Year length: 364 days (52 weeks)
 */
const CREATOR_ANCHOR = new Date(Date.UTC(2013, 2, 17)); // March 17, 2013 UTC
const DAY_MS = 86400000;

// Holy Days Definitions (Fixed 364-Day Calendar)
export const FEASTS = [
  { month: 1, day: 1, name: "New Year / New Month", type: 'feast', isHigh: true },
  { month: 1, day: 14, name: "Passover (Pesach)", type: 'feast', isHigh: true },
  { month: 1, day: 15, name: "First Fruits Wave Sheaf", type: 'feast', isHigh: true },
  { month: 1, start: 15, end: 21, name: "Unleavened Bread", type: 'feast', isHigh: true },
  { month: 3, start: 3, end: 4, name: "Feast of Weeks (Shavuot)", type: 'feast', isHigh: true },
  { month: 4, day: 9, name: "Fast of the 4th Month", type: 'fast' },
  { month: 5, day: 9, name: "Fast of the 5th Month", type: 'fast' },
  { month: 7, day: 1, name: "Memorial of Trumpets", type: 'feast', isHigh: true },
  { 
    month: 7, 
    day: 10, 
    name: "Day of Atonement", 
    type: 'fast', 
    isHigh: true, 
    description: "Afflict your souls from the evening of the 9th day until the evening of the 10th day." 
  },
  { month: 7, start: 15, end: 21, name: "Feast of Tabernacles", type: 'feast', isHigh: true },
  { month: 7, day: 22, name: "The Eighth Day", type: 'feast', isHigh: true },
  { month: 9, start: 25, end: 31, name: "Feast of Dedication", type: 'feast' },
  { month: 10, day: 1, name: "Feast of Dedication", type: 'feast' },
  { month: 10, day: 9, name: "Fast of the 10th Month", type: 'fast' },
  { month: 12, start: 14, end: 15, name: "Feast of Purim", type: 'feast' }
];

export function getFeastInfo(month: number, day: number): { name: string, isHigh: boolean, description?: string } | undefined {
  // Special Handling for Day of Atonement Eve (Starts evening of the 9th day)
  if (month === 7 && day === 9) {
    return { 
      name: "Day of Atonement (Starts Evening)", 
      isHigh: true, 
      description: "Fast starts at even on the ninth day of the month; from even unto even shall ye celebrate your sabbath." 
    };
  }

  const exactFeast = FEASTS.find(f => f.day === day && f.month === month);
  if (exactFeast) return { name: exactFeast.name, isHigh: !!exactFeast.isHigh, description: exactFeast.description };

  const rangeFeast = FEASTS.find(f => f.start && f.end && f.month === month && day >= f.start && day <= f.end);
  if (rangeFeast) return { name: rangeFeast.name, isHigh: !!rangeFeast.isHigh, description: rangeFeast.description };

  return undefined;
}

export function getCreatorDate(gregorianDate: Date = new Date()): CreatorDate {
  // Normalize to UTC midnight to avoid timezone drift
  const utcDate = new Date(Date.UTC(
    gregorianDate.getFullYear(),
    gregorianDate.getMonth(),
    gregorianDate.getDate()
  ));

  const diffTime = utcDate.getTime() - CREATOR_ANCHOR.getTime();
  const daysSinceAnchor = Math.floor(diffTime / DAY_MS);

  // Calculate Creator Year (1-based)
  const creatorYear = Math.floor(daysSinceAnchor / 364) + 1;

  // Calculate Day of Year (1-364)
  const dayOfYear = (daysSinceAnchor % 364 + 364) % 364 + 1;

  let month = 1;
  let dayCounter = dayOfYear;

  // Determine Month and Day of Month
  for (let i = 0; i < MONTH_DAYS.length; i++) {
    if (dayCounter <= MONTH_DAYS[i]) {
      month = i + 1;
      break;
    }
    dayCounter -= MONTH_DAYS[i];
  }

  // Determine Weekday
  const weekday = WEEKDAYS_HEBREW[(dayOfYear - 1) % 7];
  
  const feast = getFeastInfo(month, dayCounter);
  const isHolyDay = weekday === "SHABBAT" || !!feast;

  return {
    creatorYear,
    creatorMonth: month,
    creatorDay: dayCounter,
    dayOfYear,
    weekday,
    gregorianDate: gregorianDate,
    feastName: feast?.name,
    isHolyDay
  };
}

export function formatGregorianDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatIslamicDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US-u-ca-islamic-uma', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

// Convert Creator Date to Gregorian Date
export function getGregorianFromCreator(year: number, month: number, day: number): Date {
  const daysToYearStart = (year - 1) * 364;
  let daysToMonthStart = 0;
  for (let i = 0; i < month - 1; i++) daysToMonthStart += MONTH_DAYS[i];
  const totalDays = daysToYearStart + daysToMonthStart + (day - 1);
  const targetTime = CREATOR_ANCHOR.getTime() + (totalDays * DAY_MS);
  const utcDate = new Date(targetTime);
  return new Date(utcDate.getUTCFullYear(), utcDate.getUTCMonth(), utcDate.getUTCDate());
}
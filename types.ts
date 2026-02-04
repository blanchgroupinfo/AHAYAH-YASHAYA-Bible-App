export interface CreatorDate {
  creatorYear: number;
  creatorMonth: number;
  creatorDay: number;
  dayOfYear: number;
  weekday: string;
  gregorianDate: Date;
  feastName?: string;
  isHolyDay?: boolean;
}

export interface CalendarEvent {
  id: string;
  creatorYear?: number; // Optional: if missing, it's recurring yearly
  creatorMonth: number;
  creatorDay: number;
  title: string;
  type: 'note' | 'event';
  description?: string;
  isRecurring?: boolean;
}

export interface DailyContent {
  verse: string;
  verseReference: string;
  gospel: string;
  gospelReference: string;
  law: string;
  lawReference: string;
  holyDayStatus: string;
  explanation: string;
}

export enum CalendarMonthName {
  FIRST = "1st Month",
  SECOND = "2nd Month",
  THIRD = "3rd Month",
  FOURTH = "4th Month",
  FIFTH = "5th Month",
  SIXTH = "6th Month",
  SEVENTH = "7th Month",
  EIGHTH = "8th Month",
  NINTH = "9th Month",
  TENTH = "10th Month",
  ELEVENTH = "11th Month",
  TWELFTH = "12th Month",
}

export const WEEKDAYS_HEBREW = [
  "YAWAM ACHAD",
  "YAWAM SHANAY",
  "YAWAM SHALAYASHAYA",
  "YAWAM RABAYِAIY",
  "HAMُُُُُِِِAYASHAYA",
  "SHASHAY",
  "SHABBAT"
];

export const MONTH_DAYS = [30, 30, 31, 30, 30, 31, 30, 30, 31, 30, 30, 31];

export type ViewState = 'home' | 'calendar' | 'year' | 'feasts' | 'about' | 'knowledge' | 'offerings' | 'donations' | 'contact' | 'baptism' | 'prayer' | 'settings';
export type ReferenceCalendar = 'gregorian' | 'islamic';
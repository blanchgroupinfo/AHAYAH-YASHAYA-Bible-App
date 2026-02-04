import React from 'react';
import { MONTH_DAYS, CreatorDate } from '../types';
import { getFeastInfo } from '../lib/calendarEngine';

interface YearViewProps {
  currentDate: CreatorDate;
  onYearChange: (offset: number) => void;
}

const SEASONS = [
  { name: "First Season (Spring)", months: [1, 2, 3] },
  { name: "Second Season (Summer)", months: [4, 5, 6] },
  { name: "Third Season (Fall)", months: [7, 8, 9] },
  { name: "Fourth Season (Winter)", months: [10, 11, 12] },
];

const WEEK_HEADERS = ["1", "2", "3", "4", "5", "6", "S"];

const YearView: React.FC<YearViewProps> = ({ currentDate, onYearChange }) => {
  const year = currentDate.creatorYear;

  const renderMonth = (monthIndex: number) => {
    const daysInMonth = MONTH_DAYS[monthIndex - 1];
    
    // Calculate start day of week
    let daysElapsed = 0;
    for (let i = 0; i < monthIndex - 1; i++) {
      daysElapsed += MONTH_DAYS[i];
    }
    const startWeekdayIndex = daysElapsed % 7;

    const days = [];
    // Empties
    for (let i = 0; i < startWeekdayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    // Days
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = year === currentDate.creatorYear && monthIndex === currentDate.creatorMonth && day === currentDate.creatorDay;
      const feast = getFeastInfo(monthIndex, day);
      
      // Determine weekday (0-6)
      const dayOfWeekIndex = (daysElapsed + day - 1) % 7;
      const isSabbath = dayOfWeekIndex === 6;

      let bgClass = "bg-white text-gray-600 hover:bg-gray-50";

      if (isToday) {
        bgClass = "bg-royal-600 text-white ring-2 ring-royal-300 z-10 scale-110 shadow-sm";
      } else if (feast) {
        bgClass = "bg-gold-400 text-white";
      } else if (isSabbath) {
        bgClass = "bg-royal-100 text-royal-700 font-bold";
      }

      days.push(
        <div 
          key={day} 
          className={`aspect-square flex items-center justify-center text-[10px] md:text-xs rounded-sm transition-all cursor-default relative group ${bgClass}`}
        >
          {day}
          {feast && !isToday && (
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-gray-800 text-white text-[9px] px-2 py-1 rounded whitespace-nowrap z-20 shadow-lg">
              {/* Fix: Render feast.name instead of the entire feast object to resolve ReactNode type error */}
              {feast.name}
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="animate-fadeIn max-w-6xl mx-auto pb-12">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-royal-200 pb-4">
        <div className="flex-grow">
          <div className="flex items-center gap-4 mb-2">
            <button 
              onClick={() => onYearChange(-1)}
              className="p-2 rounded-full hover:bg-royal-50 text-royal-600 transition-colors"
              aria-label="Previous Year"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            
            <h2 className="text-3xl font-serif font-bold text-royal-900">Year {year}</h2>
            
            <button 
              onClick={() => onYearChange(1)}
              className="p-2 rounded-full hover:bg-royal-50 text-royal-600 transition-colors"
              aria-label="Next Year"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
          <p className="text-royal-500 font-bold">52 Weeks • 364 Days</p>
        </div>
        <div className="flex gap-4 text-xs mt-4 md:mt-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-royal-100 rounded-sm"></div> Sabbath
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gold-400 rounded-sm"></div> Feast
          </div>
          <div className="flex items-center gap-2">
             <div className="w-3 h-3 bg-royal-600 rounded-sm"></div> Today
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {SEASONS.map((season, sIdx) => (
          <div key={sIdx} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="bg-royal-50 px-4 py-2 border-b border-royal-100 flex justify-between items-center">
              <h3 className="font-serif font-bold text-royal-800 uppercase tracking-widest text-sm">{season.name}</h3>
              <span className="text-xs text-royal-400 font-bold">91 Days</span>
            </div>
            
            <div className="p-4 grid grid-cols-3 gap-4">
              {season.months.map((month) => (
                <div key={month} className="flex flex-col">
                  <div className="text-center text-xs font-bold text-gray-400 uppercase mb-2">Month {month}</div>
                  
                  {/* Grid Header */}
                  <div className="grid grid-cols-7 mb-1">
                    {WEEK_HEADERS.map(h => (
                      <div key={h} className={`text-center text-[9px] font-bold ${h === 'S' ? 'text-royal-600' : 'text-gray-300'}`}>
                        {h}
                      </div>
                    ))}
                  </div>

                  {/* Grid Days */}
                  <div className="grid grid-cols-7 gap-0.5">
                    {renderMonth(month)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YearView;
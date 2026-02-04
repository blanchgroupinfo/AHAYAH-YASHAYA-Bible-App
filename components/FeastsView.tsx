import React from 'react';
import { FEASTS, getGregorianFromCreator } from '../lib/calendarEngine';
import { CreatorDate } from '../types';

interface FeastsViewProps {
  currentDate: CreatorDate;
  onYearChange: (offset: number) => void;
}

const FeastsView: React.FC<FeastsViewProps> = ({ currentDate, onYearChange }) => {
  const year = currentDate.creatorYear;

  // Process feasts to include Gregorian dates for current year
  const yearFeasts = FEASTS.map(feast => {
    const startGreg = getGregorianFromCreator(year, feast.month, feast.start || feast.day || 1);
    const endGreg = feast.end ? getGregorianFromCreator(year, feast.month, feast.end) : null;
    
    // Check if passed
    // Simple logic: convert creator date to comparable number (month * 100 + day)
    const currentVal = currentDate.creatorMonth * 100 + currentDate.creatorDay;
    const feastVal = feast.month * 100 + (feast.end || feast.day || feast.start || 0);
    const isPast = currentVal > feastVal;
    const isToday = currentDate.feastName === feast.name;

    return {
      ...feast,
      gregorianStart: startGreg,
      gregorianEnd: endGreg,
      isPast,
      isToday
    };
  });

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal-900 mb-2">Holy Feasts & Appointed Times</h2>
        <div className="flex items-center justify-center gap-4 text-royal-600 text-lg">
          <button 
              onClick={() => onYearChange(-1)}
              className="p-1 rounded-full hover:bg-royal-50 transition-colors"
              title="Previous Year"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <span>Creator Year {year}</span>
          <button 
              onClick={() => onYearChange(1)}
              className="p-1 rounded-full hover:bg-royal-50 transition-colors"
              title="Next Year"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {yearFeasts.map((feast, idx) => (
          <div 
            key={idx} 
            className={`relative bg-white rounded-xl shadow-md overflow-hidden border-l-8 transition-transform hover:-translate-y-1 duration-300
              ${feast.isToday ? 'border-gold-500 ring-2 ring-gold-400' : 'border-royal-800'}
              ${feast.isPast ? 'opacity-70 grayscale-[0.5]' : 'opacity-100'}
            `}
          >
            <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-center gap-6">
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                   <h3 className="text-2xl font-serif font-bold text-royal-900">{feast.name}</h3>
                   {feast.isToday && <span className="bg-gold-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Today</span>}
                   {feast.isPast && <span className="bg-gray-200 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Completed</span>}
                </div>
                
                <p className="text-gray-500 font-medium">
                  {feast.month === 1 ? 'First Month' : 
                   feast.month === 3 ? 'Third Month' : 
                   feast.month === 7 ? 'Seventh Month' : `Month ${feast.month}`}
                  {' • '}
                  {feast.day ? `Day ${feast.day}` : `Days ${feast.start}-${feast.end}`}
                </p>
              </div>

              <div className="bg-royal-50 px-6 py-4 rounded-lg text-center min-w-[200px] border border-royal-100">
                <p className="text-xs text-royal-400 font-bold uppercase tracking-widest mb-1">Gregorian Date</p>
                <p className="text-lg font-bold text-royal-800 font-serif">
                  {feast.gregorianStart.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                  {feast.gregorianEnd && ` - ${feast.gregorianEnd.getDate()}`}
                </p>
                <p className="text-xs text-gray-400 mt-1">{feast.gregorianStart.getFullYear()}</p>
              </div>

            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 p-6 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-center">
        <h4 className="font-bold font-serif mb-2">Note on Timing</h4>
        <p className="text-sm opacity-80 max-w-2xl mx-auto">
          Feast days begin at evening (sunset) of the previous Gregorian day displayed above. 
          The Creators Calendar is a fixed 364-day cycle that does not drift, maintaining the order of creation as established in Jubilees and Enoch.
        </p>
      </div>
    </div>
  );
};

export default FeastsView;

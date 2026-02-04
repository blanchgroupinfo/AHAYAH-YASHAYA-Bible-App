import React, { useState } from 'react';
import { CreatorDate } from '../types';

interface DateCardProps {
  date: CreatorDate;
}

const DateCard: React.FC<DateCardProps> = ({ date }) => {
  const [showCopied, setShowCopied] = useState(false);

  const handleShare = async () => {
    const text = `Today is Month ${date.creatorMonth} Day ${date.creatorDay}, Year ${date.creatorYear} (${date.weekday}) on the Creators Calendar.`;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Creators Calendar',
          text: text,
          url: url,
        });
      } catch (error) {
        // Ignore abort errors from cancelling share dialog
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing', error);
        }
      }
    } else {
      // Fallback for browsers without Web Share API
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy', err);
      }
    }
  };

  return (
    <div className="relative overflow-hidden bg-white shadow-xl rounded-2xl border-t-8 border-royal-700 p-8 text-center transform transition-all hover:scale-[1.01] duration-500 group/card">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-royal-900 via-gold-500 to-royal-900"></div>
      
      {/* Share Button */}
      <button 
        onClick={handleShare}
        className="absolute top-4 right-4 p-2 text-gray-300 hover:text-gold-500 hover:bg-gold-50 rounded-full transition-all duration-300 focus:outline-none z-10"
        title="Share Date"
        aria-label="Share current date"
      >
        {showCopied ? (
           <span className="text-xs font-bold text-green-600 animate-pulse">Copied!</span>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        )}
      </button>

      <h2 className="text-royal-600 font-serif text-lg tracking-widest uppercase mb-2">Current Date</h2>
      
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="text-6xl md:text-8xl font-serif text-royal-900 font-bold drop-shadow-sm">
          {date.creatorDay}
        </div>
        
        <div className="w-16 h-1 bg-gold-500 rounded-full"></div>
        
        <div className="space-y-1">
          <div className="text-2xl md:text-3xl font-serif text-royal-800">
             Month {date.creatorMonth}
          </div>
          <div className="text-xl md:text-2xl font-serif text-gray-500">
            Year {date.creatorYear}
          </div>
        </div>
        
        <div className="pt-4 mt-4 border-t border-gray-100 w-full">
           <span className="inline-block px-4 py-2 bg-royal-50 text-royal-800 rounded-lg text-lg font-bold tracking-wide shadow-sm">
             {date.weekday}
           </span>
        </div>
      </div>
    </div>
  );
};

export default DateCard;
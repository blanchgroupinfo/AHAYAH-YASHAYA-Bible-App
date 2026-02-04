import React from 'react';

const AboutView: React.FC = () => {
  return (
    <div className="animate-fadeIn max-w-4xl mx-auto text-slate-800 pb-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-royal-900 mb-4">About the Creators Calendar</h2>
        <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        
        {/* Hero / Intro */}
        <div className="p-8 md:p-12 border-b border-gray-100">
          <p className="text-lg leading-relaxed text-gray-600 mb-6">
            The <strong>Creators Calendar System (CCS)</strong> is a restoration of the ancient, biblical method of timekeeping as described in the Book of Jubilees, the Book of Enoch, and the Torah. Unlike the Gregorian calendar, which drifts and requires leap years to align with the solar year, the Creators Calendar operates on a mathematically perfect, fixed <strong>364-day cycle</strong>.
          </p>
          <p className="text-lg leading-relaxed text-gray-600">
            This system ensures that Holy Days and Sabbaths fall on fixed days of the week every year, eliminating the confusion of a drifting calendar and restoring the original order of Creation.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-royal-50/30">
          <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-gray-100">
            <h3 className="flex items-center gap-3 text-xl font-serif font-bold text-royal-800 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-royal-100 text-royal-600 text-sm font-bold">01</span>
              The Anchor Date
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The calendar is anchored to <strong>March 17, 2013</strong> (Gregorian). This date marks Day 1 of Month 1 of Creator Year 1 in this restored cycle. It serves as the immutable reference point from which all subsequent days are calculated, ensuring absolute precision without drift.
            </p>
          </div>
          <div className="p-8 md:p-10">
            <h3 className="flex items-center gap-3 text-xl font-serif font-bold text-royal-800 mb-4">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-royal-100 text-royal-600 text-sm font-bold">02</span>
              364-Day Structure
            </h3>
            <p className="text-gray-600 leading-relaxed">
              The year consists of exactly <strong>52 weeks</strong>. It is divided into four seasons, each containing 91 days. Each season is composed of three months following a fixed pattern of <strong>30, 30, and 31 days</strong>. Because 364 is divisible by 7, every year starts on the same day of the week (Yam Achaad / Day 1), ensuring Sabbaths never rotate.
            </p>
          </div>
        </div>

        {/* Biblical Sources */}
        <div className="p-8 md:p-12 border-t border-gray-100">
          <h3 className="text-2xl font-serif font-bold text-royal-900 mb-8 text-center md:text-left">Scriptural Foundation</h3>
          
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-5">
               <div className="flex-shrink-0 mt-1 hidden md:block">
                 <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-gold-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/></svg>
                 </div>
               </div>
               <div>
                 <h4 className="font-bold text-royal-800 text-lg mb-2">Book of Jubilees</h4>
                 <blockquote className="text-gray-600 italic border-l-4 border-gold-400 pl-4 py-1 mb-2 bg-gray-50 rounded-r">
                   "And command thou the children of Israel that they observe the years according to this reckoning - three hundred and sixty-four days, and (these) will constitute a complete year, and they will not disturb its time from its days and from its feasts..."
                 </blockquote>
                 <p className="text-sm text-gray-500 font-bold">— Jubilees 6:32</p>
               </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
               <div className="flex-shrink-0 mt-1 hidden md:block">
                 <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-gold-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                 </div>
               </div>
               <div>
                 <h4 className="font-bold text-royal-800 text-lg mb-2">Book of Enoch</h4>
                 <p className="text-gray-600 leading-relaxed">
                   The Book of Enoch details the courses of the heavenly luminaries. It explicitly states the year contains 364 days (Enoch 72:32), ensuring that "the years shall be changed with exactness" so that the righteous do not forget the appointed times.
                 </p>
               </div>
            </div>
            
             <div className="flex flex-col md:flex-row gap-5">
               <div className="flex-shrink-0 mt-1 hidden md:block">
                 <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center text-gold-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
                 </div>
               </div>
               <div>
                 <h4 className="font-bold text-royal-800 text-lg mb-2">Leviticus 23</h4>
                 <p className="text-gray-600 leading-relaxed">
                   This chapter outlines the Feasts of AHAYAH. The Creators Calendar places these feasts on their originally intended fixed days, ensuring that the Sabbath and the Feasts operate in perfect harmony without contradiction.
                 </p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutView;

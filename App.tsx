import React, { useState, useEffect, useRef } from 'react';
import { getCreatorDate, formatGregorianDate, formatIslamicDate, getGregorianFromCreator } from './lib/calendarEngine';
import { fetchDailyContent } from './services/geminiService';
import { CreatorDate, DailyContent, ViewState, ReferenceCalendar } from './types';
import DateCard from './components/DateCard';
import ScriptureCard from './components/ScriptureCard';
import InfoBadge from './components/InfoBadge';
import NavMenu from './components/NavMenu';
import ResourceLinks from './components/ResourceLinks';
import CalendarView from './components/CalendarView';
import FeastsView from './components/FeastsView';
import AboutView from './components/AboutView';
import YearView from './components/YearView';
import SunClock from './components/SunClock';
import KnowledgeBaseView from './components/KnowledgeBaseView';
import BurntOfferingView from './components/BurntOfferingView';
import DonationsView from './components/DonationsView';
import ContactView from './components/ContactView';
import BaptismView from './components/BaptismView';
import PrayerRequestView from './components/PrayerRequestView';
import SettingsView from './components/SettingsView';

const App: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<CreatorDate>(getCreatorDate());
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [content, setContent] = useState<DailyContent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [refCalendar, setRefCalendar] = useState<ReferenceCalendar>('gregorian');
  const [shareSuccess, setShareSuccess] = useState(false);
  const [isBackup, setIsBackup] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  const datePickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLiveMode) return;
    const timer = setInterval(() => {
      const now = new Date();
      if (now.getDate() !== currentDate.gregorianDate.getDate()) {
        setCurrentDate(getCreatorDate(now));
      }
    }, 60000);
    return () => clearInterval(timer);
  }, [isLiveMode, currentDate.gregorianDate]);

  useEffect(() => {
    const loadContent = async () => {
      setLoading(true);
      setIsBackup(false);
      const data = await fetchDailyContent(currentDate);
      if (data) {
        setContent(data);
      } else {
        setIsBackup(true);
        setContent({
          verse: "Study to show thyself approved unto AHAYAH.",
          verseReference: "2 Timothy 2:15",
          gospel: "For the Son of Man is Lord even of the Sabbath day.",
          gospelReference: "Matthew 12:8",
          law: "Remember the sabbath day, to keep it holy.",
          lawReference: "Exodus 20:8",
          holyDayStatus: currentDate.weekday === "SHABBAT" ? "Sabbath" : "None",
          explanation: "The Truth Hub is currently resting. Today follows the eternal order of creation. Shabbat Shalawam!"
        });
      }
      setLoading(false);
    };
    loadContent();
  }, [currentDate.creatorYear, currentDate.creatorMonth, currentDate.creatorDay]);

  const handleYearChange = (offset: number) => {
    setIsLiveMode(false);
    const newYear = currentDate.creatorYear + offset;
    const newGregorian = getGregorianFromCreator(newYear, currentDate.creatorMonth, currentDate.creatorDay);
    setCurrentDate(getCreatorDate(newGregorian));
  };

  const handleReturnToToday = () => {
    setIsLiveMode(true);
    setCurrentDate(getCreatorDate());
  };

  const handleDateSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = new Date(e.target.value);
    if (!isNaN(selected.getTime())) {
      setIsLiveMode(false);
      setCurrentDate(getCreatorDate(selected));
      setShowDatePicker(false);
    }
  };

  const handleGlobalShare = async () => {
    const text = `📖 Creators Calendar: Month ${currentDate.creatorMonth} Day ${currentDate.creatorDay}, Year ${currentDate.creatorYear}.\n\nWalk in the Light of AHAYAH. ${window.location.origin}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Creators Calendar', text, url: window.location.href });
      } catch (e) {}
    } else {
      await navigator.clipboard.writeText(text);
      setShareSuccess(true);
      setTimeout(() => setShareSuccess(false), 2000);
    }
  };

  const isSabbath = currentDate.weekday === "SHABBAT";
  const feastName = currentDate.feastName;
  const isFeastOrFast = !!feastName || (content?.holyDayStatus && content.holyDayStatus !== "None" && content.holyDayStatus !== "Sabbath");
  const displayStatusName = feastName || content?.holyDayStatus;

  const renderContent = () => {
    switch(currentView) {
      case 'calendar': return <CalendarView currentDate={currentDate} onYearChange={handleYearChange} />;
      case 'year': return <YearView currentDate={currentDate} onYearChange={handleYearChange} />;
      case 'feasts': return <FeastsView currentDate={currentDate} onYearChange={handleYearChange} />;
      case 'knowledge': return <KnowledgeBaseView />;
      case 'offerings': return <BurntOfferingView />;
      case 'donations': return <DonationsView />;
      case 'contact': return <ContactView />;
      case 'baptism': return <BaptismView />;
      case 'prayer': return <PrayerRequestView />;
      case 'settings': return <SettingsView />;
      case 'about': return <AboutView />;
      case 'home':
      default:
        return (
          <div className="animate-fadeIn">
            <SunClock date={currentDate.gregorianDate} />
            <div className="mb-8">
                <InfoBadge active={isSabbath} label="Shabbat Shalawam - Day of Rest" type="sabbath" />
                <InfoBadge active={isFeastOrFast} label={`Special Observation: ${displayStatusName}`} type="feast" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4 space-y-8">
                <DateCard date={currentDate} />
                <div className="bg-white p-8 rounded-[2rem] shadow-2xl border-l-8 border-royal-900 relative overflow-hidden group">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-black text-royal-900 uppercase text-xs tracking-[0.4em]">Divine Perspective</h3>
                    {isBackup && !loading && <span className="text-[9px] bg-royal-100 text-royal-700 px-2 py-0.5 rounded-full font-black uppercase">Local Backup</span>}
                  </div>
                  {loading ? (
                     <div className="h-24 animate-pulse bg-gray-50 rounded-2xl"></div>
                  ) : (
                    <p className="text-royal-800 leading-relaxed text-base italic font-serif opacity-90 drop-shadow-sm">
                      {content?.explanation}
                    </p>
                  )}
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8">
                {loading ? (
                   <div className="grid grid-cols-1 gap-8">
                      {[1, 2, 3].map(i => <div key={i} className="h-40 bg-gray-100 animate-pulse rounded-[2rem]"></div>)}
                   </div>
                ) : content ? (
                  <div className="flex flex-col gap-8">
                    <div className="w-full">
                      <ScriptureCard 
                        title="Heavenly Lamp (Verse)"
                        text={content.verse}
                        reference={content.verseReference}
                        colorTheme="blue"
                        isSmall={true}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <ScriptureCard title="The Royal Law" text={content.law} reference={content.lawReference} colorTheme="gold" />
                      <ScriptureCard title="The Gospel Message" text={content.gospel} reference={content.gospelReference} colorTheme="red" />
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-24 text-gray-400 italic bg-white rounded-[3rem] border border-dashed border-gray-200">Decoding the luminaries...</div>
                )}
              </div>
            </div>
            <ResourceLinks />
          </div>
        );
    }
  };

  const formattedRefDate = refCalendar === 'gregorian' ? formatGregorianDate(currentDate.gregorianDate) : formatIslamicDate(currentDate.gregorianDate);

  return (
    <div className="min-h-screen font-sans bg-[#fcfdfe] text-slate-900 flex flex-col lg:flex-row selection:bg-gold-500 selection:text-white">
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-royal-900 text-white lg:min-h-screen flex flex-col z-50 lg:sticky lg:top-0 shadow-2xl border-r-4 border-gold-500">
        <div className="p-6 lg:p-8 flex items-center justify-between lg:block">
          <div className="flex items-center gap-4 cursor-pointer group mb-0 lg:mb-12" onClick={() => { setCurrentView('home'); handleReturnToToday(); }}>
            <div className="p-2 bg-white rounded-xl flex-shrink-0 group-hover:rotate-180 transition-transform duration-1000">
              <svg className="w-8 h-8 text-royal-900" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" /></svg>
            </div>
            <div>
              <h1 className="text-xl font-serif font-black tracking-widest text-white leading-none">CCS</h1>
              <p className="text-[10px] text-royal-300 uppercase tracking-[0.2em] mt-1 font-black">Creator's Calendar</p>
            </div>
          </div>
          <div className="lg:hidden">
            <NavMenu currentView={currentView} onNavigate={setCurrentView} />
          </div>
        </div>
        
        <div className="hidden lg:flex flex-col flex-grow px-4 pb-8">
          <NavMenu currentView={currentView} onNavigate={setCurrentView} />
          
          <div className="mt-auto pt-8 border-t border-white/10 space-y-4">
            <button onClick={() => setShowDatePicker(!showDatePicker)} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-royal-100 text-xs font-bold uppercase tracking-widest transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Jump To Date
            </button>
            <button onClick={handleGlobalShare} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gold-500 hover:bg-gold-600 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-lg">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
              {shareSuccess ? 'Link Secured' : 'Share Truth'}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow flex flex-col relative">
        <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-6 px-6 lg:px-12 sticky top-0 z-40 flex justify-between items-center shadow-sm">
           <div>
             <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-1">Celestial Reference</div>
             <div className="text-royal-900 font-serif font-bold text-sm lg:text-base tracking-wide uppercase">{formattedRefDate}</div>
           </div>
           <div className="flex items-center gap-4">
             <button onClick={() => setRefCalendar(prev => prev === 'gregorian' ? 'islamic' : 'gregorian')} className="text-[10px] bg-royal-100 text-royal-700 px-4 py-2 rounded-full font-black uppercase tracking-widest hover:bg-royal-200 transition-colors">
                {refCalendar === 'gregorian' ? 'Hijri View' : 'Greg View'}
             </button>
             {!isLiveMode && <button onClick={handleReturnToToday} className="text-[10px] bg-gold-500 text-white px-5 py-2 rounded-full font-black uppercase tracking-widest shadow-lg animate-pulse">GO LIVE</button>}
           </div>
        </header>

        {showDatePicker && (
          <div className="bg-royal-800 p-6 border-b-4 border-gold-500 animate-slideDown shadow-xl">
            <div className="container mx-auto max-w-lg flex items-center gap-4">
              <label className="text-xs font-black uppercase tracking-widest text-royal-200 whitespace-nowrap">Select Date:</label>
              <input type="date" onChange={handleDateSelect} className="flex-grow bg-royal-900 border border-royal-700 rounded-xl px-4 py-2 text-white outline-none focus:ring-2 ring-gold-500" />
              <button onClick={() => setShowDatePicker(false)} className="p-2 text-white hover:bg-white/10 rounded-full"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
          </div>
        )}

        <div className="p-6 lg:p-12 max-w-7xl mx-auto w-full flex-grow">
          {renderContent()}
        </div>

        <footer className="mt-auto py-12 px-6 lg:px-12 border-t border-gray-100 bg-white text-center">
          <p className="text-gray-400 font-bold mb-4 tracking-[0.3em] uppercase text-[10px]">Children of Light • Immutable Cycle • Pure Truth</p>
          <div className="flex justify-center gap-8 mb-4">
            <button onClick={() => setCurrentView('prayer')} className="text-[10px] font-black text-royal-500 uppercase tracking-widest hover:text-gold-600">Prayer Petitions</button>
            <button onClick={() => setCurrentView('donations')} className="text-[10px] font-black text-royal-500 uppercase tracking-widest hover:text-gold-600">Sacred Offerings</button>
            <button onClick={() => setCurrentView('contact')} className="text-[10px] font-black text-royal-500 uppercase tracking-widest hover:text-gold-600">Contact Ministry</button>
          </div>
          <p className="text-[10px] text-gray-300 italic">Restoring the ancient paths. Shalawam.</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
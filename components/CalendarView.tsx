import React, { useState, useEffect } from 'react';
import { MONTH_DAYS, WEEKDAYS_HEBREW, CreatorDate, CalendarEvent } from '../types';
import { getGregorianFromCreator, getFeastInfo } from '../lib/calendarEngine';

interface CalendarViewProps {
  currentDate: CreatorDate;
  onYearChange: (offset: number) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ currentDate, onYearChange }) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(currentDate.creatorMonth);
  const [userEvents, setUserEvents] = useState<CalendarEvent[]>([]);
  const [editingDay, setEditingDay] = useState<{month: number, day: number} | null>(null);
  const [noteInput, setNoteInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [isRecurring, setIsRecurring] = useState(true);
  const [filter, setFilter] = useState<'all' | 'recurring' | 'once'>('all');
  const [showEventList, setShowEventList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const year = currentDate.creatorYear;

  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  useEffect(() => {
    const saved = localStorage.getItem('ccs_user_events');
    if (saved) {
      try {
        setUserEvents(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse user events", e);
      }
    }
  }, []);

  const saveEvents = (events: CalendarEvent[]) => {
    setUserEvents(events);
    localStorage.setItem('ccs_user_events', JSON.stringify(events));
  };

  const handleAddNote = () => {
    if (!editingDay || !noteInput.trim()) return;
    const newEvent: CalendarEvent = {
      id: crypto.randomUUID(),
      creatorMonth: editingDay.month,
      creatorDay: editingDay.day,
      creatorYear: isRecurring ? undefined : year,
      title: noteInput.trim(),
      description: descInput.trim(),
      type: 'note',
      isRecurring: isRecurring
    };
    saveEvents([...userEvents, newEvent]);
    setNoteInput('');
    setDescInput('');
    setEditingDay(null);
  };

  const handleDeleteNote = (id: string) => {
    saveEvents(userEvents.filter(e => e.id !== id));
  };

  const handleExport = () => {
    const data = JSON.stringify(userEvents);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CCS_Truth_Ledger_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target?.result as string);
        if (Array.isArray(imported)) {
          saveEvents(imported);
          alert('Truth Ledger Synced!');
        }
      } catch (err) { alert('Invalid sync file.'); }
    };
    reader.readAsText(file);
  };

  const getEventsForDay = (m: number, d: number) => {
    return userEvents.filter(e => {
      const matchMonthDay = e.creatorMonth === m && e.creatorDay === d;
      const matchYear = e.creatorYear === undefined || e.creatorYear === year;
      const matchFilter = filter === 'all' || (filter === 'recurring' && e.isRecurring) || (filter === 'once' && !e.isRecurring);
      return matchMonthDay && matchYear && matchFilter;
    });
  };

  const filteredLedger = userEvents.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (e.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
    return matchesSearch;
  });

  const renderMonth = (monthIndex: number) => {
    const daysInMonth = MONTH_DAYS[monthIndex - 1];
    let daysElapsed = 0;
    for (let i = 0; i < monthIndex - 1; i++) daysElapsed += MONTH_DAYS[i];
    const startWeekdayIndex = daysElapsed % 7; 

    const days = [];
    for (let i = 0; i < startWeekdayIndex; i++) days.push(<div key={`empty-${i}`} className="h-24 bg-gray-50/20 border border-gray-100"></div>);

    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = year === currentDate.creatorYear && monthIndex === currentDate.creatorMonth && day === currentDate.creatorDay;
      const gregDate = getGregorianFromCreator(year, monthIndex, day);
      const feast = getFeastInfo(monthIndex, day);
      const dayEvents = getEventsForDay(monthIndex, day);
      const isSabbath = (daysElapsed + day - 1) % 7 === 6;

      days.push(
        <div 
          key={day} 
          onClick={() => { setEditingDay({ month: monthIndex, day }); setNoteInput(''); setDescInput(''); }}
          className={`h-24 p-2 border border-gray-100 flex flex-col justify-between relative group hover:bg-royal-50/50 cursor-pointer transition-all
            ${isToday ? 'bg-royal-50 ring-2 ring-inset ring-royal-400 z-10' : 'bg-white'}
            ${isSabbath ? 'bg-royal-50/20' : ''}
            ${feast?.isHigh ? 'bg-gold-50/30' : ''}
          `}
        >
          <div className="flex justify-between items-start">
            <span className={`text-lg font-bold font-serif leading-none ${isToday ? 'text-royal-600' : 'text-gray-700'}`}>{day}</span>
            <span className="text-[9px] text-gray-400 font-sans uppercase font-black">{gregDate.getDate()} {gregDate.toLocaleString('default', { month: 'short' })}</span>
          </div>
          <div className="flex flex-col gap-0.5 overflow-hidden">
            {isSabbath && <div className="text-[8px] bg-royal-100 text-royal-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider w-max">SHABBAT</div>}
            {feast && <div className={`text-[8px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider w-full truncate shadow-sm ${feast.isHigh ? 'bg-gold-500 text-white' : 'bg-gold-100 text-gold-700'}`}>{feast.name}</div>}
            {dayEvents.length > 0 && <div className="flex gap-0.5 mt-auto pb-1">{dayEvents.map(e => <div key={e.id} className="w-1.5 h-1.5 rounded-full bg-royal-500 border border-white"></div>)}</div>}
          </div>
        </div>
      );
    }
    return days;
  };

  return (
    <div className="animate-fadeIn relative">
      <div className="flex flex-col gap-6 mb-10">
        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <div className="p-3 bg-royal-100 text-royal-700 rounded-2xl"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg></div>
          <div>
            <h3 className="text-royal-900 font-serif font-black uppercase tracking-[0.2em] text-sm">Months of the Cycle</h3>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-0.5">Select a month to observe the luminaries</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100">
          <div className="flex items-center bg-royal-50 rounded-2xl p-2 border border-royal-100 shadow-inner">
            <button onClick={() => onYearChange(-1)} className="p-3 hover:bg-white rounded-xl transition-all text-royal-700 shadow-sm active:scale-90"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg></button>
            <span className="px-8 font-serif font-black text-royal-900 text-3xl tracking-tight">Year {year}</span>
            <button onClick={() => onYearChange(1)} className="p-3 hover:bg-white rounded-xl transition-all text-royal-700 shadow-sm active:scale-90"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg></button>
          </div>
          
          <div className="flex items-center gap-6 w-full lg:w-auto overflow-x-auto pb-4 lg:pb-0 scrollbar-hide">
            <div className="flex gap-2">
              {months.map(m => (
                <button 
                  key={m} 
                  onClick={() => setSelectedMonth(m)} 
                  className={`px-6 h-12 rounded-2xl text-[11px] font-black transition-all flex items-center justify-center border whitespace-nowrap uppercase tracking-widest ${selectedMonth === m ? 'bg-royal-900 text-white shadow-xl scale-110 border-royal-700' : 'bg-white text-gray-400 border-gray-100 hover:border-royal-200 hover:text-royal-600'}`}
                >
                  Month {m}
                </button>
              ))}
            </div>
            <div className="flex gap-3 border-l-2 border-gray-100 pl-6">
              <button onClick={() => setShowEventList(true)} className="p-4 bg-royal-100 text-royal-700 rounded-2xl hover:bg-royal-200 transition-all shadow-md group">
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              <button onClick={handleExport} className="p-4 bg-royal-900 text-white rounded-2xl hover:bg-royal-800 transition-all shadow-md group">
                <svg className="w-6 h-6 group-hover:translate-y-[-2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" /></svg>
              </button>
              <label className="p-4 bg-gold-500 text-white rounded-2xl hover:bg-gold-600 transition-all shadow-md cursor-pointer group">
                <svg className="w-6 h-6 group-hover:translate-y-[2px] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                <input type="file" className="hidden" accept=".json" onChange={handleImport} />
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100 p-1">
        <div className="grid grid-cols-7 bg-royal-900 text-white rounded-t-[2.8rem]">
          {WEEKDAYS_HEBREW.map((day) => (
            <div key={day} className="py-7 text-center text-[9px] font-black tracking-[0.2em] uppercase truncate px-2 opacity-90 border-r border-white/5 last:border-none">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 bg-slate-200 gap-px border-t border-gray-100">
           {renderMonth(selectedMonth)}
        </div>
      </div>

      {/* Edit Day Modal */}
      {editingDay && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-royal-950/40 backdrop-blur-md" onClick={() => setEditingDay(null)}></div>
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden relative z-10 border border-royal-100 animate-slideUp">
            <div className="bg-royal-900 p-6 text-white flex justify-between items-center border-b-4 border-gold-500">
               <div>
                 <h3 className="font-serif font-bold text-lg uppercase tracking-widest">Mark the Ledger</h3>
                 <p className="text-[10px] text-royal-300 font-bold uppercase tracking-widest mt-0.5">Month {editingDay.month} • Day {editingDay.day}</p>
               </div>
               <button onClick={() => setEditingDay(null)} className="text-royal-300 hover:text-white"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={2} /></svg></button>
            </div>
            <div className="p-8">
              <div className="space-y-4">
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Title / Observation</label>
                  <input type="text" value={noteInput} onChange={(e) => setNoteInput(e.target.value)} placeholder="e.g. New Moon Sighted..." className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-bold text-royal-900 focus:border-gold-500 outline-none" autoFocus />
                </div>
                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1.5 block">Divine Notes</label>
                  <textarea value={descInput} onChange={(e) => setDescInput(e.target.value)} placeholder="Enter details..." rows={2} className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium text-royal-800 focus:border-gold-500 outline-none resize-none" />
                </div>
                <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <div onClick={() => setIsRecurring(!isRecurring)} className={`w-12 h-6 rounded-full transition-all cursor-pointer relative ${isRecurring ? 'bg-gold-500' : 'bg-gray-300'}`}>
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${isRecurring ? 'left-6.5' : 'left-0.5'}`} style={{ left: isRecurring ? '26px' : '2px' }}></div>
                  </div>
                  <label className="text-[10px] font-black text-royal-700 uppercase tracking-widest cursor-pointer select-none">Recurring Yearly</label>
                </div>
                <button onClick={handleAddNote} disabled={!noteInput.trim()} className="w-full py-4 bg-royal-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-xl disabled:opacity-50 transform active:scale-95 transition-all">SAVE RECORD</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Truth Ledger Modal */}
      {showEventList && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 animate-fadeIn">
          <div className="absolute inset-0 bg-royal-950/70 backdrop-blur-lg" onClick={() => setShowEventList(false)}></div>
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-3xl overflow-hidden relative z-10 border border-royal-100 animate-slideUp">
             <div className="bg-royal-900 p-10 text-white flex justify-between items-center border-b-8 border-gold-500">
                <div>
                  <h3 className="font-serif font-black text-3xl uppercase tracking-[0.2em]">Truth Ledger</h3>
                  <p className="text-xs text-royal-300 font-bold uppercase tracking-widest mt-2">Historical Records of the Children of Light</p>
                </div>
                <button onClick={() => setShowEventList(false)} className="bg-white/10 p-4 rounded-2xl transition-all hover:bg-white/20"><svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={3} /></svg></button>
             </div>
             
             <div className="p-8 bg-white border-b border-gray-100 flex gap-4">
                <div className="relative flex-grow">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeWidth={2}/></svg>
                  </span>
                  <input type="text" placeholder="Search the Ledger..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-gold-500 outline-none transition-all font-black text-royal-900 placeholder-gray-300" />
                  {searchQuery && <button onClick={() => setSearchQuery('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-royal-900 font-black text-xs uppercase tracking-widest">Clear</button>}
                </div>
             </div>

             <div className="p-10 max-h-[55vh] overflow-y-auto custom-scrollbar bg-slate-50">
                {filteredLedger.length === 0 ? (
                  <div className="text-center py-24 text-gray-400 font-serif italic text-xl opacity-60">
                    {searchQuery ? `No results for "${searchQuery}"` : "The Truth Ledger is currently empty."}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredLedger.map(e => (
                      <div key={e.id} className="bg-white p-8 rounded-[2rem] border border-royal-50 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-3 h-full bg-gold-500 opacity-20"></div>
                        <div className="mb-6">
                          <p className="text-royal-900 font-black text-lg leading-tight mb-2 uppercase group-hover:text-gold-600 transition-colors">{e.title}</p>
                          {e.description && <p className="text-[11px] text-gray-500 mb-4 italic leading-relaxed">{e.description}</p>}
                          <div className="flex flex-wrap gap-2 pt-2">
                            <span className="text-[10px] bg-royal-900 text-white px-3 py-1.5 rounded-lg font-black uppercase tracking-widest">Month {e.creatorMonth} Day {e.creatorDay}</span>
                            <span className={`text-[10px] px-3 py-1.5 rounded-lg font-black uppercase tracking-widest ${e.isRecurring ? 'bg-gold-500 text-white' : 'bg-gray-100 text-gray-500'}`}>{e.isRecurring ? 'Recurring Yearly' : `Creator Year ${e.creatorYear}`}</span>
                          </div>
                        </div>
                        <button onClick={() => handleDeleteNote(e.id)} className="self-end text-rose-500 hover:text-rose-700 p-3 bg-rose-50 rounded-xl transition-all hover:scale-110 active:scale-90"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" strokeWidth={2} /></svg></button>
                      </div>
                    ))}
                  </div>
                )}
             </div>
             <div className="p-10 bg-white text-center border-t border-gray-100 flex justify-center gap-12 text-[10px] font-black text-royal-400 uppercase tracking-[0.4em]">
               <div>Results: {filteredLedger.length}</div>
               <div>Total Records: {userEvents.length}</div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
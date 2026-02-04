import React, { useState, useEffect } from 'react';

const SettingsView: React.FC = () => {
  const [reminders, setReminders] = useState({
    dailyReading: true,
    sabbathEve: true,
    feastNotifications: true,
    dawnAlerts: false
  });

  const [uiPrefs, setUiPrefs] = useState({
    highContrast: false,
    ancientHebrewNames: true
  });

  useEffect(() => {
    const saved = localStorage.getItem('ccs_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setReminders(parsed.reminders);
        setUiPrefs(parsed.uiPrefs);
      } catch (e) {}
    }
  }, []);

  const save = (newReminders = reminders, newUi = uiPrefs) => {
    localStorage.setItem('ccs_settings', JSON.stringify({ reminders: newReminders, uiPrefs: newUi }));
  };

  const toggleReminder = (key: keyof typeof reminders) => {
    const next = { ...reminders, [key]: !reminders[key] };
    setReminders(next);
    save(next, uiPrefs);
  };

  const toggleUi = (key: keyof typeof uiPrefs) => {
    const next = { ...uiPrefs, [key]: !uiPrefs[key] };
    setUiPrefs(next);
    save(reminders, next);
  };

  return (
    <div className="animate-fadeIn max-w-2xl mx-auto pb-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-royal-900 mb-2 uppercase tracking-tighter">Preferences</h2>
        <div className="w-16 h-1 bg-gold-500 mx-auto rounded-full"></div>
      </div>

      <div className="space-y-6">
        <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-royal-900 p-6 text-white border-b-4 border-gold-500">
            <h3 className="font-serif font-bold text-lg uppercase tracking-widest">Divine Reminders</h3>
            <p className="text-xs text-royal-300 font-bold uppercase tracking-widest mt-1">Notification Controls</p>
          </div>
          <div className="p-6 space-y-4">
            {Object.entries(reminders).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex flex-col">
                  <span className="text-xs font-black text-royal-900 uppercase tracking-widest">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase mt-0.5">
                    {key === 'dawnAlerts' ? "Notify at the break of light" : "System generated update"}
                  </span>
                </div>
                <button 
                  onClick={() => toggleReminder(key as any)}
                  className={`w-12 h-6 rounded-full transition-all relative ${value ? 'bg-gold-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow-md ${value ? 'left-6.5' : 'left-0.5'}`} style={{ left: value ? '26px' : '2px' }}></div>
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-royal-50 p-6 border-b border-royal-100">
            <h3 className="font-serif font-bold text-royal-800 text-lg uppercase tracking-widest">UI Preferences</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
              <span className="text-xs font-black text-royal-900 uppercase tracking-widest">Ancient Transliterations</span>
              <button 
                onClick={() => toggleUi('ancientHebrewNames')}
                className={`w-12 h-6 rounded-full transition-all relative ${uiPrefs.ancientHebrewNames ? 'bg-royal-600' : 'bg-gray-300'}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all shadow-md ${uiPrefs.ancientHebrewNames ? 'left-6.5' : 'left-0.5'}`} style={{ left: uiPrefs.ancientHebrewNames ? '26px' : '2px' }}></div>
              </button>
            </div>
          </div>
        </section>

        <div className="text-center p-8">
           <p className="text-xs text-gray-400 font-serif italic mb-2">Reminders are stored locally in your current vessel (browser).</p>
           <div className="text-[10px] font-black text-royal-400 uppercase tracking-[0.3em]">Version 2.0 • Children of Light</div>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
import React from 'react';

const BaptismView: React.FC = () => {
  return (
    <div className="animate-fadeIn max-w-4xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-royal-900 mb-4 tracking-tighter uppercase">Schedule Baptism</h2>
        <p className="text-royal-600 font-bold uppercase tracking-widest text-sm italic">Return to the Fountain of Life</p>
        <div className="w-32 h-1 bg-gold-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-12 relative">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
           <svg className="w-64 h-64 text-royal-900" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l.395.072 4 1.333A1 1 0 0116 6.666V13a1 1 0 01-1 1h-4v3.89l.262.315a1 1 0 01-1.524 1.294l-2-2.4a1 1 0 010-1.294l2-2.4a1 1 0 011.524 1.294l-.262.315V14H7a1 1 0 01-1-1V6.666a1 1 0 01.605-.912l4-1.333.395-.072V3a1 1 0 011-1z" clipRule="evenodd"/></svg>
        </div>

        <div className="p-10 md:p-16 text-center">
          <div className="bg-royal-900 text-white rounded-2xl p-8 mb-10 border-b-4 border-gold-500">
             <h3 className="text-2xl font-serif font-bold mb-4 uppercase">Divine Requirement</h3>
             <p className="text-lg leading-relaxed font-serif italic">
               "Everyone is Required to be Baptized under Most High AHAYAH BA SHAM YASHAYA WA QADASH RAWACH."
             </p>
          </div>

          <div className="space-y-8 max-w-2xl mx-auto text-gray-700 text-lg leading-relaxed font-serif">
            <p>
              Baptism is the outward sign of an inward transformation—the washing away of the old man and the rising of the new creation in the Light of AHAYAH. It is a mandatory step for all who seek to walk in the Truth of the Creators Calendar.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
               <div className="p-4 bg-royal-50 rounded-xl border border-royal-100">
                  <div className="text-2xl mb-2">🚿</div>
                  <div className="text-xs font-bold uppercase text-royal-800">Repentance</div>
               </div>
               <div className="p-4 bg-royal-50 rounded-xl border border-royal-100">
                  <div className="text-2xl mb-2">🕊️</div>
                  <div className="text-xs font-bold uppercase text-royal-800">Spirit</div>
               </div>
               <div className="p-4 bg-royal-50 rounded-xl border border-royal-100">
                  <div className="text-2xl mb-2">🕯️</div>
                  <div className="text-xs font-bold uppercase text-royal-800">Light</div>
               </div>
            </div>
          </div>

          <div className="mt-12 bg-gold-50 p-8 rounded-2xl border border-gold-200">
             <h4 className="text-xl font-serif font-bold text-gold-900 mb-6">Schedule Your Immersion</h4>
             <form className="space-y-4 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Full Name" className="w-full px-4 py-3 rounded-xl border border-gold-200 focus:ring-2 ring-gold-500 outline-none" />
                <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-gold-200 focus:ring-2 ring-gold-500 outline-none" />
                <select className="w-full px-4 py-3 rounded-xl border border-gold-200 focus:ring-2 ring-gold-500 outline-none bg-white">
                   <option>Select Preferred Month</option>
                   <option>1st Month (Spring Equinox)</option>
                   <option>4th Month (Summer)</option>
                   <option>7th Month (Fall Equinox)</option>
                   <option>10th Month (Winter)</option>
                </select>
                <button className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:scale-[1.02]">
                   REQUEST BAPTISM DATE
                </button>
             </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BaptismView;
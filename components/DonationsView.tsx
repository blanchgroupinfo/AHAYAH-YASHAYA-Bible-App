import React from 'react';

const DonationsView: React.FC = () => {
  return (
    <div className="animate-fadeIn max-w-4xl mx-auto pb-12 text-center">
      <div className="mb-12">
        <h2 className="text-4xl font-serif font-bold text-royal-900 mb-4 tracking-tighter">SUPPORT THE WORK</h2>
        <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-royal-900 via-gold-500 to-royal-900"></div>
        
        <div className="text-5xl mb-8">💎</div>
        
        <h3 className="text-2xl font-serif font-bold text-royal-800 mb-6">Honour AHAYAH with thy substance</h3>
        
        <p className="text-gray-600 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          "Honour AHAYAH with thy substance, and with the firstfruits of all thine increase: So shall thy barns be filled with plenty, and thy presses shall burst out with new wine." <br/>
          <span className="text-sm font-bold text-gold-600 uppercase tracking-widest">— Proverbs 3:9-10</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-royal-50 p-8 rounded-2xl border border-royal-100 flex flex-col items-center">
            <span className="text-royal-400 text-xs font-bold uppercase tracking-widest mb-2">Digital Offering</span>
            <span className="text-xl font-serif font-bold text-royal-900 mb-4">Cryptocurrency</span>
            <button className="bg-royal-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-royal-800 transition-all w-full">View Addresses</button>
          </div>
          <div className="bg-gold-50 p-8 rounded-2xl border border-gold-100 flex flex-col items-center">
             <span className="text-gold-600 text-xs font-bold uppercase tracking-widest mb-2">Global Support</span>
             <span className="text-xl font-serif font-bold text-royal-900 mb-4">Direct Giving</span>
             <button className="bg-gold-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gold-600 transition-all w-full">Give via Stripe</button>
          </div>
        </div>

        <p className="text-sm text-gray-400 italic">
          All contributions go towards maintaining the Truth Hub, the Celestial Watcher services, and spreading the light of the Creators Calendar globally.
        </p>
      </div>
    </div>
  );
};

export default DonationsView;
import React from 'react';

const ContactView: React.FC = () => {
  return (
    <div className="animate-fadeIn max-w-4xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-royal-900 mb-4 tracking-tighter uppercase">Contact the Ministry</h2>
        <div className="w-32 h-1 bg-gold-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-6">
          <div className="bg-royal-900 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="font-serif font-bold text-xl mb-6">Reach Out</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="text-gold-500 text-xl">✉️</div>
                <div>
                  <div className="text-xs font-bold uppercase text-royal-300">Email</div>
                  <div className="text-sm">truth@creatorscalendar.org</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-gold-500 text-xl">📍</div>
                <div>
                  <div className="text-xs font-bold uppercase text-royal-300">Watchtower</div>
                  <div className="text-sm">Zion's Path, Digital Ministry</div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="text-gold-500 text-xl">📱</div>
                <div>
                  <div className="text-xs font-bold uppercase text-royal-300">Message</div>
                  <div className="text-sm">Join the Truth Hub Discord</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100">
            <h4 className="font-serif font-bold text-royal-900 mb-2">Office Hours</h4>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-4">Dawn to Dusk Only</p>
            <p className="text-sm text-gray-600 italic leading-relaxed">
              We respond during the 12 hours of the day. In the night, we rest as AHAYAH commanded.
            </p>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="font-serif font-bold text-2xl text-royal-900 mb-8">Send a Message of Truth</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Your Name</label>
                  <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 ring-gold-500 outline-none transition-all" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Your Email</label>
                  <input type="email" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 ring-gold-500 outline-none transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Topic of Inquiry</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 ring-gold-500 outline-none transition-all appearance-none">
                  <option>General Inquiry</option>
                  <option>Calendar Correction</option>
                  <option>Ministry Collaboration</option>
                  <option>Testimony of Light</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Message</label>
                <textarea rows={5} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 ring-gold-500 outline-none transition-all resize-none"></textarea>
              </div>
              <button className="bg-royal-900 hover:bg-royal-800 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-all w-full md:w-auto">
                SEND MESSAGE
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactView;
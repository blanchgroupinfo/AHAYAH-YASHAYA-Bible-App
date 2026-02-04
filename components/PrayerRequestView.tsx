import React, { useState } from 'react';

const PrayerRequestView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    topic: 'Healing',
    request: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.request) {
      setSubmitted(true);
      // In a real app, this would send to a server. 
      // For now, we simulate success.
    }
  };

  if (submitted) {
    return (
      <div className="animate-fadeIn max-w-4xl mx-auto pb-12 text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-10 md:p-16 border border-gray-100">
          <div className="text-6xl mb-6">✨</div>
          <h2 className="text-3xl font-serif font-bold text-royal-900 mb-4">PETITION RECEIVED</h2>
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-2xl mx-auto font-serif italic">
            "For the eyes of AHAYAH are over the righteous, and his ears are open unto their prayers."
          </p>
          <div className="text-sm font-bold text-gold-600 uppercase tracking-widest mb-10">— 1 Peter 3:12</div>
          <button 
            onClick={() => setSubmitted(false)}
            className="bg-royal-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-royal-800 transition-all uppercase tracking-widest shadow-lg"
          >
            Send Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-royal-900 mb-4 tracking-tighter uppercase">Prayer Request</h2>
        <p className="text-royal-600 font-bold uppercase tracking-widest text-sm italic">Seek the face of AHAYAH in the name of Yashaya</p>
        <div className="w-32 h-1 bg-gold-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-4 space-y-6">
          <div className="bg-royal-900 text-white p-8 rounded-2xl shadow-xl border-b-4 border-gold-500">
            <h3 className="font-serif font-bold text-xl mb-4">Sacred Intercession</h3>
            <p className="text-sm text-royal-200 leading-relaxed font-serif italic mb-6">
              "Pray without ceasing. In every thing give thanks: for this is the will of AHAYAH in Yashaya Messiah concerning you."
            </p>
            <div className="text-[10px] font-black uppercase tracking-widest text-gold-400">— 1 Thessalonians 5:17-18</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
            <h4 className="font-serif font-bold text-royal-900 mb-3 uppercase text-xs tracking-widest">The Power of Unity</h4>
            <p className="text-xs text-gray-500 leading-relaxed italic">
              When we gather our spirits in truth, AHAYAH hears the collective voice of the Children of Light. Your request will be held in remembrance during the morning and evening offerings.
            </p>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100">
            <h3 className="font-serif font-bold text-2xl text-royal-900 mb-8 uppercase tracking-wide">Enter Your Petition</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-[0.2em]">Full Name / Identity</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="The name of the petitioner..."
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-gold-500 outline-none transition-all font-bold text-royal-900" 
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-[0.2em]">Purpose of Prayer</label>
                <select 
                  value={formData.topic}
                  onChange={(e) => setFormData({...formData, topic: e.target.value})}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-gold-500 outline-none transition-all font-bold text-royal-900 appearance-none bg-no-repeat bg-[right_1.25rem_center]"
                >
                  <option>Healing & Restoration</option>
                  <option>Divine Guidance</option>
                  <option>Strength & Endurance</option>
                  <option>Thanksgiving & Praise</option>
                  <option>Protection of the Saints</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-gray-400 mb-2 tracking-[0.2em]">The Request</label>
                <textarea 
                  required
                  rows={6}
                  value={formData.request}
                  onChange={(e) => setFormData({...formData, request: e.target.value})}
                  placeholder="Pour out your heart before AHAYAH..."
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-gray-100 rounded-2xl focus:border-gold-500 outline-none transition-all font-serif text-lg leading-relaxed italic resize-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full md:w-auto bg-gold-500 hover:bg-gold-600 text-white font-black py-4 px-12 rounded-2xl shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 uppercase tracking-[0.2em] text-xs"
              >
                SUBMIT TO THE HEAVENS
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-16 bg-royal-50 p-8 rounded-[2rem] border border-royal-100 text-center">
        <h4 className="font-serif font-bold text-royal-900 text-xl mb-4">"The effectual fervent prayer of a righteous man availeth much."</h4>
        <p className="text-xs font-black text-gold-600 uppercase tracking-widest">— James 5:16</p>
      </div>
    </div>
  );
};

export default PrayerRequestView;
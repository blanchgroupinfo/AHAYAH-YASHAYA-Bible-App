import React, { useState, useEffect } from 'react';
import SunCalc from 'suncalc';

const BurntOfferingView: React.FC = () => {
  const [coords, setCoords] = useState<{lat: number, lng: number} | null>(null);
  const [times, setTimes] = useState<{ morning: Date, evening: Date } | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setCoords({ lat: 31.7683, lng: 35.2137 }) // Jerusalem fallback
      );
    } else {
      setCoords({ lat: 31.7683, lng: 35.2137 });
    }
  }, []);

  useEffect(() => {
    if (coords) {
      const sunTimes = SunCalc.getTimes(new Date(), coords.lat, coords.lng);
      setTimes({
        morning: sunTimes.dawn, // Morning sacrifice at dawn
        evening: sunTimes.sunset // Evening sacrifice at sunset
      });
    }
  }, [coords]);

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="animate-fadeIn max-w-4xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-royal-900 mb-2">DAILY BURNT OFFERING</h2>
        <p className="text-royal-500 font-bold tracking-widest uppercase text-sm">Morning & Evening Remembrance</p>
        <div className="w-24 h-1 bg-gold-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Morning Offering */}
          <div className="p-10 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center text-center bg-gradient-to-b from-royal-50 to-white">
            <div className="text-6xl mb-6">🌅</div>
            <h3 className="text-2xl font-serif font-bold text-royal-900 mb-2">Morning Lamb</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">Offered at the breaking of light, as the day begins at Dawn.</p>
            <div className="bg-royal-900 text-white px-8 py-4 rounded-2xl shadow-xl">
               <div className="text-[10px] uppercase tracking-widest font-bold text-royal-300 mb-1">Estimated Dawn</div>
               <div className="text-3xl font-mono font-bold">{times ? formatTime(times.morning) : '--:--'}</div>
            </div>
          </div>

          {/* Evening Offering */}
          <div className="p-10 flex flex-col items-center text-center bg-gradient-to-b from-amber-50 to-white">
            <div className="text-6xl mb-6">🌇</div>
            <h3 className="text-2xl font-serif font-bold text-royal-900 mb-2">Evening Lamb</h3>
            <p className="text-gray-500 text-sm mb-6 max-w-xs">Offered at the setting of the sun, concluding the work of the day.</p>
            <div className="bg-amber-900 text-white px-8 py-4 rounded-2xl shadow-xl">
               <div className="text-[10px] uppercase tracking-widest font-bold text-amber-300 mb-1">Estimated Sunset</div>
               <div className="text-3xl font-mono font-bold">{times ? formatTime(times.evening) : '--:--'}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-royal-50 rounded-2xl p-8 border border-royal-100">
        <h4 className="font-serif font-bold text-royal-800 text-xl mb-4 flex items-center gap-3">
          <svg className="w-6 h-6 text-gold-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.450.385c-.39.63-.598 1.359-.598 2.062 0 1.264.496 2.148 1.253 2.878.712.687 1.699 1.145 2.628 1.156a1 1 0 01.908 1.498 8.502 8.502 0 01-11.83 3.903A1 1 0 015 13.5V7a1 1 0 01.447-.894l4-2a1 1 0 011.106.028l.447.223a1 1 0 01.447.894v.5a1 1 0 102 0V5a3 3 0 00-5.367-1.83l-4 2A3 3 0 002 7.764V13.5a3 3 0 004.5 2.598 10.504 10.504 0 0014.17-5.01 3 3 0 00-3.375-4.043 1.996 1.996 0 00-1.455-1.956 5.511 5.511 0 00-3.445-2.536z" clipRule="evenodd"/></svg>
          The Statue Forever
        </h4>
        <p className="text-royal-700 italic border-l-4 border-gold-500 pl-6 py-2 bg-white/50 rounded-r mb-4">
          "This is the offering made by fire which ye shall offer unto AHAYAH; two lambs of the first year without spot day by day, for a continual burnt offering. The one lamb shalt thou offer in the morning, and the other lamb shalt thou offer at even."
        </p>
        <span className="text-xs font-bold text-royal-400 uppercase tracking-widest">— Numbers 28:3-4</span>
      </div>
    </div>
  );
};

export default BurntOfferingView;
import React, { useEffect, useState } from 'react';
import SunCalc from 'suncalc';

interface SunClockProps {
  date: Date;
}

interface SunTimes {
  dawn: Date;
  sunrise: Date;
  sunset: Date;
  dusk: Date;
}

interface Location {
  name: string;
  lat: number;
  lng: number;
}

const PRESETS: Location[] = [
  { name: "Jerusalem", lat: 31.7683, lng: 35.2137 },
  { name: "New York", lat: 40.7128, lng: -74.0060 },
  { name: "London", lat: 51.5074, lng: -0.1278 },
  { name: "Los Angeles", lat: 34.0522, lng: -118.2437 },
  { name: "Tokyo", lat: 35.6762, lng: 139.6503 },
  { name: "Sydney", lat: -33.8688, lng: 151.2093 },
];

const SunClock: React.FC<SunClockProps> = ({ date }) => {
  const [coords, setCoords] = useState<Location | null>(null);
  const [times, setTimes] = useState<SunTimes | null>(null);
  const [isSelectorOpen, setIsSelectorOpen] = useState(false);
  const [customLat, setCustomLat] = useState('');
  const [customLng, setCustomLng] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!coords) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoords({
              name: "Local Position",
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => {
            setCoords(PRESETS[0]); // Fallback to Jerusalem
          }
        );
      } else {
        setCoords(PRESETS[0]);
      }
    }
  }, []);

  useEffect(() => {
    if (coords) {
      const sunTimes = SunCalc.getTimes(date, coords.lat, coords.lng);
      setTimes({
        dawn: sunTimes.dawn,
        sunrise: sunTimes.sunrise,
        sunset: sunTimes.sunset,
        dusk: sunTimes.dusk
      });
    }
  }, [date, coords]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(customLat);
    const lng = parseFloat(customLng);
    if (!isNaN(lat) && !isNaN(lng)) {
      setCoords({ name: `Custom (${lat.toFixed(2)}, ${lng.toFixed(2)})`, lat, lng });
      setIsSelectorOpen(false);
      setCustomLat('');
      setCustomLng('');
    }
  };

  if (!times || !coords) return null;

  const formatTime = (d: Date) => {
    return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const isToday = currentTime.toDateString() === date.toDateString();
  const checkTime = isToday ? currentTime : new Date(date.getTime() + 12 * 60 * 60 * 1000);

  let bgGradient = "from-blue-400 to-blue-200"; 
  let icon = "☀️";
  let statusText = "Daylight";
  let textColor = "text-white";
  let dayStartActive = false;

  if (times) {
    if (checkTime < times.dawn || checkTime > times.dusk) {
      bgGradient = "from-indigo-950 to-slate-900";
      icon = "🌙";
      statusText = "Night";
      textColor = "text-indigo-100";
    } else if (checkTime >= times.dawn && checkTime < times.sunrise) {
      bgGradient = "from-indigo-700 via-purple-500 to-orange-400";
      icon = "🌅";
      statusText = "Dawn Transition";
      dayStartActive = true;
    } else if (checkTime >= times.sunset && checkTime <= times.dusk) {
      bgGradient = "from-orange-400 via-purple-600 to-indigo-900";
      icon = "🌇";
      statusText = "Evening Transition";
    }
  }

  const isDayStart = checkTime >= times.dawn && checkTime < times.sunrise;

  return (
    <div className={`relative overflow-hidden rounded-xl shadow-2xl ${textColor} mb-8 transition-all duration-1000 bg-gradient-to-br ${bgGradient} border-b-4 border-white/20`}>
      <div className="p-6 relative z-10">
        
        {/* Day Start Special Indicator */}
        {dayStartActive && (
          <div className="absolute top-0 left-0 w-full flex justify-center">
            <div className="bg-gold-500 text-white text-[10px] font-bold px-4 py-1 rounded-b-full shadow-lg animate-bounce">
              NEW DAY STARTING: DAWN IS HERE
            </div>
          </div>
        )}

        <div className="flex justify-between items-start mb-6 pt-2">
          <div>
            <h3 className="font-serif font-bold text-xl flex items-center gap-2">
              <span className="text-3xl animate-pulse">{icon}</span> 
              <span>Celestial Watch</span>
            </h3>
            
            <button 
              onClick={() => setIsSelectorOpen(!isSelectorOpen)}
              className="text-xs opacity-90 flex items-center gap-1 hover:bg-white/20 px-2 py-1 rounded -ml-2 mt-2 transition-colors group"
            >
              <svg className="w-3 h-3 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="underline decoration-dotted font-bold">{coords.name}</span>
            </button>
          </div>
          
          <div className="text-right">
             <div className="text-3xl font-mono font-bold leading-none tracking-tight mb-2">
               {currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: true })}
             </div>
             <div className="flex items-center justify-end gap-2">
                <span className={`h-2 w-2 rounded-full ${statusText === 'Night' ? 'bg-indigo-400' : 'bg-gold-400'} animate-ping`}></span>
                <div className="text-xs font-bold uppercase tracking-widest opacity-80">
                   {statusText} Phase
                </div>
             </div>
          </div>
        </div>

        {isSelectorOpen && (
          <div className="mb-6 bg-white/10 backdrop-blur-md rounded-lg p-5 border border-white/20 animate-fadeIn">
            <h4 className="text-xs font-bold uppercase tracking-wider mb-3 opacity-90">Watchtower Presets</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-4">
              {PRESETS.map((p) => (
                <button
                  key={p.name}
                  onClick={() => { setCoords(p); setIsSelectorOpen(false); }}
                  className={`text-xs p-2 rounded border transition-colors ${coords.name === p.name ? 'bg-white text-royal-900 border-white font-bold' : 'border-white/30 hover:bg-white/20'}`}
                >
                  {p.name}
                </button>
              ))}
            </div>
            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <input type="number" step="any" placeholder="Lat" value={customLat} onChange={(e) => setCustomLat(e.target.value)} className="w-full bg-black/20 border border-white/30 rounded px-2 py-2 text-xs text-white" />
              <input type="number" step="any" placeholder="Lng" value={customLng} onChange={(e) => setCustomLng(e.target.value)} className="w-full bg-black/20 border border-white/30 rounded px-2 py-2 text-xs text-white" />
              <button type="submit" disabled={!customLat || !customLng} className="bg-white text-royal-900 px-4 py-2 rounded text-xs font-bold disabled:opacity-50">SET</button>
            </form>
          </div>
        )}

        <div className="grid grid-cols-4 gap-4 text-center">
          <div className={`p-3 rounded-lg transition-all ${isDayStart ? 'bg-white/20 ring-2 ring-gold-400' : 'bg-black/10'}`}>
            <div className="text-[10px] uppercase tracking-widest opacity-75 mb-1 font-bold">Dawn (Start)</div>
            <div className="font-serif font-bold text-sm md:text-lg">{formatTime(times.dawn)}</div>
          </div>
          <div className="p-3 bg-black/10 rounded-lg">
            <div className="text-[10px] uppercase tracking-widest opacity-75 mb-1 font-bold">Sunrise</div>
            <div className="font-serif font-bold text-sm md:text-lg">{formatTime(times.sunrise)}</div>
          </div>
          <div className="p-3 bg-black/10 rounded-lg">
            <div className="text-[10px] uppercase tracking-widest opacity-75 mb-1 font-bold">Sunset</div>
            <div className="font-serif font-bold text-sm md:text-lg">{formatTime(times.sunset)}</div>
          </div>
          <div className="p-3 bg-black/10 rounded-lg">
            <div className="text-[10px] uppercase tracking-widest opacity-75 mb-1 font-bold">Dusk (End)</div>
            <div className="font-serif font-bold text-sm md:text-lg">{formatTime(times.dusk)}</div>
          </div>
        </div>
      </div>
      
      {/* Visual Day Path Refined */}
      <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-80 h-40 bg-white/5 rounded-t-full pointer-events-none"></div>
      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-64 h-32 bg-white/10 rounded-t-full pointer-events-none border-t border-white/20"></div>
    </div>
  );
};

export default SunClock;
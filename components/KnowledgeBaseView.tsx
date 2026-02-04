import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const SCRIPTURES = [
  { ref: "2 Timothy 3:16", text: "All scripture is given by inspiration of AHAYAH, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness:" },
  { ref: "2 Timothy 3:17", text: "That the man of AHAYAH may be perfect, throughly furnished unto all good works." },
  { ref: "2 Timothy 2:15", text: "Study to shew thyself approved unto AHAYAH, a workman that needeth not to be ashamed, rightly dividing the word of truth." },
  { ref: "Psalms 119:142", text: "Thy righteousness is an everlasting righteousness, and thy law is the truth." },
  { ref: "Psalms 119:151", text: "Thou art near, O AHAYAH; and all thy commandments are truth." },
  { ref: "Proverbs 6:23", text: "For the commandment is a lamp; and the law is light; and reproofs of instruction are the way of life:" },
  { ref: "John 4:24", text: "AHAYAH is a Spirit: and they that worship him must worship him in spirit and in truth." },
  { ref: "Genesis 1:3", text: "And AHAYAH said, Let there be light: and there was light." },
  { ref: "John 12:46", text: "I am come a light into the world, that whosoever believeth on me should not abide in darkness." },
  { ref: "1 John 1:5", text: "This then is the message which we have heard of him, and declare unto you, that AHAYAH is light, and in him is no darkness at all." }
];

const KnowledgeBaseView: React.FC = () => {
  const [query, setQuery] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setAnswer(null);

    try {
      // Initialize instance right before use with direct process.env.API_KEY access
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Based on the theological principles of the Creators Calendar (names like AHAYAH and Yashaya, day starting at DAWN, and being Children of Light), answer this question: ${query}`,
        config: {
          systemInstruction: "You are a biblical scholar specializing in the Enochian calendar and the Law of AHAYAH. Use the provided name substitutions (AHAYAH, Yashaya) and day-start at DAWN theology."
        }
      });
      // Use .text property to extract output
      setAnswer(response.text || "I was unable to find an answer at this time.");
    } catch (err) {
      console.error(err);
      setAnswer("An error occurred while seeking the truth. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto pb-12">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-bold text-royal-900 mb-4 tracking-tighter">TRUTH HUB / KNOWLEDGE BASE</h2>
        <p className="text-royal-600 font-bold uppercase tracking-widest text-sm">Study to shew thyself approved</p>
        <div className="w-32 h-1 bg-gold-500 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* AI Assistant Section */}
      <div className="bg-royal-900 rounded-2xl p-8 mb-12 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29-3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"/></svg>
        </div>
        
        <h3 className="text-white font-serif text-xl mb-4 relative z-10">Ask the Truth AI</h3>
        <form onSubmit={handleAsk} className="relative z-10">
          <div className="flex flex-col md:flex-row gap-3">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What does it mean to be a Child of Light?"
              className="flex-grow bg-white/10 border border-white/20 rounded-xl px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 ring-gold-500"
            />
            <button 
              type="submit"
              disabled={loading}
              className="bg-gold-500 hover:bg-gold-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : 'SEEK TRUTH'}
            </button>
          </div>
        </form>

        {answer && (
          <div className="mt-8 bg-white/5 rounded-xl p-6 border border-white/10 animate-fadeIn text-royal-50 leading-relaxed font-serif text-lg">
            <div className="mb-4 text-gold-400 font-bold uppercase tracking-widest text-xs">Wisdom Received:</div>
            {answer}
          </div>
        )}
      </div>

      {/* Scripture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SCRIPTURES.map((s, idx) => (
          <div key={idx} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:border-gold-300 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-royal-50 text-royal-700 px-3 py-1 rounded text-xs font-bold font-serif uppercase tracking-widest">{s.ref}</span>
              <svg className="w-5 h-5 text-gray-200 group-hover:text-gold-400" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"/></svg>
            </div>
            <p className="text-gray-700 text-xl font-serif italic">"{s.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBaseView;
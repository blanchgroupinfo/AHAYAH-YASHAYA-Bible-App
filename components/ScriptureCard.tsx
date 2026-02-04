import React, { useState } from 'react';

interface ScriptureCardProps {
  title: string;
  text: string;
  reference: string;
  colorTheme?: 'gold' | 'blue' | 'red';
  isSmall?: boolean;
}

const ScriptureCard: React.FC<ScriptureCardProps> = ({ title, text, reference, colorTheme = 'blue', isSmall = false }) => {
  const [copied, setCopied] = useState(false);

  const themeStyles = {
    gold: 'bg-amber-50 border-gold-200 text-amber-900',
    blue: 'bg-royal-50 border-royal-200 text-royal-900',
    red: 'bg-rose-50 border-rose-200 text-rose-900'
  };

  const iconStyles = {
    gold: 'text-gold-600',
    blue: 'text-royal-600',
    red: 'text-rose-600'
  };

  const getBibleLink = () => {
    const encodedRef = encodeURIComponent(reference);
    return `https://www.biblegateway.com/passage/?search=${encodedRef}&version=KJV`;
  };

  const handleShare = async () => {
    const shareText = `✨ ${title} ✨\n\n"${text}"\n\n— ${reference}\n\nStudy the Truth at: ${window.location.origin}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, text: shareText });
      } catch (e) {}
    } else {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`rounded-xl border ${themeStyles[colorTheme]} shadow-sm flex flex-col transition-all relative group ${isSmall ? 'p-3' : 'p-6 h-full'}`}>
      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <a 
          href={getBibleLink()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="p-1.5 hover:bg-white/50 rounded-lg text-gray-400 hover:text-royal-600"
          title="Read Full Chapter"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
        <button 
          onClick={handleShare}
          className="p-1.5 hover:bg-white/50 rounded-lg"
          title="Share verse"
        >
          {copied ? (
            <span className="text-[10px] font-bold text-green-600">COPIED</span>
          ) : (
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          )}
        </button>
      </div>

      <div className={`flex items-center space-x-2 ${isSmall ? 'mb-1.5' : 'mb-4'}`}>
         <span className={iconStyles[colorTheme]}>
            <svg xmlns="http://www.w3.org/2000/svg" className={`${isSmall ? 'h-3.5 w-3.5' : 'h-6 w-6'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
         </span>
         <h3 className={`font-serif font-bold uppercase tracking-wide opacity-80 ${isSmall ? 'text-[10px]' : 'text-lg'}`}>{title}</h3>
      </div>
      <p className={`flex-grow font-serif italic leading-relaxed ${isSmall ? 'text-xs mb-1.5' : 'text-xl mb-4'}`}>
        "{text}"
      </p>
      <div className={`flex justify-between items-center opacity-70 ${isSmall ? 'text-[9px]' : 'text-sm'}`}>
        <a href={getBibleLink()} target="_blank" rel="noopener noreferrer" className="hover:text-royal-600 transition-colors">Read Chapter →</a>
        <div className="font-bold uppercase tracking-wider">
          — {reference}
        </div>
      </div>
    </div>
  );
};

export default ScriptureCard;
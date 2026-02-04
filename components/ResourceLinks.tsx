import React from 'react';

const resources = [
  { title: 'Book of Jubilees', desc: 'The history of the division of days.', url: '#' },
  { title: 'Book of Enoch', desc: 'The courses of the heavenly luminaries.', url: '#' },
  { title: 'Leviticus 23', desc: 'The Appointed Times of AHAYAH.', url: '#' },
  { title: 'Calendar Methodology', desc: 'Understanding the 364-day cycle.', url: '#' },
];

const ResourceLinks: React.FC = () => {
  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-serif font-bold text-royal-800 mb-6 uppercase tracking-widest flex items-center gap-3">
        <span className="w-8 h-1 bg-gold-500 rounded-full"></span>
        Study Resources
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {resources.map((res, idx) => (
          <a 
            key={idx} 
            href={res.url}
            className="group block p-5 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md hover:border-gold-300 transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-bold text-royal-700 group-hover:text-gold-600 transition-colors font-serif">
                {res.title}
              </h4>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {res.desc}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ResourceLinks;

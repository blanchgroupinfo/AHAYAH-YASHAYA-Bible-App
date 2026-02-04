import React from 'react';

interface InfoBadgeProps {
  label: string;
  active: boolean;
  type?: 'sabbath' | 'feast' | 'normal';
}

const InfoBadge: React.FC<InfoBadgeProps> = ({ label, active, type = 'normal' }) => {
  if (!active) return null;

  let displayLabel = label;
  if (label.includes("Shabbat Shalom")) {
    displayLabel = label.replace("Shabbat Shalom", "Shabbat Shalawam");
  }

  let bgClass = "bg-gray-100 text-gray-600";
  if (type === 'sabbath') bgClass = "bg-royal-600 text-white animate-pulse";
  if (type === 'feast') bgClass = "bg-gold-500 text-white animate-pulse";

  return (
    <div className={`w-full text-center py-3 rounded-lg font-bold uppercase tracking-widest shadow-md ${bgClass} mb-6 transition-all`}>
      {displayLabel}
    </div>
  );
};

export default InfoBadge;
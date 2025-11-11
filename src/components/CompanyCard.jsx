import React, { useMemo, useState } from 'react';

function CompanyCard({ company }) {
  const { name, description, location, industry, website, logo } = company;

  const slugify = (text) =>
    String(text || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  const candidates = useMemo(() => {
    const base = `/images/${slugify(name)}`;
    const list = [];
    if (logo) list.push(logo);
    list.push(`${base}.png`, `${base}.jpg`, `${base}.jpeg`, `${base}.svg`);
    return list;
  }, [logo, name]);

  const [imgIdx, setImgIdx] = useState(0);
  const imageSrc = candidates[imgIdx] || '/logo192.png';

  // Gradient-related code has been removed as it wasn't being used

  return (
    <div className="relative flex flex-col rounded-2xl overflow-hidden h-full bg-gradient-to-br from-blue-50/80 to-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-blue-100/50">
      {/* Logo Section */}
      <div className="relative h-48 flex items-center justify-center p-8 bg-gradient-to-br from-blue-50/50 to-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-blue-50/20"></div>
        <img
          className="max-h-32 max-w-full object-contain z-10 transition-transform duration-300 hover:scale-105"
          src={imageSrc}
          alt={`${name} logo`}
          onError={() => {
            setImgIdx((i) => (i + 1 < candidates.length ? i + 1 : i));
          }}
        />
      </div>
      
      {/* Glass Panel Section */}
      <div className="relative flex-1 p-6 flex flex-col">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 to-blue-50/10"></div>
        
        {/* Glass panel */}
        <div className="relative z-10 flex-1 flex flex-col">
          {/* Company Name */}
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{name}</h3>
          
          {/* Description */}
          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{description}</p>
          
          {/* Meta Info */}
          <div className="mt-auto pt-4 border-t border-white/20">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-2.5 py-1 text-xs font-medium bg-white/50 backdrop-blur-sm rounded-full border border-gray-200 text-gray-700">
                {industry}
              </span>
              <span className="flex items-center text-xs text-gray-500">
                <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location}
              </span>
            </div>
            
            {website && (
              <a 
                href={website} 
                target="_blank" 
                rel="noreferrer"
                className="block w-full py-2 px-4 text-center text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;


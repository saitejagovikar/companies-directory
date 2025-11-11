import React from 'react';
import './SkeletonCard.css';

const SkeletonCard = ({ count = 6 }) => {
  return (
    <div className="skeleton-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="skeleton-card">
          <div className="skeleton-media"></div>
          <div className="skeleton-content">
            <div className="skeleton-line skeleton-title"></div>
            <div className="skeleton-line skeleton-text"></div>
            <div className="skeleton-line skeleton-text"></div>
            <div className="skeleton-tags">
              <div className="skeleton-tag"></div>
              <div className="skeleton-tag"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonCard;

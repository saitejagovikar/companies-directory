import React from 'react';
import LightRays from './LightRays';
import ShinyText from './ShinyText';

function Hero({ search, onSearchChange }) {
  return (
    <div className="hero">
      <div className="hero-container">
        <div className="light-rays-wrapper">
          <LightRays
            raysOrigin="top-center"
            raysColor="#9ecbff"
            raysSpeed={1.2}
            lightSpread={0.9}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.12}
            noiseAmount={0.05}
            distortion={0.04}
            className="custom-rays"
          />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">
            <ShinyText 
              text="India's Corporate Horizon" 
              speed={15}
              className="text-5xl font-extrabold text-white"
            />
          </h1>
          <p className="hero-subtitle">Explore, discover, and connect with India's most influential companies across diverse industries</p>
          <div className="hero-search">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search companies..."
              aria-label="Search companies"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;


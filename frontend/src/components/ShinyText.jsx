import React, { useEffect, useRef, useMemo } from 'react';

const ShinyText = ({ text, disabled = false, speed = 15, className = '' }) => {
  const textRef = useRef(null);
  const styleId = useMemo(() => `shiny-text-style-${Math.random().toString(36).substr(2, 9)}`, []);
  const animationName = useMemo(() => `${styleId}-shine`, [styleId]);

  useEffect(() => {
    if (!textRef.current || disabled) return;

    const element = textRef.current;
    
    // Remove any existing style tag with the same ID
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    // Create new style tag with the animation
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes ${animationName} {
        0% { background-position: 100% 50%; }
        100% { background-position: -100% 50%; }
      }
      .shiny-text-${styleId} {
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 1) 40%,
          rgba(255, 255, 255, 0.8) 50%,
          rgba(0, 0, 0, 0.92) 60%
        );
        background-size: 200% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        display: inline-block;
        animation: ${animationName} ${speed}s linear infinite;
        animation-fill-mode: both;
        will-change: background-position;
        -webkit-animation: ${animationName} ${speed}s linear infinite;
      }
    `;

    document.head.appendChild(style);
    
    // Apply the animation class
    element.classList.add(`shiny-text-${styleId}`);
    
    // Force reflow to ensure animation restarts
    element.style.animation = 'none';
    void element.offsetHeight; // Trigger reflow
    element.style.animation = '';

    return () => {
      // Clean up
      const styleTag = document.getElementById(styleId);
      if (styleTag) {
        styleTag.remove();
      }
      if (element) {
        element.classList.remove(`shiny-text-${styleId}`);
      }
    };
  }, [disabled, speed, styleId, animationName]);

  return (
    <span 
      ref={textRef}
      className={className}
    >
      {text}
    </span>
  );
};

export default ShinyText;

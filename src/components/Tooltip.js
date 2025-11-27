import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.div`
  position: fixed;
  background-color: ${props => props.theme?.card || '#333'};
  color: ${props => props.theme?.text || '#fff'};
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  white-space: nowrap;
  z-index: 10000;
  opacity: ${props => props.$isVisible ? 1 : 0};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.2s ease, visibility 0.2s ease;
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  ${props => props.$position === 'top' ? `
    margin-bottom: 10px;
    &::after {
      content: '';
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px;
      border-style: solid;
      border-color: ${props.theme?.card || '#333'} transparent transparent transparent;
    }
  ` : `
    margin-top: 10px;
    &::after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent ${props.theme?.card || '#333'} transparent;
    }
  `}
`;

const Tooltip = ({ children, content, position = 'bottom', theme, delay = 500 }) => {
  const [visible, setVisible] = useState(false);
  const [positionStyle, setPositionStyle] = useState({ left: 0, top: 0 });
  const [timeoutId, setTimeoutId] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (visible && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      
      let left = rect.left + rect.width / 2;
      let top;
      
      if (position === 'top') {
        top = rect.top - 10;
      } else {
        top = rect.bottom + 10;
      }
      
      setPositionStyle({ left, top });
    }
  }, [visible, position]);

  const showTooltip = () => {
    const id = setTimeout(() => {
      if (containerRef.current) {
        setVisible(true);
      }
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setVisible(false);
  };

  return (
    <>
      <TooltipContainer
        ref={containerRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
      >
        {children}
      </TooltipContainer>
      {visible && content && createPortal(
        <TooltipText 
          $isVisible={visible}
          $position={position}
          theme={theme}
          style={{
            left: `${positionStyle.left}px`,
            top: `${positionStyle.top}px`,
            transform: 'translateX(-50%)'
          }}
        >
          {content}
        </TooltipText>,
        document.body
      )}
    </>
  );
};

export default Tooltip;
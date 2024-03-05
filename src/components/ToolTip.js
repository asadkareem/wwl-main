import React, {useState} from "react";
import {useSelector} from "react-redux";
import {selectIsTouchScreen} from "../redux/navigation/navigationSlice";

const ToolTip = ({content,direction,extraClasses, delay, children}) => {
  const isTouchScreen = useSelector(selectIsTouchScreen);
  let timeout;
  const [active, setActive] = useState(false);
  const showTip = () => {
    if(isTouchScreen) return;
    timeout = setTimeout(() => {
      setActive(true);
    }, delay || 400);
  };

  const hideTip = () => {
    clearInterval(timeout);
    setActive(false);
  };

  return (
    <div
      className={`relative w-fit ${extraClasses || ''}`}
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      <div className='flex items-center'>
        {children}
      </div>
      {active && (
        <div
          className={`absolute px-3 text-center whitespace-nowrap rounded p-1 z-50 bg-wwlBlack text-wwlWhite  font-chivo text-xs ${direction === 'top' ? '-top-7 left-1/2 -translate-x-1/2' : ''} ${direction === 'bottom' ? '-bottom-7 left-1/2 -translate-x-1/2' : ''} ${direction === 'left' ? '-left-24 top-1/2 -translate-y-1/2' : ''} ${direction === 'right' ? '-right-24 top-1/2 -translate-y-1/2' : ''}`}>
          {content}
        </div>
      )}
    </div>
  );
};

export default ToolTip;
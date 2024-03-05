import React from 'react';

const HorizontalScroller = ({isTouchScreen,children,extraClass=''}) => {
  return (
    <div className={`flex overflow-x-scroll overflow-y-scroll ${isTouchScreen ? 'scrollbar-hide': 'scrollbar scrollbar-thin scrollbar-thumb-wwlOrange scrollbar-track-wwlGray200'} ${extraClass}`}>
      {children}
    </div>
  );
};

export default HorizontalScroller;
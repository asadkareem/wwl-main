import React from 'react';

const VerticalScroller = ({children, isTouchScreen, height = false}) => {

    return (
        <div className={`bg-white px-4 py-4 sm:p-6 sm:pb-4 flex-grow flex ${height ? 'max-h-[730px]' : 'h-0'} flex-col ${isTouchScreen ? 'scrollbar-hide': 'scrollbar scrollbar-thin scrollbar-thumb-wwlOrange scrollbar-track-wwlGray200'}`}>
            {children}
        </div>
    );
};

export default VerticalScroller;


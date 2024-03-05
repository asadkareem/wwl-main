import React from 'react';
import SearchBar from "./SearchBar";
const SearchBarModal = ({setSearchbarOpen, setChips, chips}) => {
  const closeModal = (event) => {
    const closestOverlay = event.target.closest('svg');
    if (closestOverlay?.classList.contains('cross')) setSearchbarOpen(false);
    if(event.target.classList.contains('overlay-close')) setSearchbarOpen(false);
  }

  return (
    <div className="fixed top-20 z-50 w-full inset-0 h-screen bg-gray-600 bg-opacity-75 overlay-close md:hidden"
         onClick={closeModal}>
      <div className={'absolute w-full px-8 mt-6'}>
        <SearchBar closeModal={closeModal} setChips={setChips} chips={chips}/>
      </div>
    </div>
  );
};

export default SearchBarModal;
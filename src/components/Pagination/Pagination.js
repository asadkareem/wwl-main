import React from 'react';
import {usePagination, DOTS} from './usePagination';
import PreviousIcon from "../../assets/icons/previous.svg";
import NextIcon from "../../assets/icons/next.svg";

const Pagination = props => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    customPageNumber
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
    customPageNumber
  });
  if (currentPage === 0 || paginationRange?.length < 2) {
    return null;
  }

  const onNext = () => {
    if (currentPage !== lastPage)
      onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    if (currentPage > 1)
      onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange?.length - 1];
  return (
    <div className="bg-wwlWhite px-4 py-4 flex items-center justify-between border-t border-wwlGreenTransparent sm:px-6">
      <ul className="relative z-0 flex-grow flex justify-between items-center rounded-md -space-x-px">
        <li onClick={onPrevious}
            className="cursor-pointer relative inline-flex items-center px-3 md:px-4 py-2 rounded-lg bg-white font-inter text-sm font-medium border border-wwlGray300 text-wwlGray700 hover:bg-gray-50">
          <span className="sr-only">Previous</span>
          <img src={PreviousIcon} alt="Previous" className='mr-0 md:mr-3'/>
          <span className='hidden md:inline-block'>Previous</span>
        </li>
        <div className="hidden sm:flex justify-between rounded-md space-x-2 mx-2">
          {paginationRange.map((pageNumber, index) => {
            if (pageNumber === DOTS) {
              return <li
                  key={index}
                className="relative font-inter hidden sm:inline-flex rounded-lg items-center px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">&#8230;</li>;
            }

            return (
              <li onClick={() => onPageChange(pageNumber)}
                    key={index}
                  className={(pageNumber === Number(currentPage) ? 'bg-wwlPaginationActive' : 'hover:bg-gray-50') + ' relative font-inter hidden sm:inline-flex rounded-lg items-center px-4 py-2 bg-white text-sm font-medium text-gray-700 cursor-pointer'}>
                {pageNumber}
              </li>
            );
          })}
        </div>
        <div className="flex sm:hidden justify-between rounded-md space-x-2 mx-2 font-inter text-sm text-wwlGray700">
          Page {currentPage} of {lastPage}
        </div>
        <li onClick={onNext}
            className="cursor-pointer relative inline-flex items-center px-3 md:px-4 py-2 rounded-lg bg-white font-inter text-sm font-medium border border-wwlGray300 text-wwlGray700 hover:bg-gray-50">
          <span className="sr-only">Next</span>
          <span className='hidden md:inline-block'>Next</span>
          <img src={NextIcon} alt="Next" className='ml-0 md:ml-3'/>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;

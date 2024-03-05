import React from 'react';

const SeeAll = ({link, title}) => {
  // const removeEmoji = () => {
  //  if(title){
  //    return title.split(' ').splice(1).join(' ')
  //  }
  // }
  return (
    <div className='mt-7 flex justify-between items-center mb-4'>
      <h1 className='font-chivo font-bold text-base'>{title}</h1>
      {/*<Link to={`/search?q=${removeEmoji()}`} className='font-chivo text-sm underline decoration-underline'>See All</Link>*/}
    </div>
  );
};

export default SeeAll;
import React from 'react';
import {XCircleIcon} from "@heroicons/react/solid";

const Chip = ({handleRemoveChip, tag, index}) => {
  return (
    <div className="bg-wwlOrange inline-block pl-3 pr-2 py-1 rounded-full mr-2 shrink-0;
  whitespace-nowrap"
         contentEditable={false}>
      <div className="flex items-center">
        <h2 className="text-sm font-chivo text-wwlWhite">{tag}</h2>
        <XCircleIcon className="h-5 w-5 text-wwlWhite ml-2 cursor-pointer"
                     onClick={(e) => handleRemoveChip(index)}/>
      </div>
    </div>
  );
};

export default Chip;
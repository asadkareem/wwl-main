import React from 'react';
import RadioButton from "../../../components/RadioButton";
import SwitchButton from "../../../components/SwitchButton";

const ProfileListItem = ({data, user}) => {
  const {title, text, options, type} = data;
  const {unitPreference, primaryDiet, isGlutenFree, isDairyFree} = user;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start p-5 border-b border-wwlGreen">
      <div>
        <h2 className="font-chivo font-bold text-xl">{title}</h2>
        {text && <p className="font-inter text-sm my-2 lg:text-base text-wwlGray500 max-w-md pr-6">{text}</p>}
      </div>
      <div className="flex flex-col gap-2 w-40 mt-3 sm:mt-0">
        {data && options.map((item, index) => {
          if (type === 'radio') {
            return <RadioButton id={item.id} name={item.name} value={item.value} key={index} userPreference={ title === 'Measurement Preference' ? unitPreference : primaryDiet }/>
          } else {
            return <SwitchButton customizedOption={item.name} isSmall={true} key={index} userPreference={item.name === 'Dairy Free' ? isDairyFree : isGlutenFree}/>
          }
        })}
      </div>
    </div>
  );
};

export default ProfileListItem;
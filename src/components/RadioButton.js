import React from 'react';
import {updatePrimaryDiet, updateUnitPreference} from "../redux/user/userSlice";
import {useDispatch} from "react-redux";


const RadioButton = ({id, name, value, userPreference}) => {
const dispatch = useDispatch();
  const style = {
    boxShadow: "none"
  }

  const handleSelection = (e) => {
    if(e.target.name === 'preference') {
      dispatch(updateUnitPreference(e.target.value))
    } else {
      dispatch(updatePrimaryDiet(e.target.value))
    }
  }
  return (
    <div>
      <input className="cursor-pointer mr-2.5 text-wwlOrange" style={style} type="radio" id={id} name={name}
             value={value} checked={userPreference === value} onChange={(e) => {handleSelection(e)}}/>
      <label className="font-inter text-sm cursor-pointer" htmlFor={id}>{value}</label>
    </div>
  );
};

export default RadioButton;
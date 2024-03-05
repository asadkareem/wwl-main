import {forwardRef} from "react";

const RadioButton = forwardRef(({option, handleChange}, ref) => {
  return (
    <div className='px-4'>
      <input ref={ref} className="cursor-pointer mr-2.5 text-wwlOrange focus:ring-0" type="radio" id={option.id}
             name={option.name}
             value={option.value}
             checked={option.selected}
             onChange={(e) => {
               handleChange(e.target.id)
             }}
      />
      <label className="font-chivo text-sm cursor-pointer transition-colors duration-300 hover:text-wwlOrange"
             htmlFor={option.id}><img src={option.icon} alt="" className='inline h-5 w-5 mr-2'/>{option.value}</label>
    </div>
  )
})

export default RadioButton
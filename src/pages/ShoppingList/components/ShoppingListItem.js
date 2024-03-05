import React, {useState} from 'react';
import {TrashIcon} from "@heroicons/react/outline";
import {CheckIcon, PencilAltIcon} from "@heroicons/react/solid";
import {useDispatch} from "react-redux";
import {updateShoppingListItem} from "../../../redux/shoppingList/shoppingListSlice";
import {toast} from "react-hot-toast";

const ShoppingListItem = ({item, handleDeleteMeal, handleCheck, rowIndex, index}) => {
  const dispatch = useDispatch();
  const [editable, setEditable] = useState(null);
  const {qty, title, measurement, notes, checked} = item;

  function handleSaveMeal() {
    dispatch(updateShoppingListItem({
      data: {...editable, desiredTitle: `${qty} ${measurement} of ${title}`},
      rowIndex: rowIndex,
      index: index
    }))
    toast.success('Meal updated')
    setEditable(null)
  }

  if (title === 'water') return
  return (
    <>
      <td className="font-chivo text-sm mt-2.5 grow flex flex-col sm:flex-row print-show print-flex">
        <div className={'print-flex print-max-width'}>
          <input type="checkbox" name={`item${item._id}`} id={`item${item._id}`}
                 className="ml-0 sm:ml-2 mr-2 rounded border-wwlGray300 cursor-pointer text-wwlOrange focus:ring-0"
                 checked={!!checked} onChange={() => {
            handleCheck(item._id)
          }}/>
          {editable ? <input
              className='border border-slate-300 text-sm w-48 p-0 focus:outline-none focus:ring-2 focus:ring-wwlOrange focus:border-transparent'
              onChange={e => setEditable(prev => {
                return {...prev, title: e.target.value}
              })} value={editable?._id === item._id ? editable.title : title}/> :
            <span className='font-chivo text-sm'>{title}</span>}

        </div>
        <div className="font-chivo text-sm sm:hidden print-flex">
          <span className="block print-max-width mt-1">
            <span className='mr-3 font-bold'>Quantity:</span>
            <span>
             {editable ?  <input
               className='border border-slate-300 text-sm w-5 p-0 mr-1 focus:outline-none focus:ring-2 focus:ring-wwlOrange focus:border-transparent'
               onChange={e => setEditable(prev => {
                 return {...prev, qty: e.target.value}
               })} size='' disabled={editable?._id !== item._id} type='number'
               value={editable?._id === item._id ? editable.qty : qty}/> : <span className="text-sm font-chivo mr-2">{qty}</span>}
              {editable ? <input
                className='border border-slate-300 text-sm w-24 p-0 focus:outline-none focus:ring-2 focus:ring-wwlOrange focus:border-transparent'
                onChange={e => setEditable(prev => {
                  return {...prev, measurement: e.target.value}
                })}
                size=''
                disabled={editable?._id !== item._id} type='text'
                value={editable?._id === item._id ? (editable.measurement === 'Item(s)' ? '' : editable.measurement) : measurement}/> : <span className="text-sm font-chivo">{measurement === 'Item(s)' ? '' : measurement}</span>}
            </span>
          </span>
          <span className="block"><span className='font-bold mr-3'>Shopping Notes:</span>
             <textarea
               disabled={editable?._id !== item._id}
               className={`${editable?._id !== item._id ? 'border-0' : 'border border-slate-300'} text-sm p-0 block w-full resize-none focus:outline-none focus:ring-2 focus:ring-wwlOrange focus:border-transparent`}
               type="text"
               value={editable?._id === item._id ? editable.notes : notes}
               onChange={e => {
                 setEditable(prev => {
                   return {...prev, notes: e.target.value};
                 });
               }}
             />
          </span>
        </div>
      </td>
      <td
        className={`flex-1 font-chivo text-sm hidden sm:table-cell ${qty ? '' : 'opacity-0'}`}>
        {editable ? <input onChange={e => setEditable(prev => {
            return {...prev, qty: e.target.value}
          })}
                           className='border border-slate-300 text-sm w-10 p-0 focus:outline-none focus:ring-2 focus:ring-wwlOrange focus:border-transparent mr-2'
                           size="" disabled={editable?._id !== item._id}
                           type='number'
                           value={editable?._id === item._id ? editable.qty : qty}/> :
          <span className='text-sm font-chivo mr-2'>{qty}</span>}

        {editable ? <input onChange={e => setEditable(prev => {
            return {...prev, measurement: e.target.value}
          })}
                           className='border border-slate-300 text-sm w-24 p-0 focus:outline-none focus:ring-2 focus:ring-wwlOrange focus:border-transparent'
                           size='' disabled={editable?._id !== item._id} type='text'
                           value={editable?._id === item._id ? (editable.measurement === 'Item(s)' ? '' : editable.measurement) : measurement}/> :
          <span className='text-sm font-chivo'>{measurement === 'Item(s)' ? '' : measurement}</span>}
      </td>
      <td className="flex-1 font-chivo text-sm hidden sm:table-cell ">
      <textarea
          disabled={editable?._id !== item._id}
          className={`${editable?._id !== item._id ? 'border-0' : 'border border-slate-300'} text-sm p-0 block w-full resize-none focus:outline-none focus:ring-2 focus:ring-wwlOrange focus:border-transparent`}
          type="text"
          value={editable?._id === item._id ? editable.notes : notes}
          onChange={e => {
            setEditable(prev => {
              return {...prev, notes: e.target.value};
            });
          }}
        />
      </td>
      <td className="font-chivo text-sm text-center p-5 print-hide">
        {editable ? <button onClick={() => {
          handleSaveMeal(item)
        }}><CheckIcon
          className="w-5 text-wwlOrange m-auto"/></button> : <button onClick={() => {
          setEditable(item)
        }}><PencilAltIcon
          className="w-5 text-wwlOrange m-auto"/></button>}
        <button className='ml-2' onClick={() => {
          handleDeleteMeal(item)
        }}><TrashIcon
          className="w-5 text-wwlOrange m-auto"/></button>
      </td>
    </>
  );
};

export default ShoppingListItem;
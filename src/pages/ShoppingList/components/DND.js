import React, {useEffect, useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {toast, Toaster} from "react-hot-toast";
import {useDispatch} from "react-redux";
import {
  autoDeleteShoppingList,
  deleteShoppingList
} from "../../../redux/shoppingList/shoppingListThunk";
import {
  recoverDeletedList,
  reorderShoppingList,
  selectShoppingItem
} from "../../../redux/shoppingList/shoppingListSlice";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => {
  const styles = {
    userSelect: "none",
    boxShadow: isDragging && '0px 4px 4px rgba(0, 0, 0, 0.25)',
    ...draggableStyle,
  };
  if (isDragging) {
    styles.width = '1200px';
    styles.display = 'flex';
    styles.justifyContent = 'space-between';
  }
  return styles;
};

const DND = ({data: i, headers, TableRow, menuTitle, index}) => {

  const dispatch = useDispatch();
  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(i)
  }, [i]);
  const onDragEnd = result => {
    if (!result.destination) return;
    setItems(reorder(items, result.source.index, result.destination.index));
  };
  useEffect(() => {
    dispatch(reorderShoppingList({items, index}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, items]);
  const handleDeleteMeal = (item) => {
    dispatch(deleteShoppingList(item._id));
    dispatch(autoDeleteShoppingList(item._id))
    toast.custom((t) => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } px-3 py-2 w-fit bg-red-500 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
      >
        <div className="flex border-gray-200 justify-around items-center">
          <p className="whitespace-nowrap text-white mr-12">{item.name} deleted</p>
          <button
            className="w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm font-medium text-white hover:text-indigo-500 focus:outline-none  mr-2"
            onClick={() => {
              dispatch(recoverDeletedList(item._id));
              toast.remove(t.id)
            }}
          >
            Undo
          </button>
          <button
            onClick={() => toast.remove(t.id)}
            className="w-full border border-transparent rounded-none rounded-r-lg flex items-center justify-center text-sm font-medium text-white hover:text-indigo-500 focus:outline-none"
          >
            Close
          </button>
        </div>
      </div>
    ), {duration: 3000})
  };
  const handleCheck = (id, index) => {
    dispatch(selectShoppingItem(id))
  };

  return (
    <>
      {items.length > 0 && <table className='w-full mt-10 border-b border-b-wwlYellow print-margin'>
        <thead>
        <tr>
          <th className='text-start font-chivo font-bold text-xl pb-3'>{menuTitle}</th>
        </tr>
        <tr className='print-hide'>
          {headers && headers.map((header, index) => {
            return <th key={index}
                       className={`${index === 3 ? 'text-center' : 'text-start'} ${index === 1 || index === 2 ? 'hidden sm:table-cell' : ''} ${index === 0 ? '' : ''} font-chivo font-bold text-base`}>{header.title}</th>
          })}
        </tr>
        </thead>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <tbody
                {...provided.droppableProps}
                ref={provided.innerRef}>
              {items.map((item, idx) => {
                return <Draggable key={item._id} draggableId={item._id} index={idx}>
                  {(provided, snapshot) => {
                    return <tr className={`${item.checked && 'line-through'} border-b border-b-wwlGreenTransparent`}
                               ref={provided.innerRef}
                               {...provided.draggableProps}
                               {...provided.dragHandleProps}
                               style={getItemStyle(
                                 snapshot.isDragging,
                                 provided.draggableProps.style
                               )}
                    >
                      <TableRow item={item} key={idx} index={idx} rowIndex={index} handleDeleteMeal={handleDeleteMeal}
                                handleCheck={handleCheck}/>
                    </tr>
                  }}
                </Draggable>
              })}
              {provided.placeholder}
              </tbody>
            )}
          </Droppable>
        </DragDropContext>
      </table>}
      <Toaster
        position="bottom-center"
        reverseOrder={false}
      />
    </>
  );
};

export default DND;


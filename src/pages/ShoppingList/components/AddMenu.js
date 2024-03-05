import React, {useRef,  useState} from 'react';
import Button from "../../../components/Button";
import {useDispatch} from "react-redux";
import {addItemToShoppingList} from "../../../redux/shoppingList/shoppingListSlice";
import ListBoxMenu from "../../../components/ListBoxMenu";
import {useOnClickOutside} from "../../../utilis/customHooks";

const categoryUnits = [
  {
    id: 1,
    name: "Pantry"
  },
  {
    id: 2,
    name: "Produce"
  },
  {
    id: 3,
    name: "Refrigerated"
  },
]
const otherUnits = [
  {
    id: 15,
    name: "Item(s)"
  },
  {
    id: 1,
    name: "Fluid ounce(s)"
  },
  {
    id: 2,
    name: "Teaspoon(s)"
  },
  {
    id: 3,
    name: "Tablespoon(s)"
  },
  {
    id: 4,
    name: "Cup(s)"
  },
  {
    id: 5,
    name: "Pint(s)"
  },
  {
    id: 6,
    name: "Quart(s)"
  },
  {
    id: 7,
    name: "Gallon(s)"
  },
  {
    id: 8,
    name: "Liter(s)"
  },
  {
    id: 9,
    name: "Milliliter(s)"
  },
  {
    id: 10,
    name: "Ounce(s)"
  },
  {
    id: 11,
    name: "Pound(s)"
  },
  {
    id: 12,
    name: "Gram(s)"
  },
  {
    id: 13,
    name: "Kilogram(s)"
  },
  {
    id: 14,
    name: "Package(s)"
  },
];
const AddMenu = ({setAddMenu}) => {
  const ref = useRef(null);
  useOnClickOutside(ref, () => setAddMenu(false));

  const dispatch = useDispatch();

  const ingredientTitleRef = useRef();
  const ingredientAmountRef = useRef();
  const shoppingNotesRef = useRef();
  const [dropDownCategory, setDropDownCategory] = useState(categoryUnits[0]);
  const [dropDownMeasurement, setDropDownMeasurement] = useState(otherUnits[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addItemToShoppingList(
      {
        _id: `${Math.floor(Math.random() * 1000)}`,
        title: ingredientTitleRef.current.value,
        qty: ingredientAmountRef.current.value,
        measurement: dropDownMeasurement.name,
        notes: shoppingNotesRef.current.value,
        checked: false,
        dropDownCategory:dropDownCategory.name,
        desiredTitle: ingredientAmountRef.current.value + ' ' + dropDownMeasurement.name + ' ' + ingredientTitleRef.current.value
      }
    ))
    ingredientTitleRef.current.value = '';
    ingredientAmountRef.current.value = '';
    shoppingNotesRef.current.value = '';
    setAddMenu(false)
  }

  return (
    <form onSubmit={handleSubmit}
          className="flex flex-col p-3 top-[100%] right-0 absolute shadow-wwlDragDropShadow bg-white" ref={ref}>
      <ListBoxMenu list={categoryUnits}
                   selected={dropDownCategory}
                   setSelected={setDropDownCategory}/>
      <input type="text" id="ingredientTitle" name="ingredientTitle" placeholder="Ingredient Title"
             className="block bg-wwlInterfaceLightest mb-2 w-full text-sm font-chivo focus:ring-0 focus:outline-none outline-none rounded-full py-2 border-none focus:border-none"
             ref={ingredientTitleRef}/>
      <input type="number" id="ingredientAmount" name="ingredientAmount" placeholder="Ingredient Amount"
             className="block bg-wwlInterfaceLightest w-full text-sm font-chivo focus:ring-0 focus:outline-none outline-none mb-2 rounded-full py-2 border-none focus:border-none"
             ref={ingredientAmountRef}/>
      <ListBoxMenu list={otherUnits} selected={dropDownMeasurement} setSelected={setDropDownMeasurement}/>
      <input type="text" id="shoppingNotes" name="shoppingNotes" placeholder="Shopping Notes"
             className="block bg-wwlInterfaceLightest w-full text-sm font-chivo focus:ring-0 focus:outline-none mb-2 outline-none rounded-full py-2 border-none focus:border-none"
             ref={shoppingNotesRef}/>
      <Button btnText='Add Now'
              extraClasses='rounded-lg bg-wwlOrange border border-transparent hover:bg-wwlWhite hover:text-wwlOrange hover:border-wwlOrange text-wwlWhite w-fit py-1'
              iconExtraClasses="hover:text-wwlOrange"/>
    </form>
  );
};

export default AddMenu;
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from "../../components/Button";
import {ArrowLeftIcon, PrinterIcon} from "@heroicons/react/outline";
import {PlusIcon} from "@heroicons/react/outline";
import {MailIcon} from "@heroicons/react/outline";
import DND from "./components/DND";
import shoppingListItem from "./components/ShoppingListItem";
import AddMenu from "./components/AddMenu";
import ConfirmationModal from "../../components/ConfirmationModal";
import {
  checkSavedShoppingList, createShoppingList,
  getShoppingList,
  sendShoppingMail
} from "../../redux/shoppingList/shoppingListThunk";
import {selectLoading, setLoading} from "../../redux/loader/loaderSlice";
import {selectShoppingList} from "../../redux/shoppingList/shoppingListSlice";
import {
  hasShoppingList,
  selectCurrentUser,
  selectSavedShoppingList,
  setShoppingListId
} from "../../redux/user/userSlice";
import Loader from "../../components/Loader";
import SaveIcon from "../../assets/icons/icons8-save-20.png";
import {toast} from "react-hot-toast";
import ShoppingListConfirmationModal from "./components/ShoppingListConfirmationModal";
import {isEmptyShoppingObject} from "../../utilis/generalUtilis";
import GoProModal from "../../components/GoProModal";
import NavigationLink from "../../components/NavigationLink";

let metaData = [{title: "Ingredient", visibleOnMobile: true}, {
  title: "Quantity",
  visibleOnMobile: true
}, {title: "Shopping Notes", visibleOnMobile: true}, {title: "Actions", visibleOnMobile: true}];
const ShoppingList = () => {
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading)
  const shoppingListData = useSelector(selectShoppingList);
  const shoppingListId = useSelector(selectSavedShoppingList)
  const {_id, email} = useSelector(selectCurrentUser);
  const [addMenu, setAddMenu] = useState(false)
  const [shoppingListConfirmation, setShoppingListConfirmation] = useState(false)
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const hasShoppingListAccess = useSelector(hasShoppingList);

  const queryParams = new URLSearchParams(window.location.search);
  const mpId = queryParams.get("mp");

  const openAddMenu = () => {
    setAddMenu(!addMenu)
  }

  useEffect(() => {
    if(!open){
      if(!hasShoppingListAccess){
        setModalOpen(true)
      }
      dispatch(setLoading(true))
      isSaved()
        .then(() => {
          dispatch(setLoading(false));
        })
        .catch(e => console.log(e))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleSaveShoppingList() {
    dispatch(createShoppingList({
      owner: _id, parent_meal_plan: mpId, meal_plan_title: shoppingListData.title, ingredients: shoppingListData.data
    }))
  }

  useEffect(() => {
      dispatch(setShoppingListId(shoppingListData._id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingListData._id])

  function handleEmailShoppingList() {
    setShoppingListConfirmation(true)
  }

  async function isSaved() {
    const resp = await dispatch(checkSavedShoppingList({mealplanId: mpId, ownerId: _id}));
    if (resp.payload.length === 0) {
      await dispatch(getShoppingList({
        mpId: mpId,
      }));
      dispatch(setShoppingListId(null))
    }
    else{
      dispatch(setShoppingListId(resp.payload._id))
    }
  }

  function sendEmail() {
    if (shoppingListId) {
      dispatch(sendShoppingMail({shoppingListId, email})).unwrap()
        .then(r => {
          toast.success("Email sent successfully");
        })
        .catch(e => toast.error("Something went wrong!"))
    } else {
      toast.error("Please save the shopping list first")
    }
  }

  if (loading) {
    return <div className='w-full h-screen'>
      <Loader/>
    </div>
  }
  return (<>
    <div className="max-w-6xl mx-auto mt-20 p-6 print-margin">
      <NavigationLink url={'/meal-planning'} LinkIcon={ArrowLeftIcon} linkText='Back to Meal Planning'
                      extraClasses='bg-wwlWhite text-wwlOrange hover:border-wwlOrange hover:bg-wwlOrange hover:text-wwlWhite px-4 border border-wwlOrange mb-8 inline-block'/>
      <div className="flex flex-col items-start md:flex-row gap-4 md:justify-between md:items-center">
        <div>
          <h2 className="text-xl font-chivo text-wwlBlack">Shopping List for</h2>
          <h1 className="font-chivo text-4xl text-wwlBlack font-black capitalize">{shoppingListData.title}<br/>Meal
            Plan</h1>
        </div>
        <div className="flex items-center justify-center gap-4 print-hide w-full md:w-fit">
          <Button btnText='Save' smallButton={true} pngIcon={SaveIcon}
                  disabled={isEmptyShoppingObject(shoppingListData)}
                  extraClasses='rounded-lg bg-wwlPaginationActive border border-wwlPaginationActive font-medium w-fit py-2 px-3.5 text-wwlDarkBlue font-inter'
                  onClick={() => {
                    handleSaveShoppingList()
                  }}
                  iconExtraClasses="text-wwlDarkBlue"/>
          <Button btnText='Email' smallButton={true} BtnIcon={MailIcon}
                  disabled={isEmptyShoppingObject(shoppingListData)}
                  extraClasses='rounded-lg bg-wwlPaginationActive border border-wwlPaginationActive font-medium w-fit py-2 px-3.5 text-wwlDarkBlue font-inter'
                  onClick={() => {
                    handleEmailShoppingList()
                  }} iconExtraClasses="text-wwlDarkBlue"/>
          <Button btnText='Print' smallButton={true} BtnIcon={PrinterIcon}
                  disabled={isEmptyShoppingObject(shoppingListData)}
                  extraClasses='rounded-lg bg-wwlPaginationActive border border-wwlPaginationActive font-medium w-fit py-2 px-3.5 text-wwlDarkBlue font-inter'
                  iconExtraClasses="text-wwlDarkBlue" onClick={() => window.print()}/>
        </div>
      </div>
      <hr className="bg-wwlGreen h-0.5 my-4"/>
      <div className="flex justify-center md:justify-end relative print-hide">
        <Button btnText='Reset List' smallButton={true} disabled={isEmptyShoppingObject(shoppingListData)}
                extraClasses='rounded-lg bg-wwlPaginationActive border border-wwlPaginationActive font-medium w-fit py-2 px-3.5 text-wwlDarkBlue font-inter mr-5'
                type='button'
                onClick={() => {
                  setOpen(true)
                }}/>
        {addMenu && <AddMenu setAddMenu={setAddMenu}/>}
        <Button btnText='Add Item' smallButton={true} BtnIcon={PlusIcon}
                extraClasses='rounded-lg bg-wwlOrange border border-transparent hover:bg-wwlWhite hover:text-wwlOrange hover:border-wwlOrange text-wwlWhite w-fit py-2 px-6'
                iconExtraClasses="hover:text-wwlOrange" onClick={() => {
          openAddMenu()
        }}/>
      </div>
      {!isEmptyShoppingObject(shoppingListData) ? shoppingListData?.data?.map((shoppingList, index) => {
          return <DND key={index} index={index} data={shoppingList?.ingredients} headers={metaData}
                      TableRow={shoppingListItem} menuTitle={shoppingList?.category}/>
        }) :
        <p className='font-base font-inter text-lg text-wwlGray500 text-center mt-5'>No items in the shopping list</p>}
      <ConfirmationModal setOpen={setOpen} open={open} shoppingListData={shoppingListData} _id={_id} mpId={mpId}/>
      <ShoppingListConfirmationModal open={shoppingListConfirmation} setOpen={setShoppingListConfirmation}
                                     handleModalOpening={sendEmail}/>
      <GoProModal open={modalOpen} setOpen={setModalOpen}/>
    </div>
  </>);
};

export default ShoppingList;
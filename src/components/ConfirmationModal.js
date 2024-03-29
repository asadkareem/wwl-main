import {Fragment, useEffect, useRef, useState} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import {ExclamationIcon} from '@heroicons/react/outline'
import {resetShoppingItem, selectShoppingList} from "../redux/shoppingList/shoppingListSlice";
import {useDispatch, useSelector} from "react-redux";
import {getShoppingList} from "../redux/shoppingList/shoppingListThunk";
import {isEmptyObject} from "../utilis/generalUtilis";
import Loader from "./Loader";
import {setShoppingListId} from "../redux/user/userSlice";

export default function ConfirmationModal({open, setOpen, _id, mpId}) {
  const shoppingListData = useSelector(selectShoppingList);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)

  const deleteButtonRef = useRef(null)
  const handleDelete = async () => {
    dispatch(setShoppingListId(null))
    await dispatch(resetShoppingItem());
  }

  useEffect(() => {
    if(!isEmptyObject(shoppingListData) && open){
      setLoading(true)
      fetchData().then(() => {setLoading(false); setOpen(false)})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shoppingListData.data]);

  async function fetchData() {
    await dispatch(getShoppingList({
      mpId, reset: true
    }))
  }

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={deleteButtonRef} onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
          </Transition.Child>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {loading ? <div className='p-6'><Loader/></div> : <><div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div
                    className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true"/>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                      Reset Shopping List
                    </Dialog.Title>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to reset your shopping list? All of the items will be unchecked.
                        This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="flex items-center justify-center py-2 px-4 font-chivo text-sm whitespace-nowrap lg:mb-0 px-4 rounded-lg bg-wwlOrange border border-transparent hover:bg-wwlWhite hover:text-wwlOrange hover:border-wwlOrange text-wwlWhite py-2 px-6 transition-colors duration-300 capitalize sm:ml-4 w-full sm:w-fit"
                    ref={deleteButtonRef}
                    onClick={() => {
                      handleDelete()
                    }
                    }
                  >
                    Reset Shopping List
                  </button>
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-0 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                </div></>}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
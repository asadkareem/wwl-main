import React from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {Fragment} from "react";
import NavigationLink from "../../../../components/NavigationLink";

const SignInModal = ({open, setOpen}) => {

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" onClose={setOpen}>
        <div
          className="flex items-end justify-center  min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
              className="inline-block align-bottom bg-wwlWhite rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle p-6 max-w-xs">
              <div>
                <h2 className="font-bold text-center text-xl tracking-tight text-wwlBlack">Sign Up for WWL to access all of our dietary options!</h2>
              </div>
              <div className="mt-5 sm:mt-6">
                <NavigationLink url={'/'} linkText='Sign Up Now'
                                extraClasses='bg-wwlWhite text-wwlOrange hover:border-wwlOrange hover:bg-wwlOrange hover:text-wwlWhite px-4 border border-wwlOrange w-full block text-center focus:outline-none focus-visible:ring-0' />
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SignInModal;
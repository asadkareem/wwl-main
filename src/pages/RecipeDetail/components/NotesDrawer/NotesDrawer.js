import React, {Fragment, useState} from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {XIcon} from "@heroicons/react/outline";
import NotesDrawerForm from "./components/NotesDrawerForm";
import NotesViewContainer from "./components/NotesViewContainer";
import Tabs from "../../../../components/Tabs";

const NotesDrawer = ({sidebarOpen, setSidebarOpen}) => {

  const [tabs, setTabs] = useState([
    {name: 'Personal Notes', current: true},
    {name: 'Comments', current: false}
  ]);

  const [currentTab, setCurrentTab] = useState('Personal Notes');

  return (
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as='div' className='fixed inset-0 flex justify-end w-full z-50' onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-600 bg-opacity-75'/>
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter='transition ease-in-out duration-300 transform'
            enterFrom='translate-x-full'
            enterTo='translate-x-0'
            leave='transition ease-in-out duration-300 transform'
            leaveFrom='translate-x-0'
            leaveTo='translate-x-full'
          >
            <div
              className='rounded-tl-2xl absolute h-screen max-h-screen overflow-hidden flex flex-col max-w-md w-full bg-wwlWhite'>
              <div className="flex justify-end h-fit">
                <button
                  type='button'
                  className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className='sr-only'>Close sidebar</span>
                  <XIcon className='h-6 w-6 text-black dark:text-white' aria-hidden='true'/>
                </button>
              </div>
              <div className='flex flex-col flex-grow'>
                <div className='flex mb-10 px-8 justify-between'>
                  <Tabs tabs={tabs} setTabs={setTabs} setCurrentTab={setCurrentTab} customStyles={{
                    currentTab: 'bg-wwlDarkBlue',
                    tabsStyles: 'px-5 md:px-7 xs:10 sm:11 py-3 flex-grow whitespace-nowrap text-center font-medium text-sm rounded-md text-wwlWhite inline-block focus:ring-0 font-inter font-medium'
                  }}/>
                </div>
                <NotesDrawerForm currentTab={currentTab}/>
                <NotesViewContainer currenTab={currentTab}/>
              </div>
            </div>
          </Transition.Child>
          <div className='flex-shrink-0 w-14' aria-hidden='true'></div>
        </Dialog>
      </Transition.Root>
  );
};

export default NotesDrawer;
import {Dialog, Transition} from '@headlessui/react'
import {MenuIcon, XIcon} from '@heroicons/react/outline'
import Logo from './assets/images/logo.svg'
import FacebookIcon from './assets/icons/facebook.svg'
import InstagramIcon from './assets/icons/instagram.svg'
import SearchBar from "./components/SearchBar";
import SearchIcon from "./assets/icons/search.svg";
import React, {Fragment, useState} from "react";
import {NavLink, useLocation} from 'react-router-dom'

import ExploreIcon from './assets/icons/explore.svg'
import MealPlanningIcon from './assets/icons/meal.svg'
import HeartIcon from './assets/icons/heart.svg'
import AccountIcon from './assets/icons/account.svg'
import FaqIcon from './assets/icons/faq.svg'
import LogoutIcon from './assets/icons/logout.svg'
import FeedbackIcon from './assets/icons/feedback.png'
import SearchBarModal from "./components/SearchBarModal";
import {logout} from "../../redux/user/userThunk";
import {useDispatch} from "react-redux";
import {useMediaQuery} from "react-responsive";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const navigation = [
    {
        name: 'Explore Recipes',
        href: '/explore-recipes?page=1',
        icon: ExploreIcon
    },
    {
        name: 'Meal Planning',
        href: '/meal-planning',
        icon: MealPlanningIcon
    },
    {
        name: 'Saved Recipes',
        href: '/saved-recipes?page=1',
        icon: HeartIcon
    },
    {
        name: 'My Account',
        href: '/profile-settings',
        icon: AccountIcon
    },
    {
        name: 'FAQ',
        href: '/faq',
        icon: FaqIcon
    },
]

if(process.env.REACT_APP_ENV === 'beta') {
    navigation.push({
        name: 'Provide Feedback',
        href: `${process.env.REACT_APP_FEEDBACK_URL}`,
        target: '_blank',
        icon: FeedbackIcon
    })
}

navigation.push(
    {
        name: 'Log out',
        href: '/',
        icon: LogoutIcon
    }
)

export default function WithSearchInColumnLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [searchbarOpen, setSearchbarOpen] = useState(false);
    const [chips, setChips] = useState([]);
    const dispatch = useDispatch()
    const {pathname} = useLocation()

    const handleClick = (e) => {
        if (e.target.innerText === 'Log out') {
            dispatch(logout())
        }
        setSidebarOpen(false);
    }

    const smoothScroll = (e) => {
        e.preventDefault();
        const element = document.getElementById('browse-all-categories')
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    }
    const mediumScreen = useMediaQuery({query: '(min-width: 768px)'})
    return (
        <div>
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as='div' className='fixed inset-0 flex justify-end w-full z-50 md:hidden'
                        onClose={setSidebarOpen}>
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
                            className='absolute min-h-screen flex flex-col max-w-xs w-full bg-wwlWhite overflow-y-auto'>
                            <div className="flex justify-end">
                                <button
                                    type='button'
                                    className='ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'
                                    onClick={() => setSidebarOpen(false)}
                                >
                                    <span className='sr-only'>Close sidebar</span>
                                    <XIcon className='h-6 w-6 text-black dark:text-white' aria-hidden='true'/>
                                </button>
                            </div>
                            <nav className='px-7 pt-4 space-y-1'>
                                {navigation.map((item) => (
                                    <NavLink
                                        key={item.name}
                                        to={item.href}
                                        onClick={(e) => {
                                            handleClick(e)
                                        }}
                                        target={item.name === 'Provide Feedback' ? '_blank' : ''}
                                        className={({isActive}) =>
                                            classNames(
                                                isActive
                                                    ? 'text-black dark:text-white'
                                                    : 'text-gray-500 dark:text-gray-300',
                                                'group flex items-center px-2 py-2 font-normal font-inter rounded-md'
                                            )
                                        }
                                    >
                                        <img src={item.icon} className='mr-4 flex-shrink-0' aria-hidden='true'
                                             alt={'icon'}/>
                                        {item.name}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    </Transition.Child>
                    <div className='flex-shrink-0 w-14' aria-hidden='true'></div>
                </Dialog>
            </Transition.Root>
            {searchbarOpen && !mediumScreen && <SearchBarModal setChips={setChips} chips={chips} className='hidden' setSearchbarOpen={setSearchbarOpen}/>}
            <nav className={"fixed z-50 w-full inset-0 bg-wwlOrange h-20 flex items-center justify-between px-7 print-hide"}>
                <div className={"block md:hidden"}>
                    <img src={SearchIcon} alt="search-icon" className='cursor-pointer' onClick={() => {
                        setSearchbarOpen(true)
                    }}/>
                </div>
                <div>
                    <NavLink to="/home">
                        <img
                            src={Logo}
                            alt="wwl-logo"
                        />
                    </NavLink>
                </div>
                <div className={" hidden md:block grow flex items-center md:grow"}>
                    <div className={"flex items-center grow ml-16"}>
                        <div className={'grow'}>
                            <SearchBar setChips={setChips} chips={chips}/>
                        </div>
                        {
                            pathname === '/home' ?
                                <a href='#browse-all-categories'
                                   className={"ml-7 lg:ml-10 xl:ml-16 mr-10 font-chivo text-wwlWhite font-normal text-base underline decoration-underline"}
                                   onClick={(e) => {
                                       smoothScroll(e)
                                   }}>
                                    Browse All Categories
                                </a> :
                                <NavLink to="/"
                                         className='ml-7 lg:ml-10 xl:ml-16 mr-10 font-chivo text-wwlWhite font-normal text-base underline decoration-underline'>Back
                                    to home</NavLink>
                        }
                    </div>
                </div>
                <div className="flex items-center lg:hidden">
                    <button onClick={() => setSidebarOpen(true)}
                            className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400  focus:outline-none focus:ring-0 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Open menu</span>
                        {sidebarOpen ?
                            <div className="h-6 w-6" aria-hidden="true"/>
                            : <MenuIcon
                                className="block h-6 w-6 text-wwlWhite visible  md:invisible"
                                aria-hidden="true"/>
                        }
                    </button>
                </div>
                <div className="hidden md:block mr-5">
                    <div className={"flex items-center"}>
                        <a
                            href="https://www.facebook.com/groups/workweekpreppers"
                            target="_blank"
                            className="mr-3 focus:outline-none focus:ring-0"
                            rel={'noreferrer'}
                        >
                            <span className="sr-only">Open Facebook Page</span>
                            <img src={FacebookIcon} alt="facebook" className='h-6 w-6'/>
                        </a>
                        <a
                            href="https://www.instagram.com/workweeklunch/"
                            target="_blank"
                            className="focus:outline-none focus:ring-0"
                            rel={'noreferrer'}
                        >
                            <span className="sr-only">Open Instagram Page</span>
                            <img src={InstagramIcon} alt="instagram" className='h-6 w-6'/>
                        </a>
                    </div>
                </div>
            </nav>
        </div>)
}
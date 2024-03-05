import React from 'react';
import {NavLink} from 'react-router-dom'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const LinkButton = ({item, currentItemIndex, setCurrentItem}) => {

    if (item.name === 'Provide Feedback') {
        if(process.env.REACT_APP_ENV === "beta") {
            return (
                <a
                    key={item.name}
                    rel="noreferrer"
                    href={item.href}
                    target={"_blank"}
                    className={classNames(
                        item.current
                            ? ''
                            : 'text-gray-600 hover:text-gray-900 hover:bg-wwlTransparentYellow transition-colors duration-300',
                        'block items-center text-sm font-medium rounded-md'
                    )}
                    onClick={() => {
                        setCurrentItem(item.name)
                    }}
                >
                    <div className={classNames(
                        item.current
                            ? 'border-r-[7px] border-r-wwlYellow bg-wwlTransparentYellow'
                            : 'border-r-[7px] border-r-transparent',
                        `flex flex-col items-center justify-center md:w-full h-28  box-border ${currentItemIndex !== 3 ? 'border-b-[0.5px] border-b-wwlGray' : ''}`
                    )}>
                        <div className="mb-1">
                            <img
                                className='flex-shrink-0 h-6 w-6'
                                aria-hidden="true"
                                src={item.icon}
                                alt="icon"
                            />
                        </div>
                        <div className="text-center px-3">
                            <h1 className={classNames(
                                item.current ? 'font-black' : 'font-normal',
                                'font-chivo text-sm'
                            )}>{item.name}</h1>
                        </div>
                    </div>
                </a>
            )
        }
    } else {
        return (<NavLink
            key={item.name}
            to={item.href}
            className={classNames(
                item.current
                    ? ''
                    : 'text-gray-600 hover:text-gray-900 hover:bg-wwlTransparentYellow transition-colors duration-300',
                'block items-center text-sm font-medium rounded-md'
            )}
            onClick={() => {
                setCurrentItem(item.name)
            }}
        >
            <div className={classNames(
                item.current
                    ? 'border-r-[7px] border-r-wwlYellow bg-wwlTransparentYellow'
                    : 'border-r-[7px] border-r-transparent',
                `flex flex-col items-center justify-center md:w-full h-28  box-border ${currentItemIndex !== 3 ? 'border-b-[0.5px] border-b-wwlGray' : ''}`
            )}>
                <div className="mb-1">
                    <img
                        className='flex-shrink-0 h-6 w-6'
                        aria-hidden="true"
                        src={item.icon}
                        alt="icon"
                    />
                </div>
                <div className="text-center px-3">
                    <h1 className={classNames(
                        item.current ? 'font-black' : 'font-normal',
                        'font-chivo text-sm'
                    )}>{item.name}</h1>
                </div>
            </div>
        </NavLink>)
    }

};

export default LinkButton;
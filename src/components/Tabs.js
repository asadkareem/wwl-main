import React from 'react';
import {BookmarkIcon, HeartIcon} from "@heroicons/react/outline";
const Tabs = ({tabs, setTabs, setCurrentTab, customStyles, setPage, block = false}) => {
    const handleCurrentTab = (e) => {
        const tabName = e.target.dataset.currentTab;

        const newTabs = tabs.map((tab) => {
            if (tab.name === tabName) {
                tab.current = true;
                setCurrentTab(tab.name)
            } else {
                tab.current = false;
            }
            return tab;
        });
        setTabs(newTabs);
        if (setPage) {
            setPage(2);
        }
    }
    return (
        <>
            {
                tabs.map((tab, index) => {
                        return <button
                            data-current-tab={tab.name}
                            key={tab.name}
                            className={block ? `flex items-center justify-center py-1.5 px-6 font-chivo text-sm whitespace-nowrap lg:mb-0 px-4 max-w-sm rounded-lg border-2 transition-colors duration-300 transition-colors duration-300 capitalize ${index === 0 ? tab.current ? 'bg-wwlOrange border-wwlOrange' : 'bg-wwlWhite border-wwlOrange' : tab.current ? 'bg-wwlOrange border-wwlOrange' : 'bg-wwlWhite border-wwlGray500'}`
                                :
                                customStyles ? `${tab.current ? customStyles.currentTab : 'text-wwlGray500'} ${customStyles.tabsStyles}` : `${tab.current ? 'shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)]' : 'text-wwlGray500'} px-7 xs:10 sm:11 py-3 flex-grow text-center mr-4 font-medium text-sm rounded-md inline-block focus:ring-0 font-inter font-medium`}
                            onClick={(e) => {
                                handleCurrentTab(e)
                            }}
                            aria-current={tab.current ? 'page' : undefined}
                        >
                            <span
                                data-current-tab={tab.name}
                                className={block ? `flex items-center gap-2 ${index === 1 ? `
                                ${tab.current ? 'text-wwlWhite' : 'text-wwlGray500'}` : `${tab.current ? 'text-wwlWhite' : 'text-wwlOrange'}`}` : ''}
                            >{index === 0 ? (block &&
                                <HeartIcon className="w-6 h-6" data-current-tab={tab.name}/>) : (block && <BookmarkIcon className="w-6 h-6" data-current-tab={tab.name}/>)}
                                {tab.name}
                            </span>
                        </button>
                    }
                )
            }
        </>
    )
};
export default Tabs;
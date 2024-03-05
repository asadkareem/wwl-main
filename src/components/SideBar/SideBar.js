import {useEffect, useState} from 'react'
import GlobeIcon from './assets/icons/globe.svg'
import MealPlanningIcon from './assets/icons/meal-planning.svg'
import SavedRecipeIcon from './assets/icons/saved-recipe.svg'
import ProfileIcon from './assets/icons/profile.svg'
import FeedbackIcon from './assets/icons/feedback.png'
import LinkButton from './components/LinkButton'
import {NavLink, useLocation} from "react-router-dom";


export default function SideBar() {
  const {pathname} = useLocation()
  const [navigation, setNavigation] = useState(
    [
      {name: 'Explore Recipes', icon: GlobeIcon, href: '/explore-recipes?page=1', current: true},
      {name: 'Meal Planning', icon: MealPlanningIcon, href: '/meal-planning', current: false},
      {name: 'My Saved Recipes', icon: SavedRecipeIcon, href: '/saved-recipes?page=1', current: false},
      {name: 'Provide Feedback', icon: FeedbackIcon, href: `${process.env.REACT_APP_FEEDBACK_URL}`, target:"_blank", current: false},
    ])

  useEffect(() => {
    const updatedNavigation = navigation.map((item) => {
      if (item.href.includes(pathname.split('/')[1])) {
        item.current = true
      } else {
        item.current = false
      }
      return item
    })
    setNavigation(updatedNavigation)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const setCurrentItem = (activeItem) => {
    const updatedNavigation = navigation.map((item) => {
      if (item.name === activeItem) {
        item.current = true
      } else {
        item.current = false
      }
      return item
    })
    setNavigation(updatedNavigation)
  }

  return (
    <div className="min-h-full flex flex-col justify-between border-r border-gray-200 bg-white">
      <nav className="flex-1 bg-white" aria-label="Sidebar">
        {navigation.map((item, index) => (
          <LinkButton item={item} key={item.name} currentItemIndex={index} setCurrentItem={setCurrentItem}/>
        ))}
      </nav>
      <div className="flex-shrink-0 flex justify-center mb-10">
        <NavLink to="/profile-settings">
            <img
              className="inline-block"
              src={ProfileIcon}
              alt=""
            />
        </NavLink>
      </div>
    </div>
  )
}
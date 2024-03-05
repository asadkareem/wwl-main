import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import SignIn from './pages/SignIn/SignIn'
import {ProtectedRoute} from './components/ProtectedRoute'
import CreateMealPlan from './pages/CreateMealPlan/CreateMealPlan'
import RecipeDetail from './pages/RecipeDetail/RecipeDetail'
import Home from './pages/Home/Home'
import MealPlanning from './pages/MealPlanning/MealPlanning'
import MyMealPlans from './pages/MyMealPlans/MyMealPlans'
import ExploreRecipes from './pages/ExploreRecipes/ExploreRecipes'
import SavedRecipes from './pages/SavedRecipes/SavedRecipes'
import SearchResult from './pages/SearchResult/SearchResult'
import WWLMealPlan from './pages/WWLMealPlans/WWLMealPlans'
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
import Faq from "./pages/Faq/Faq";
import Page404 from "./components/Page404";
import {setIsTouchScreen} from "./redux/navigation/navigationSlice";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import ShoppingList from "./pages/ShoppingList/ShoppingList";
import UneditableMealPlanView from "./pages/UneditableMealPlanView/UneditableMealPlanView";
import BookmarkRecipes from "./pages/BookmarkRecipes/BookmarkRecipes";
// import ErrorPage from './pages/ErrorPage/ErrorPage'

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <SignIn/>
        )
    },
    {
        path: '/home',
        element: (
                <ProtectedRoute>
                    <Home/>
                </ProtectedRoute>
        )
    },
    {
        path: '/search',
        element: (
            <ProtectedRoute>
                <SearchResult/>
            </ProtectedRoute>
        )
    },
    {
        path: '/profile-settings',
        element: (
            <ProtectedRoute>
                <ProfileSettings/>
            </ProtectedRoute>
        )
    },
    {
        path: "shopping-list",
        element: (<ShoppingList/>)
    },
    {
        path: '/saved-recipes',
        element: (
            <ProtectedRoute>
                <SavedRecipes/>
            </ProtectedRoute>
        )
    },
    {
        path: '/bookmark-recipes',
        element: (
          <ProtectedRoute>
              <BookmarkRecipes/>
          </ProtectedRoute>
        )
    },
    {
        path: '/recipe-detail/:id',
        element: (
            <ProtectedRoute>
                <RecipeDetail/>
            </ProtectedRoute>
        )
    },
    {
        path: '/explore-recipes',
        element: (
            <ProtectedRoute removeMaxWidth={true}>
                <ExploreRecipes/>
            </ProtectedRoute>
        )
    },
    {
        path: '/browse-all-categories',
        element: (
            <ProtectedRoute>
                <ExploreRecipes/>
            </ProtectedRoute>
        )
    },
    {
        path: '/meal-planning',
        element: (
            <ProtectedRoute/>
        ),
        children: [
            {
                index: true,
                element: (
                    <MealPlanning/>
                )
            },
            {
                path: "wwl-plans",
                element: (
                    <WWLMealPlan/>
                )
            },
            {
                path: "my-meal-plans",
                element: (
                    <MyMealPlans/>
                )
            },
            {
                path: "meal-planner",
                element: (
                    <CreateMealPlan/>
                )
            }
        ]
    },
    {
        path: '/this-weeks-meal-plan',
        element: (
            <ProtectedRoute>
                <UneditableMealPlanView/>
            </ProtectedRoute>
        )
    },
    {
        path: '/faq',
        element: (
            <ProtectedRoute>
                <Faq/>
            </ProtectedRoute>
        )
    },
    {
        path: '*',
        element: (
            <Page404/>
        )
    }
])

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setIsTouchScreen('ontouchstart' in window))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return <RouterProvider router={router}/>
}

export default App

//TODO : videoplayer component is redundant

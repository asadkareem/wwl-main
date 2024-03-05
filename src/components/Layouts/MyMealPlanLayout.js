import React, {useState} from 'react';
import NavigationLink from "../NavigationLink";
import {ArrowLeftIcon, PlusIcon} from "@heroicons/react/outline";
import PageWithTableLayout from "./PageWithTableLayout";
import MealPlanRow from "../DataTable/components/MealPlanRow";
import {useLocation} from "react-router-dom";
import {useDataWithPagination} from "../../utilis/customHooks";
import {useSelector} from "react-redux";
import {selectLoading} from "../../redux/loader/loaderSlice";
import Loader from "../Loader";
import Button from "../Button";
import {hasMealPlaner} from "../../redux/user/userSlice";
import GoProModal from "../GoProModal";

const MyMealPlanLayout = ({pageTitle, getMealPlan, selectStatus, selectMealPlan, additionalParam = ''}) => {
    const hasMealPlanPermission = useSelector(hasMealPlaner);
    const {items, setPageNumber} = useDataWithPagination(getMealPlan, selectStatus, selectMealPlan)
    const [modalOpen, setModalOpen] = useState(false)
    const [headers, setHeaders] = useState([
                {
                    title: "Title",
                    filterDirection: "asc",
                    filterActive: false,
                    visibleOnMobile: false,
                },
                {
                    title: "Date Created",
                    filterDirection: "asc",
                    filterActive: false,
                    visibleOnMobile: false,
                },
                {
                    title: "Recipes Included",
                    filterDirection: "asc",
                    filterActive: false,
                    visibleOnMobile: false,
                },
                {
                    title: "Past Meal Plans",
                    filterDirection: "asc",
                    filterActive: false,
                    visibleOnMobileOnly: true,
                },
            ]
        )
    ;
    const {pathname} = useLocation();
    const loading = useSelector(selectLoading)
    if (loading) {
        return <Loader/>
    }
    return (
        <div className='mt-10'>
            <NavigationLink LinkIcon={ArrowLeftIcon} linkText={pathname} btnType={'backBtn'}
                            extraClasses='bg-wwlWhite text-wwlOrange hover:border-wwlOrange hover:bg-wwlOrange hover:text-wwlWhite px-4 border border-wwlOrange ml-8'/>
            <div className='rounded-2xl mt-16 bg-wwlWhite py-8 p-6'>
                <div className='px-5  mb-10 flex lg:items-center justify-between items-start flex-col lg:flex-row'>
                    <div>
                        <h1 className='font-chivo text-4xl text-wwlBlack font-bold mb-2'>{pageTitle}</h1>
                    </div>
                    <div className='lg:ml-10 mt-6 mb-6 lg:my-0'>
                        {hasMealPlanPermission ? <NavigationLink url={'/meal-planning/meal-planner'} LinkIcon={PlusIcon}
                                                                 linkText='Create New Plan'
                                                                 extraClasses='bg-wwlOrange text-wwlWhite border-transparent hover:border-wwlOrange hover:bg-wwlWhite hover:text-wwlOrange px-4'/> :
                            <Button BtnIcon={PlusIcon} btnText='Create New Plan'
                                    iconExtraClasses='h-4 inline-block mr-2'
                                    extraClasses='border rounded-lg mt-3 bg-wwlOrange text-wwlWhite border-transparent hover:border-wwlOrange hover:bg-wwlWhite hover:text-wwlOrange py-1.5 px-3 text-sm transition-colors duration-300'
                                    onClick={e => {
                                        setModalOpen(true)
                                    }}/>}
                    </div>
                </div>
                <PageWithTableLayout headers={headers} setHeaders={setHeaders} TableRow={MealPlanRow}
                                     items={items?.mealplans} pagination={items?.pagination}
                                     setPageNumber={setPageNumber} additionalParam={additionalParam}/>
                <GoProModal setOpen={setModalOpen} open={modalOpen}/>
            </div>
        </div>
    );
};

export default MyMealPlanLayout;
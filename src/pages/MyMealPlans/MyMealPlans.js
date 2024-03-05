import React from 'react';
import MyMealPlanLayout from "../../components/Layouts/MyMealPlanLayout";
import {getUserMealPlan} from "../../redux/mealPlan/mealPlanThunk";
import {selectCurrentMealPlan, selectStatus} from "../../redux/mealPlan/mealPlanSlice";

const MyMealPlans = () => {
    return (
        <MyMealPlanLayout  pageTitle='My Meal Plans' getMealPlan={getUserMealPlan} selectStatus={selectStatus} selectMealPlan={selectCurrentMealPlan}
                          additionalParam='&type=user'/>
    );
};

export default MyMealPlans;
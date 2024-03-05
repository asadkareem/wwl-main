import React from 'react';
import MyMealPlanLayout from "../../components/Layouts/MyMealPlanLayout";
import {selectWwlMealPlans, selectStatus} from "../../redux/mealPlan/mealPlanSlice";
import {getWwlMealPlans} from "../../redux/mealPlan/mealPlanThunk";

const WWLMealPlans = () => {
    return (
      <MyMealPlanLayout  pageTitle='WWL Meal Plans' selectMealPlan={selectWwlMealPlans} selectStatus={selectStatus} getMealPlan={getWwlMealPlans}/>
    );
};

export default WWLMealPlans;
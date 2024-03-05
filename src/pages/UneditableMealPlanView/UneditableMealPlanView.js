import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import MealPlanPageLayout from "../../components/Layouts/MealPlanPageLayout";
import {useDispatch} from "react-redux";
import {fillSelectionData} from "../../redux/user/userThunk";
import {setLoading} from "../../redux/loader/loaderSlice";

const UneditableMealPlanView = () => {
    const dispatch = useDispatch();

    const [params] = useSearchParams();
    const id = params.get("mp")

    useEffect(() => {
        dispatch(setLoading(true))

        async function fetchData() {
            if (id) {
                await dispatch(fillSelectionData(id));
            }
            dispatch(setLoading(false))
        }

        fetchData().catch(e => console.log(e));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])

    return (
        <MealPlanPageLayout />
    );
};

export default UneditableMealPlanView;
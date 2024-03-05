import React, {useEffect, useState} from 'react';
import {useSearchParams} from "react-router-dom";
import Button from "../../components/Button";
import SaveMealPlanModal from "./components/SaveMealPlanModal";
import MealPlanPageLayout from "../../components/Layouts/MealPlanPageLayout";
import {useDispatch, useSelector} from "react-redux";
import {deleteSelectionData, selectSelectionDetails} from "../../redux/user/userSlice";
import {fillSelectionData} from "../../redux/user/userThunk";
import {setLoading} from "../../redux/loader/loaderSlice";
import {mealTimes} from "../../utilis/generalUtilis";
import {updateMealPlan} from "../../redux/mealPlan/mealPlanThunk";

const CreateMealPlan = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const [mealPlanSaved, setMealPlanSaved] = useState(false);
    const selectionDetails = useSelector(selectSelectionDetails);

    const [params] = useSearchParams();
    const id = params.get("mp")
    const type = params.get("type")
    const subTitle = params.get('t')
    const handleModalOpening = async () => {
        if (id && type === 'user') {
            await dispatch(updateMealPlan({id, plan_data: selectionDetails}));
            setOpen(true)
            setMealPlanSaved(true)
        } else {
            setOpen(true)
            setMealPlanSaved(false)
        }
    }

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
        <MealPlanPageLayout primaryHeading='Create Your Own Meal Plan' subHeading={subTitle || 'Unsaved Meal Plan'}
                            handleModalOpening={handleModalOpening}>
            <SaveMealPlanModal open={open} setOpen={setOpen} mealPlanSaved={mealPlanSaved}
                               setMealPlanSaved={setMealPlanSaved} subHeading={subTitle || 'Unsaved Meal Plan'}/>
            <div className='flex gap-2 grow sm:grow-0 order-last sm:order-first'>
              <Button btnText='Clear All' smallButton={false}
                      extraClasses='rounded-lg px-5 border border-wwlOrange text-wwlOrange hover:text-wwlWhite hover:bg-wwlOrange'
                      onClick={() => {
                        dispatch(deleteSelectionData(mealTimes))
                      }
                      }/>
              <Button btnText='Save' btnFilled={true} smallButton={false}
                      extraClasses='rounded-lg border border-transparent bg-wwlOrange text-wwlWhite hover:bg-wwlWhite hover:border-wwlOrange hover:text-wwlOrange'
                      onClick={() => {
                        handleModalOpening().catch(e => console.log(e))
                      }}/>
            </div>
        </MealPlanPageLayout>
    );
};

export default CreateMealPlan;
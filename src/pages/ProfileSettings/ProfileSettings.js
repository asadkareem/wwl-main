import Button from "../../components/Button";
import ProfileListItem from "./components/ProfileListItem";
import {data} from "./assets/data";
import {Link} from "react-router-dom";
import {LogoutIcon} from "@heroicons/react/outline";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/user/userThunk";
import {selectUser} from "../../redux/user/userSlice";
import {updateCurrentUserPreferences} from "../../redux/user/userThunk";
import Loader from "../../components/Loader";
import {selectLoading, setLoading} from "../../redux/loader/loaderSlice";
import {toast} from "react-hot-toast";

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);

  const handleSavePreferences = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    let payload = {
      unit_preference: user.unitPreference,
      primary_diet: user.primaryDiet,
      is_gluten_free: user.isGlutenFree,
      is_dairy_free: user.isDairyFree,
      userId: user.currentUser._id
    }
    dispatch(updateCurrentUserPreferences(payload))
    toast.success('Preferences updated successfully')
    dispatch(setLoading(false))
  }

  if (loading) {
    return <Loader/>
  }

  return (
    <div className="m-1 bg-white rounded-xl p-5 mt-10">
      <p className="font-inter text-wwlBlack text-center my-5 text-lg">Change your email, password, credit card info, or
        membership settings here.</p>
      <div className="flex justify-center items-center gap-3">
        <a href={process.env.REACT_APP_MEMBERFUL_REDIRECT_URL} target={'_blank'} rel={'noreferrer'}
           className='px-4 py-2 inline-block text-white font-inter bg-wwlOrange hover:text-wwlOrange hover:bg-wwlWhite hover:border-wwlOrange  rounded-lg border border-transparent block w-fit text-sm'>Manage
          Account</a>
        <Button
          btnFilled={true}
          iconExtraClasses='inline hover:text-wwlOrange'
          btnText={'Logout'}
          BtnIcon={LogoutIcon}
          smallButton={true}
          extraClasses="text-white font-inter bg-wwlOrange rounded-lg border border-wwlOrange w-fit"
          onClick={() => {
            dispatch(logout())
          }}/>
        <a href={`${process.env.REACT_APP_FEEDBACK_URL}`} target={'_blank'} rel={'noreferrer'}
           className='px-4 py-2 inline-block text-white font-inter bg-wwlOrange hover:text-wwlOrange hover:bg-wwlWhite hover:border-wwlOrange  rounded-lg border border-transparent block w-fit text-sm'>Feedback</a>
        <div className="order-1 md:order-2">
          <Button btnText="Save"
                  btnFilled={true}
                  smallButton={true}
                  extraClasses="text-white font-inter bg-wwlOrange rounded-lg border border-wwlOrange w-fit"
                  onClick={(e) => {
                    handleSavePreferences(e)
                  }}/>
        </div>

      </div>
      <form>
        {data && data.map((item, index) => {
          return <ProfileListItem key={index}
                                  data={item}
                                  user={user}>
          </ProfileListItem>
        })}
        <div className="flex flex-col sm:flex-row justify-center md:justify-between items-center mt-6 px-5 gap-3">
          <Link to={'/faq'}
                className="font-semibold font-xs text-wwlGray700 hover:text-wwlOrange transition duration-150 ease-out hover:ease-in max-w-sm order-1 text-center md:text-left">Have
            a question, or looking for prepping advice? Check Out our FAQ</Link>
        </div>
      </form>
    </div>
  )
}
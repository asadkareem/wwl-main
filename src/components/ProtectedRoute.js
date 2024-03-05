import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import SideBar from "./SideBar/SideBar";
import TopBar from "./TopBar/TopBar";
import {Toaster} from "react-hot-toast";
import {
  selectCurrentUser,
  updateClickedOutside,
} from "../redux/user/userSlice";
import {getAllTags} from "../redux/tags/tagThunk";
import IntroductionModal from "../pages/Home/components/IntroductionModal";
import ErrorBoundry from "../ErrorBoundry";

export const ProtectedRoute = ({removeMaxWidth, children}) => {
  const location = useLocation().pathname;
  localStorage && localStorage.setItem("lastLocation", location);

  const currentUser = useSelector(selectCurrentUser) || null;

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const backgroundUrl = window.location.origin + "/assets/Background.png";

  const isAuthenticated = currentUser !== null;

  useEffect(() => {
    document.getElementById("scroll-to-top")?.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (event.target.closest(`.menu-parent`) === null) {
        dispatch(updateClickedOutside(true));
      } else {
        dispatch(updateClickedOutside(false));
      }
    }

    if (isAuthenticated) {
      dispatch(getAllTags());
    }

    // Adding click event listener
    document.addEventListener("click", handleOutsideClick);
    setOpen(localStorage.getItem("has_seen_intro") === null);
    return () => document.removeEventListener("click", handleOutsideClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return isAuthenticated ? (
    <>
      <div className="flex flex-col h-screen">
        <TopBar/>
        <div className="flex grow mt-20 sm:overflow-hidden">
          <div
            className="h-full hidden z-50 md:block self-start w-28 shadow-[0px_4px_8px_3px_rgba(0,0,0,0.15),0px_1px_3px_rgba(0,0,0,0.3)] min-w-[116px]
          "
          >
            <SideBar/>
          </div>
          <div
            className="fixed inset-0 h-screen w-screen -z-10"
            style={{backgroundImage: `url(${backgroundUrl})`}}
          ></div>
          <div
            className={`flex w-full justify-center sm:overflow-y-scroll print-overflow-y`}
            id="scroll-to-top"
          >
            <div className={`${removeMaxWidth ? "" : "max-w-6xl"} w-full`}>
              <ErrorBoundry>{children ? children : <Outlet/>}</ErrorBoundry>
            </div>
          </div>
        </div>
        <div>
          <Toaster position="bottom-center"/>
        </div>
      </div>
      <IntroductionModal open={open} setOpen={setOpen}/>
    </>
  ) : (location.includes('recipe-detail') ? <ErrorBoundry>{children ? children : <Outlet/>}</ErrorBoundry> :
    <Navigate to="/" replace/>)
};

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../../redux/user/userThunk";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { selectCurrentStatus } from "../../../redux/user/userSlice";
import AvocadoImg from '../../../assets/avocado.png'
import { Circles } from "react-loader-spinner";
import { v4 as uuid } from "uuid";

const MEMBERFUL_CLIENT_ID = process.env.REACT_APP_MEMBERFUL_CLIENT_ID;
const MEMBERFUL_OAUTH_URL = process.env.REACT_APP_MEMBERFUL_OAUTH_URL;

export default function ErrorComponent() {
  const { currentUser } = useSelector((state) => state.user);
  const status = useSelector(selectCurrentStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [registerUser, setRegisterUser] = useState(false);
  const [error] = useState("");

  useEffect(() => {
    if (searchParams.get("action") === "logout") {
      dispatch(logout());
    } else {
      const code = searchParams.get("code");
      const state = searchParams.get("state");
      if (code) {
        dispatch(login({ authCode: code, state }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const response_type = "code";
    const client_id = MEMBERFUL_CLIENT_ID;
    const state = uuid();
    localStorage.setItem("state", state);
    const url = `https://${MEMBERFUL_OAUTH_URL}?response_type=${response_type}&client_id=${client_id}&state=${state}`;
    window.location.href = url;
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <>
      <div className="flex min-h-full w-full xs:max-w-lg flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mt-8 sm:mx-auto sm:w-full">
          <div className="bg-white py-8 px-8 rounded-lg shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] sm:rounded-lg sm:px-10">
            <div className="sm:mx-auto sm:w-full sm:max-w-md flex flex-col items-center">
              <h2 className="mt-6 font-bold text-center text-3xl tracking-tight text-wwlBlack">
                Welcome to WWL!
              </h2>
              <img className="py-6" alt='logo' src={AvocadoImg} />
              <p className="font-chivo my-3 mb-6 text-center text-sm text-gray-600">
                We are having some issues right now, and are down for
                maintenance... We will be back soon!
              </p>
            </div>{" "}
          </div>
        </div>
      </div>
    </>
  );
}

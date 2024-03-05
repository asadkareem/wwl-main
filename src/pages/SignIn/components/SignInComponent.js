import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from '../../../redux/user/userThunk'
import { useNavigate } from 'react-router-dom'
import { useSearchParams } from "react-router-dom";
import { selectCurrentStatus } from "../../../redux/user/userSlice";
import { Circles } from "react-loader-spinner";
import { v4 as uuid } from 'uuid';

const MEMBERFUL_CLIENT_ID = process.env.REACT_APP_MEMBERFUL_CLIENT_ID;
const MEMBERFUL_OAUTH_URL = process.env.REACT_APP_MEMBERFUL_OAUTH_URL;

export default function SignInComponent() {
  const { currentUser } = useSelector((state) => state.user)
  const status = useSelector(selectCurrentStatus)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [registerUser, setRegisterUser] = useState(false)
  const [error] = useState('')

  useEffect(() => {
    // if (searchParams.get('action') === 'logout') {
    //   dispatch(logout())
    // } else {
    //   const code = searchParams.get('code');
    //   const state = searchParams.get('state')
    //   if (code) {
    dispatch(login({}))
    //   }
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleSubmit = (e) => {
    // e.preventDefault()
    // const response_type = 'code';
    // const client_id = MEMBERFUL_CLIENT_ID;
    // const state = uuid();
    // localStorage.setItem('state', state);
    // const url = `https://${MEMBERFUL_OAUTH_URL}?response_type=${response_type}&client_id=${client_id}&state=${state}`;
    // window.location.href = url;
    navigate('/home')
  }

  useEffect(() => {
    if (currentUser && localStorage.getItem('lastLocation') && localStorage.getItem('lastLocation').startsWith('/recipe-detail')) {
      navigate(localStorage.getItem('lastLocation'))
    } else if (currentUser) {
      navigate('/home')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  return (
    <>
      <div className='flex min-h-full w-full xs:max-w-lg flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <div className='mt-8 sm:mx-auto sm:w-full'>
          <div
            className='bg-white py-8 px-8 rounded-lg shadow-[rgba(100,100,111,0.2)_0px_7px_29px_0px] sm:rounded-lg sm:px-10'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
              <h2 className='mt-6 font-bold text-center text-3xl tracking-tight text-wwlBlack'>Welcome to WWL</h2>
              <p className='font-chivo my-3 mb-6 text-center text-sm text-gray-600'>
                Sign in to continue to our app.
              </p>
            </div>
            <form className='space-y-3'>
              <div className='pt-3'>
                <button
                  onClick={(e) => {
                    handleSubmit(e)
                  }}
                  type='submit'
                  className={`${status === 'logging-in' ? 'flex w-full justify-center' : 'flex w-full justify-center rounded-md border border-wwlOrange bg-wwlWhite py-2.5 px-4 text-sm font-medium text-wwlOrange shadow-sm hover:bg-wwlOrange hover:text-wwlWhite hover:border-wwlOrange focus:outline-none focus:ring-0'} `}
                >
                  {status === 'logging-in' ? <Circles
                    height="40"
                    width="40"
                    color="#FF644C"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  /> : "Sign in"}
                </button>
              </div>
            </form>

            <div className='mt-6'>
              <div className='w-full text-sm text-red-500 text-center pb-2 flex-col'>
                {/*<div>{auth && auth.error !== "" ? auth.error : ""}</div>*/}
                <div>{error}</div>
              </div>
              <div className='w-full text-xs text-gray-900 text-center'>
                {registerUser ?
                  <div className='font-chivo'>Already have an account? <span onClick={() => setRegisterUser(false)}
                    className='font-bold cursor-pointer hover:text-wwlOrange'>Sign In</span>
                  </div>
                  :
                  <div className='font-chivo'>Don't have an account? <a
                    href={`${process.env.REACT_APP_REGISTER_URL}`}
                    className='font-bold cursor-pointer hover:text-wwlOrange'>Click here to Register</a>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
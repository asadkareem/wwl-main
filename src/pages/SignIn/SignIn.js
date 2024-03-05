import React from 'react'
import SignInComponent from './components/SignInComponent'
import {Toaster} from "react-hot-toast";

const SignIn = () => {
  return (
    <div style={{backgroundImage: "url('assets/Background.png')"}}
         className='flex flex-col px-10 justify-start h-screen  items-center'>
      <SignInComponent/>
      <div>
        <Toaster
          position="bottom-center"
        />
      </div>
    </div>
  )
}

export default SignIn
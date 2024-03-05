import React from 'react'
import NavigationLink from "./NavigationLink";

export default function Page404() {
  return (
    <div className='flex h-screen items-center justify-center text-textWhite p-6'>
      <div className='fixed inset-0 h-screen w-screen -z-10'
           style={{backgroundImage: "url('/assets/Background.png')"}}></div>
      <div className='bg-wwlWhite p-6 text-black text-center rounded-xl shadow-wwlDefault'>
        <div className='text-4xl font-bold pb-3 font-chivo text-wwlOrange'>404</div>
        <div className='p-3 pb-6 font-chivo'>Sorry, this page could not be found.</div>
        <NavigationLink url={'/home'}  linkText='Back to Home Page' extraClasses='text-wwlWhite bg-wwlOrange rounded-lg mb-4 border border-transparent hover:text-wwlOrange hover:bg-transparent hover:border-wwlOrange'/>
      </div>
    </div>
  )
}
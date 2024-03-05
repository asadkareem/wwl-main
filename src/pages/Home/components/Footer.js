import React from 'react';
import NavigationLink from "../../../components/NavigationLink";

const Footer = () => {
  return (
    <div className='px-6 py-14 bg-wwlDarkBlue flex flex-col items-center'>
      <h1 className='text-center font-chivo font-black text-4xl text-wwlGreen mb-2'>Still not inspired?</h1>
      <p className='text-center font-chivo text-base font-normal text-wwlWhite mb-10 max-w-2xl mx-auto'>Let us handle the planning for you! Check out our custom weekly meal plan that we curate each week by clicking below, or join our WWL Meal Preppers Facebook Group to gain inspo from fellow program members! </p>
      <div className='flex flex-col sm:flex-row'>
        <a href='https://www.facebook.com/groups/workweekpreppers' target='_blank' className='whitespace-nowrap rounded-lg py-2 px-4 font-chivo text-sm border transition-colors duration-300 text-wwlDarkBlue bg-wwlWhite rounded-lg border border-transparent hover:text-wwlWhite hover:bg-transparent hover:border-wwlWhite mr-0 sm:mr-2 mb-4 sm:mb-0' rel={'noreferrer'}>Join the Facebook Group</a>
        <NavigationLink url={'/meal-planning/wwl-plans?plan=featured'}  linkText='Check out this week’s plan' extraClasses='text-wwlWhite bg-wwlOrange rounded-lg border border-transparent hover:text-wwlOrange hover:bg-transparent hover:border-wwlOrange ml-0 sm:ml-2'/>
      </div>
    </div>
  );
};

export default Footer;
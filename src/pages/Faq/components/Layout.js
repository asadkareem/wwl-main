import React from 'react';
import Link from "./Link";

const Layout = ({sectionTitle, items}) => {
  return (
    <div className='p-4 mb-10'>
      <h1 className='text-4xl font-chivo text-wwlBlack text-center mb-8 font-bold'>{sectionTitle}</h1>
      {
        items.map((item, index) => {
          return (
            <Link key={index} title={item.title} link={item.url} Icon={item.icon}/>
          )
        })
      }
    </div>
  );
};

export default Layout;
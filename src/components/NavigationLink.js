import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";

const NavigationLink = ({linkText, url, linkSubText, LinkIcon, extraClasses, iconExtraClasses, btnType, target, disabled}) => {
  const navigate = useNavigate();
  const [btnText, setBtnText] = useState(linkText);

  useEffect(() => {
    if (btnType === 'backBtn') {
      const splitLinkText = btnText.split('/').splice(1)[0];
      const splitLinkText2 = splitLinkText.split('-').join(' ');
      const finalText = `Back to ${splitLinkText2}`
      setBtnText(finalText)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linkText]);


  if (btnType === 'backBtn') {
    return (
      <button
        className={`${extraClasses} transition-colors duration-300 whitespace-nowrap rounded-lg py-2 px-4 font-chivo text-sm border  capitalize`}
        onClick={() => navigate(-1)}
      >{LinkIcon && <LinkIcon className={`${iconExtraClasses} h-4 inline-block mr-1`}/>}{btnText} <span
        className='hidden lg:inline-block'>{linkSubText}</span></button>
    )
  } else {
    return (
      <Link
        to={url}
        className={`${extraClasses} transition-colors duration-300 whitespace-nowrap rounded-lg py-2 px-4 font-chivo text-sm border`}
        target={target}
        style={disabled ? {pointerEvents: "none", backgroundColor: "#E4E7EC", color: "#D0D5DD"} : null}
      >{LinkIcon && <LinkIcon className={`${iconExtraClasses} h-4 inline-block mr-1`}/>}{linkText} <span
        className='hidden lg:inline-block'>{linkSubText}</span></Link>
    )
  }
};

export default NavigationLink;
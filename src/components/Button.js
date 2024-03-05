import React from "react";
import PropTypes from "prop-types";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Button = ({
  pngIcon,
  btnText,
  BtnIcon,
  btnFilled,
  addMarginBottom,
  smallButton,
  extraClasses,
  iconExtraClasses,
  iconPositionRight,
  textClasses = "",
  isTouchScreen = false,
  ...otherProps
}) => {
  return (
    <div className={`${smallButton ? "w-fit" : "w-full"} flex justify-center`}>
      <button
        className={classNames(
          BtnIcon ? "flex items-center justify-center py-2 px-4" : "py-2",
          `font-chivo text-sm ${addMarginBottom ? "mb-4" : ""}
          max-w-sm ${extraClasses ? extraClasses : ""} 
          ${
            btnFilled
              ? `border-2 border-transparent "bg-wwlOrange" ${
                  !isTouchScreen &&
                  "hover:bg-transparent  hover:text-wwlOrange hover:border-wwlOrange"
                } text-wwlWhite`
              : ""
          } whitespace-nowrap lg:mb-0 ${
            smallButton ? "px-4" : "w-full px-8"
          } transition-colors duration-300 capitalize`
        )}
        {...otherProps}
      >
        {!iconPositionRight && btnText}
        {pngIcon && (
          <img className="inline-block mr-2" src={pngIcon} alt="icon" />
        )}
        {BtnIcon && (
          <BtnIcon
            className={`w-5 mr-2 ${
              iconExtraClasses ? iconExtraClasses : "text-wwlOrange"
            }`}
          />
        )}
        <span className={`${textClasses} align-middle inline-block`}>
          {iconPositionRight && btnText}
        </span>
      </button>
    </div>
  );
};

// Props Validation
Button.propTypes = {
  btnFilled: PropTypes.bool,
  smallButton: PropTypes.bool,
  iconPositionRight: PropTypes.bool,
};

Button.defaultProps = {
  btnFilled: false,
  smallButton: false,
  iconPositionRight: true,
};

export default Button;

import { createRef, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import RadioButton from './components/RadioButton';
import ServingCount from './components/ServingCount';
import ToolTip from '../ToolTip';
import SwitchButton from '../SwitchButton';
import { selectIsTouchScreen } from '../../redux/navigation/navigationSlice';
import { useSelector } from 'react-redux';

export default function DropDownMenu({
  show,
  setShow,
  options,
  changeHandler,
  counterMenu,
  recipe,
  itemIndex,
  otherProps,
  rowIndex,
}) {
  // REDUX
  const { title, increment, decrement, count, PrimaryIcon, setCount } =
    otherProps;
  const radioRef = createRef();
  const isTouchScreen = useSelector(selectIsTouchScreen);
  return (
    <div id="menu-parent">
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button
          className={`${
            counterMenu
              ? `bg-wwlTransparent py-[2px] border border-wwlOrange text-wwlOrange ${
                  !isTouchScreen &&
                  'hover:text-wwlWhite hover:bg-wwlOrange hover:border-transparent'
                } px-2`
              : ''
          } font-hind rounded-md text-sm  xl:text-base transition-colors duration-300 focus:outline-none focus:ring-0`}
          onClick={() => {
            setShow(!show);
          }}
        >
          {!counterMenu && (
            <ToolTip content="Select Diet Type">
              <img
                src={PrimaryIcon}
                alt=""
                className="w-8 h-8 rounded-full border-2 cursor-pointer bg-wwlWhite border-wwlYellow p-1"
              />
            </ToolTip>
          )}
          {counterMenu && (
            <span className={`${count < 10 ? 'mr-1' : ''}`}>{count}</span>
          )}
          {title}
        </Menu.Button>
        <Transition
          show={show}
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`origin-top-left absolute ${
              rowIndex === 2 ? 'right-0' : '-left-1/2'
            } transform -translate-1/2 mt-2 px-3 rounded-md shadow-wwlDragDropShadow bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none`}
          >
            <div className="py-2">
              {counterMenu ? (
                <Menu.Item>
                  <ServingCount
                    setCount={setCount}
                    count={count}
                    increment={increment}
                    rowIndex={rowIndex}
                    setShow={setShow}
                    decrement={decrement}
                    recipe={recipe}
                    itemIndex={itemIndex}
                  />
                </Menu.Item>
              ) : (
                options.map((option, index) => {
                  return (
                    <div key={option.value}>
                      {index < 3 ? (
                        <Menu.Item>
                          {({ active }) => (
                            <RadioButton
                              ref={radioRef}
                              option={option}
                              handleChange={changeHandler}
                            />
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          <div className="px-4 mb-2">
                            <SwitchButton
                              customizedOption={option}
                              isSmall={true}
                              changeHandler={changeHandler}
                              updateReduxState={false}
                              veganOption={options[2].selected}
                            />
                          </div>
                        </Menu.Item>
                      )}
                      {index === 2 && (
                        <div className="px-4 py-2">
                          <hr className="border border-wwlOrange" />
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

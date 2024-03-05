import {Fragment} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, SelectorIcon} from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const options = [
  {
    id: 1,
    name: "Rating"
  },
  {
    id: 2,
    name: "Cook Time"
  },
  {
    id: 3,
    name: "Prep Time"
  },
  {
    id: 4,
    name: "Date"
  }
]

const sortOptions = [
  {
    id: 1,
    name: "Ascending",
    value: "asc"
  },
  {
    id: 2,
    name: "Descending",
    value: "desc"
  }
]
export default function SortingFiltersMenu({
                                             selected,
                                             setSelected,
                                             label = "Apply Filters",
                                             extraClasses="",
                                             selectedSort,
                                             setSelectedSort
                                           }) {
  return (
    <div className='flex gap-0 sm:gap-3 justify-center px-6 flex-wrap my-4'>
      <Listbox value={selected} onChange={setSelected}>
        {({open}) => (<>
          <div className={`mt-1 w-full flex sm:block sm:w-[250px] relative flex-wrap gap-3 items-center justify-center ${extraClasses}`}>
            <div className={"text-center"}>
              <Listbox.Label className="font-chivo text-base sm:text-lg">{label}</Listbox.Label>
            </div>
            <Listbox.Button
              className={`mb-2 mt-1 border text-wwlGray500 rounded-xl w-3/5 sm:w-full px-3 pt-2 pb-2.5 focus:outline-none focus:ring-0 border-wwlGray300 focus:border-wwlGray400 text-left flex items-center justify-between bg-wwlWhite grow sm:grow-0`}>
              <span className="block truncate">{selected?.name}</span>
              <span className="pointer-events-none">
                        <div className="flex items-center">
                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                        </div>
                    </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={`absolute z-40 mt-1 left-36 sm:left-auto w-3/5 sm:w-full bg-white shadow-wwlDragDropShadow max-h-48 rounded-md text-base ring-1 ring-black ring-opacity-5 scrollbar scrollbar-thin scrollbar-thumb-wwlOrange scrollbar-track-wwlGray200 focus:outline-none sm:text-sm top-full`}>
                {options.map((option, index) => (<Listbox.Option
                  key={option.id}
                  className={({active}) => classNames(active ? 'text-wwlOrange' : 'text-gray-900', `cursor-pointer select-none relative py-2.5 pl-3 pr-9 ${index !== options.length - 1 ? 'border-b border-b-gray-100' : ''} `)}
                  value={option}
                >
                  {({selected, active}) => (<>
                        <span
                          className={classNames(selected ? 'text-base' : 'text-sm', 'block truncate font-normal font-chivo')}>
                          {option.name}
                        </span>


                    {selected ? (<span
                      className={classNames(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}
                    >
                            <CheckIcon className="h-5 w-5 text-wwlOrange" aria-hidden="true"/>
                          </span>) : null}
                  </>)}
                </Listbox.Option>))}
              </Listbox.Options>
            </Transition>
          </div>
        </>)}
      </Listbox>

      <Listbox value={selected} onChange={setSelectedSort}>
        {({open}) => (<>
          <div className={`mt-1 w-full flex sm:block sm:w-[250px] relative flex-wrap gap-3 items-center justify-center ${extraClasses}`}>
            <div className={"text-center"}>
              <Listbox.Label className="font-chivo text-base sm:text-lg">Apply Sorting</Listbox.Label>
            </div>
            <Listbox.Button
              className={`mb-2 mt-1 border text-wwlGray500 rounded-xl w-3/5 sm:w-full px-3 pt-2 pb-2.5 focus:outline-none focus:ring-0 border-wwlGray300 focus:border-wwlGray400 text-left flex items-center justify-between bg-wwlWhite grow sm:grow-0`}>
              <span className="block truncate">{selectedSort.name}</span>
              <span className="pointer-events-none">
                        <div className="flex items-center">
                            <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                        </div>
                    </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options
                className={`absolute w-3/5 sm:w-full left-36 sm:left-auto z-40 mt-1 w-full bg-white shadow-wwlDragDropShadow max-h-48 rounded-md text-base ring-1 ring-black ring-opacity-5 scrollbar scrollbar-thin scrollbar-thumb-wwlOrange scrollbar-track-wwlGray200 focus:outline-none sm:text-sm top-full`}>
                {sortOptions.map((option, index) => (<Listbox.Option
                  key={option.id}
                  className={({active}) => classNames(active ? 'text-wwlOrange' : 'text-gray-900', `cursor-pointer select-none relative py-2.5 pl-3 pr-9 ${index !== options.length - 1 ? 'border-b border-b-gray-100' : ''} `)}
                  value={option}
                >
                  {({selected, active}) => (<>
                        <span
                          className={classNames(selected ? 'text-base' : 'text-sm', 'block truncate font-normal font-chivo')}>
                          {option.name}
                        </span>


                    {selected ? (<span
                      className={classNames(active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4')}
                    >
                            <CheckIcon className="h-5 w-5 text-wwlOrange" aria-hidden="true"/>
                          </span>) : null}
                  </>)}
                </Listbox.Option>))}
              </Listbox.Options>
            </Transition>
          </div>
        </>)}
      </Listbox>
    </div>
  )
}

import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid'

export default function ListBoxMenu({list, selected, setSelected}) {
  return (
    <div className='my-2'>
      <Listbox value={selected} onChange={setSelected}>
          <Listbox.Button className="relative block bg-wwlInterfaceLightest w-full text-sm font-chivo focus:ring-0 focus:outline-none outline-none rounded-full py-2 px-3 border-none focus:border-none">
            <span className="block truncate text-start">{selected.name}</span>
            <span className="pointer-events-none absolute top-1/2 transform -translate-y-1/2 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm shadow-2xl">
              {list.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative select-none py-2 pl-10 cursor-pointer pr-4 ${
                      active ? 'bg-wwlTransparentOrange' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5 text-wwlOrange" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
      </Listbox>
    </div>
  )
}

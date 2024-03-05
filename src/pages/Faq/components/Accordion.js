import {Disclosure} from '@headlessui/react'
import {ChevronDownIcon} from '@heroicons/react/outline'


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Accordion({faqs}) {
// REDUX

    return (
        <div className="p-0 sm:p-6">
            <h1 className='text-4xl font-chivo text-wwlBlack text-center mb-8 font-bold'>FAQ</h1>
            <dl>
                {faqs.map((faq) => (
                    <Disclosure as="div" key={faq.question}>
                        {({open}) => (
                            <>
                                <dt>
                                    <Disclosure.Button
                                        className="group flex items-center justify-between group cursor-pointer bg-wwlWhite  px-4 md:px-10 py-4 rounded-lg shadow-wwlDefault font-chivo text-lg mb-4 w-full">
                    <span
                        className='group-hover:text-wwlOrange text-left transition-colors duration-300 text-wwlBlack'>{faq.question}</span>
                                        <span>
                          <ChevronDownIcon
                              className={classNames(open ? '-rotate-180' : 'rotate-0', 'group-hover:text-wwlOrange transition-colors duration-300 h-6 w-6 text-wwlGray400')}
                              aria-hidden="true"
                          />
                        </span>
                                    </Disclosure.Button>
                                </dt>
                                <Disclosure.Panel as="dd" className="px-4 md:px-10 mb-6">
                                    {
                                        faq.answer.map((answer) => {
                                            if (answer.url) {
                                                return (
                                                    <a href={answer.url} key={answer.text} target='_blank' rel={'noreferrer'}
                                                       className="block mb-2 text-sm font-inter hover:text-wwlOrange transition-colors duration-300 text-wwlGray500">
                                                        {answer.text}
                                                    </a>
                                                )
                                            } else {
                                                return (
                                                    <p key={answer.text} className="text-sm font-inter text-wwlGray500">
                                                        {answer.text}
                                                    </p>
                                                )
                                            }
                                        })
                                    }
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                ))}
            </dl>
        </div>
    )
}
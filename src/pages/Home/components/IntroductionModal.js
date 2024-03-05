import {Fragment, useRef} from 'react'
import {Dialog, Transition} from '@headlessui/react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel';
import firstImage from '../assets/intro/1.png'
import secondImage from '../assets/intro/2.png'
import thirdImage from '../assets/intro/3.png'
import fourthImage from '../assets/intro/4.png'
import fifthImage from '../assets/intro/5.png'

export default function IntroductionModal({open, setOpen}) {
  const deleteButtonRef = useRef(null)
  function handleSkip(){
    localStorage.setItem('has_seen_intro', 'true')
    setOpen(false);
  }
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-50 inset-0 overflow-y-auto" initialFocus={deleteButtonRef}
              onClose={handleSkip}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
          </Transition.Child>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <Carousel
                  showThumbs={false}
                  showArrows={true}
                  autoFocus={true}
                  autoPlay={true}
                  showStatus={true}
                  stopOnHover={true}
                  useKeyboardArrows={true}
                >
                  <div>
                    <img src={firstImage} alt=""/>
                  </div>
                  <div>
                    <img src={secondImage} alt=""/>
                  </div>
                  <div>
                    <img src={thirdImage} alt=""/>
                  </div>
                  <div>
                    <img src={fourthImage} alt=""/>
                  </div>
                  <div>
                    <img src={fifthImage} alt=""/>
                  </div>

                </Carousel>
              </div>
              <div className="bg-gray-50 px-4 pb-5 sm:px-6 flex justify-end">
                <button
                  type="button"
                  onClick={() => handleSkip()}
                  className="rounded-lg border text-wwlOrange bg-transparent border-wwlOrange hover:bg-wwlOrange hover:text-wwlWhite ml-0 sm:ml-2 transition-colors duration-300 whitespace-nowrap rounded-lg py-2 px-4 font-chivo text-sm border">
                  Skip
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
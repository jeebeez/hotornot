import { format } from "date-fns"
import { useRef } from "react"
import ReactDom from "react-dom"
import { Sun } from "src/assets"
import Moon from "src/assets/Moon"
import { ModalProps } from "../interfaces/types"
import StatBar from "./StatBar"

function Modal({
  setShowModal,
  modalData,
  city,
  dayNightData,
  imageData,
  weatherIcon,
}: ModalProps) {
  const modalRoot = document.getElementById("portal") as HTMLElement

  // close the modal when clicking outside the modal.
  const modalRef = useRef<HTMLDivElement>(null)

  // @ts-ignore-next-line
  const closeModal = (event) => {
    if ((event.button === 0 || event.code === "Enter") && event.target === modalRef.current) {
      setShowModal(false)
    }
  }

  const renderStats = () =>
    modalData.map((item) => (
      <StatBar
        key={item.name}
        header={item.name}
        value={item.value}
        max={item.max}
        metric={item.metric}
      />
    ))

  const renderDayNightData = () =>
    dayNightData.map((item) => (
      <div
        key={item.name}
        className='p-2 rounded-xl md:px-4 text-center md:py-2 border border-gray-300'
      >
        <div className='text-3xl py-2  text-center font-bold flex justify-center gap-2'>
          {item.name === "sunrise" ? (
            <Sun className='fill-amber-500 font-semibold' />
          ) : (
            <Moon className='fill-blue-500 font-semibold' />
          )}
        </div>
        <div className='text-3xl py-2  text-center font-bold flex justify-center gap-2'>
          {format(new Date(item.value * 1000), "hh:mm aa")}
        </div>
      </div>
    ))

  // render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <div
      ref={modalRef}
      onClick={closeModal}
      onKeyDown={closeModal}
      tabIndex={0}
      role='button'
      className='fixed font-mono top-0 left-0 right-0 flex w-full overflow-x-hidden bg-opacity-70 bg-slate-900 overflow-y-auto h-full justify-center items-center'
    >
      <div className='rounded-lg w-10/12 p-4 sm:w-full relative flex items-center bg-white overflow-hidden shadow-2xl md:p-6 lg:p-8 md:inline-block md:max-w-2xl md:px-4 lg:max-w-4xl z-1000'>
        <button
          type='button'
          className='absolute top-4 right-4 z-10 text-red-500 px-2 border-2 rounded-lg hover:bg-slate-200 hover:bg-opacity-50 font-black sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8'
          onClick={() => setShowModal(false)}
        >
          <span className='sr-only'>Close</span>X
        </button>

        <div className='w-full grid grid-cols-1 gap-y-8 gap-x-6 items-start sm:grid-cols-12 lg:gap-x-8'>
          <div className='sm:col-span-4 lg:col-span-5'>
            <div className='aspect-w-1 aspect-h-1 rounded-lg bg-gray-100 overflow-hidden'>
              <img
                className='w-full h-full object-center object-cover'
                loading='lazy'
                alt={imageData.alt}
                src={imageData.src}
              />
            </div>
          </div>
          <section
            aria-labelledby='information-heading'
            className='flex flex-col justify-around sm:col-span-8 lg:col-span-7 h-full'
          >
            <p className='sr-only'>City Stats</p>
            <div>
              <div className='text-2xl flex font-extrabold justify-center text-gray-900 items-center sm:pr-12'>
                <p>{city}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
                  className='object-center object-cover'
                  alt='Current weather icon'
                  height={50}
                  width={50}
                />
              </div>
              <div className='flex-1 p-4 space-y-2 flex items-center justify-center	flex-col select-none'>
                <div className='flex gap-3'>{renderDayNightData()}</div>
              </div>
            </div>
            <div className='flex flex-col gap-2'>{renderStats()}</div>
          </section>
        </div>
      </div>
    </div>,
    modalRoot
  )
}

export default Modal

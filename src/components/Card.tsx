import { Fire, Snow } from "src/assets"
import newDate from "../utils/date-util"

interface CardProps {
  width: number
  openModal: (event: any) => void
  dt: number
  temp: {
    day: number
    min: number
    max: number
  }
  city: string
  description: string
}

function Card({ width, openModal, dt, temp, city, description }: CardProps) {
  return (
    <div
      className='m-5 border rounded-xl bg-slate-50'
      onClick={(e) => (width > 768 ? "" : openModal(e))}
      onKeyDown={(e) => (width > 768 ? "" : openModal(e))}
      role='button'
      tabIndex={-1}
    >
      <div className='flex  flex-row md:flex-col divide-x-2 > * + * items-center justify-center'>
        <div className='p-2 w-full'>
          <div className='text-center py-2 font-semibold '> {newDate(dt)}</div>
          <div className='text-3xl py-2 text-center font-bold flex items-center justify-center gap-2'>
            {temp.day > 25 ? (
              <Fire className='fill-amber-500 font-semibold' />
            ) : (
              <Snow className='fill-blue-500 font-semibold' />
            )}
            {temp.day}°C
          </div>
        </div>
        <div className='p-2 w-full'>
          <div className='flex flex-col py-2 font-semibold text-md items-center justify-center'>
            <span className='text-red-700 font-bold'>Max {temp.max}°C</span>
            <span className='text-blue-700 font-bold'>Min {temp.min}°C</span>
          </div>
          <div className='capitalize flex lg:flex-row flex-col flex-wrap font-semibold text-lg gap-2 py-2 items-center justify-around'>
            <span className='break-all text-center'>{city}</span>
            <span className='break-all text-center'>{description}</span>
          </div>
        </div>
      </div>

      <div className='hidden md:flex flex-col font-medium text-md gap-2 py-2 items-center justify-around'>
        <button
          onClick={openModal}
          onKeyDown={openModal}
          className='font-medium text-md py-2 border rounded-lg px-6 my-2 bg-blue-200'
          type='submit'
        >
          Read More
        </button>
      </div>
    </div>
  )
}

export default Card

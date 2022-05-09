import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  TooltipProps,
} from "recharts"
import { useWindowSize } from "@react-hook/window-size"
import { DailyWeatherData } from "../interfaces/types"
import newDate from "../utils/date-util"

interface Props {
  weeklyWeather: DailyWeatherData[]
}

type ValueType = number | string | Array<number | string>
type NameType = number | string

function CustomTooltip({ active, payload }: TooltipProps<ValueType, NameType>) {
  if (active) {
    const tooltipData = payload?.[0].payload

    return (
      <div className='bg-blue-100 p-5 space-y-1 flex flex-col items-center justify-center font-medium rounded-xl'>
        <p>{newDate(tooltipData.dt)}</p>
        <p className='text-red-700 text-sm'>Max {tooltipData.max}°C</p>
        <p className='text-blue-700 text-sm'>Min {tooltipData.min}°C</p>
        <p className='text-sm capitalize break-all text-center'>
          {tooltipData.description || "Good weather 😛"}
        </p>
      </div>
    )
  }
  return null
}

function Charts({ weeklyWeather }: Props) {
  const [width] = useWindowSize()
  const chartData = weeklyWeather.map((day) => {
    const data = {
      day: newDate(day.dt, true),
      dt: day.dt,
      description: day.weather[0].description,
      max: day.temp.max,
      min: day.temp.min,
    }
    return data
  })
  return (
    <div className='w-full h-full flex-1'>
      <div className='h-full w-full flex items-center justify-center'>
        <ResponsiveContainer
          width={width > 768 ? "80%" : "90%"}
          height={width > 768 ? "60%" : "80%"}
        >
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
              </linearGradient>
              <linearGradient id='colorPv' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey='day' className='' dy={5} />
            <YAxis dataKey='max' dx={-5} />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type='monotone'
              dataKey='max'
              stroke='#82ca9d'
              fillOpacity={1}
              fill='url(#colorPv)'
            />
            <Area
              type='monotone'
              dataKey='min'
              stroke='#8884d8'
              fillOpacity={1}
              fill='url(#colorUv)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default Charts

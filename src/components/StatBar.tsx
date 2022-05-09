interface Stats {
  header: string
  value: number
  max: number
  metric: string
}

function StatBar({ header, value, max, metric }: Stats) {
  const percentValue = (value / max) * 100
  return (
    <div className='flex relative font-light text-xs gap-2 uppercase items-center w-full'>
      <p className='py-1 w-24 px-1'>
        {header}({metric})
      </p>
      <div className=' relative flex-grow justify-between bg-gray-900 ml-2 rounded-full h-4 dark:bg-gray-500'>
        <div className='bg-amber-400 h-4 rounded-full' style={{ width: `${percentValue}%` }} />
        <p className='text-white absolute inset-0 text-center z-10 '>{value.toFixed(2)}</p>
      </div>
      <p className='text-gray-900 w-10 text-center'>{max}</p>
    </div>
  )
}

export default StatBar

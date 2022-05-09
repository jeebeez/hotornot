import { useState } from "react"
import { useWindowSize } from "@react-hook/window-size"
import useLocationApi from "../hooks/useSingleLocation"
import Charts from "./Charts"
import Modal from "./Modal"
import Loading from "./Loading"
import Error from "./Error"
import SearchBar from "./SearchBar"
import Card from "./Card"

function DashBoard() {
  const [locationData, setLocationData] = useState("")
  const [width] = useWindowSize()

  const [data, isLoading, isError, city, fetchLocation, imageData] = useLocationApi()
  const [showModal, setShowModal] = useState<boolean>(false)

  // @ts-ignore-next-line
  const openModal = (event) => {
    if (event.button === 0 || event.code === "Enter") {
      setShowModal(true)
    }
  }

  if (isLoading) {
    return <Loading />
  }

  if (isError.value) {
    return <Error message={isError.message} />
  }

  // @ts-ignore-next-line
  const handleSubmit = (event) => {
    event.preventDefault()
    fetchLocation(locationData)
    setLocationData("")
  }

  const weeklyWeather = data.daily.slice(0, 7)
  const currentDay = data.daily[0]
  const weatherIcon = currentDay.weather[0].icon

  const modalData = [
    { name: "windspeed", value: currentDay.wind_speed, metric: "m/s", max: 115 },
    { name: "humidity", value: currentDay.humidity, metric: "%", max: 100 },
    { name: "pressure", value: currentDay.pressure, metric: "hPa", max: 1100 },
  ]
  const dayNightData = [
    { name: "sunrise", value: currentDay.sunrise, metric: "AM" },
    { name: "sunset", value: currentDay.sunset, metric: "PM" },
  ]

  return (
    <>
      <main className='flex flex-col md:flex-row h-screen w-screen overflow-hidden'>
        <div className='md:flex md:w-3/6 xl:w-3/6  xl:max-w-sm md:flex-col  md:inset-y-0 p-5 bg-blue-400'>
          <SearchBar
            locationData={locationData}
            setLocationData={setLocationData}
            handleSubmit={handleSubmit}
          />
          <Card
            width={width}
            city={city}
            openModal={openModal}
            dt={currentDay.dt}
            temp={currentDay.temp}
            description={currentDay.weather[0].description || "Good weather 😛"}
          />
        </div>
        <div className='p-4 my-10 w-full h-full'>
          <h1 className='text-2xl md:text-4xl text-center font-bold text-gray-900'>
            Weather Dashboard
          </h1>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-4 my-4 border-dashed border-gray-200 h-4/5 rounded-lg '>
            <Charts weeklyWeather={weeklyWeather} />
          </div>
        </div>
      </main>
      {showModal ? (
        <Modal
          setShowModal={setShowModal}
          modalData={modalData}
          city={city}
          dayNightData={dayNightData}
          imageData={imageData}
          weatherIcon={weatherIcon}
        />
      ) : null}
    </>
  )
}

export default DashBoard

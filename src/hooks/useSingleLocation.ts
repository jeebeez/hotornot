import { useState, useEffect } from "react"
import axios from "axios"
import { WeatherDataProps, ImageDataProps, ErrorDataProps } from "../interfaces/types"

const useLocationApi = (): [
  WeatherDataProps,
  boolean,
  ErrorDataProps,
  string,
  React.Dispatch<React.SetStateAction<string>>,
  ImageDataProps
] => {
  const defaultImgData = {
    alt: "Bangalore",
    id: 1,
    src: "https://images.pexels.com/photos/3290386/pexels-photo-3290386.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800",
  }
  const [location, setLocation] = useState<string>("560038")
  const [city, setCity] = useState<string>("Bangalore")
  const [data, setData] = useState<WeatherDataProps>({} as WeatherDataProps)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isError, setIsError] = useState({ value: false, message: "" })
  const [imageData, setImageData] = useState<ImageDataProps>(defaultImgData)
  let cityLocation = "Bangalore"

  const latLon = async () => {
    let lat
    let lon
    const apiKey = process.env.REACT_APP_API_KEY_WEATHER_API
    if (process.env.REACT_APP_IS_FEATURE_FLAG_INDIA === "true") {
      const cityZip = `https://api.postalpincode.in/pincode/${location}`
      const {
        data: [cityData],
      } = await axios.get(cityZip)
      const postOffice = cityData.PostOffice?.[0].District
      if (!postOffice) throw new Error("No City for this Pincode found")
      const cityName = postOffice
      cityLocation = cityName
      const currentTemperature = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
      const { data: currentLatLon } = await axios.get(currentTemperature)
      lat = currentLatLon[0].lat
      lon = currentLatLon[0].lon
    } else {
      const currentTemperature = `https://api.openweathermap.org/geo/1.0/zip?zip=${location},IN&appid=${apiKey}`
      const { data: currentLatLon } = await axios.get(currentTemperature)
      lat = currentLatLon.lat
      lon = currentLatLon.lon
      const { name } = currentLatLon
      cityLocation = name
    }
    const dailyTemperatureUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=924783bda048569443e49dd6a03e5591`

    const dailyData = await axios.get(dailyTemperatureUrl)

    return dailyData.data
  }

  const fetchApi = async () => {
    const auth = process.env.REACT_APP_AUTH_KEY_PEXELS_API // ADD THE AUTH KEY
    const query = cityLocation || "Bangalore"
    const url = `https://api.pexels.com/v1/search?query=${query}+query&per_page=1&page=1`

    const { data: dataFetch } = await axios.get(url, {
      headers: {
        Authorization: auth as string,
      },
    })

    const photos = dataFetch.photos[0]
    const filtered = {
      alt: photos?.alt || defaultImgData.alt,
      id: photos?.id || defaultImgData.id,
      src: photos?.src.portrait || defaultImgData.src,
    }

    return filtered
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsError({ value: false, message: "" })
      setIsLoading(true)

      try {
        const dailyData = await latLon()
        setCity(cityLocation)
        const photos = await fetchApi()
        setImageData(photos)
        setData(dailyData)
      } catch (error) {
        setIsError({ value: true, message: (error as Error).message })
      }
      setIsLoading(false)
    }

    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return [data, isLoading, isError, city, setLocation, imageData]
}

export default useLocationApi

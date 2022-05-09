export interface WeatherType {
  id: number
  description?: string
  main?: string
  icon?: string
}

export type DailyWeatherData = {
  dt: number
  sunrise: number
  sunset: number
  temp: {
    day: number
    min: number
    max: number
  }
  pressure: number
  humidity: number
  wind_speed: number
  weather: WeatherType[]
}

export interface WeatherDataProps {
  lat: number
  lon: number
  daily: DailyWeatherData[]
}
export interface ErrorDataProps {
  value: boolean
  message: string
}

export interface DayNightData {
  name: string
  value: number
}
export interface ModalData extends DayNightData {
  metric: string
  max: number
}

export interface ImageDataProps {
  alt: string
  id: number
  src: string
}

export interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  modalData: ModalData[]
  city: string
  dayNightData: DayNightData[]
  imageData: ImageDataProps
  weatherIcon?: string
}

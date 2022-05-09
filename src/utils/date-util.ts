import { format } from "date-fns"

const newDate = (date: number, flag?: boolean) => {
  const day = format(new Date(date * 1000), "EEEE")
  const humanDateFormatWithoutYear = `${format(new Date(date * 1000), "MMMM d")}, ${day}`

  return flag ? day : humanDateFormatWithoutYear
}

export default newDate

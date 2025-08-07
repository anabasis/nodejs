import { format, add, sub } from 'date-fns'

type TypeTime = { time?: string | Date; type?: string }

const setTimeData = (obj?: TypeTime) => {
  const type = obj?.type || 'yyyy-MM-dd HH:mm:ss'
  const date = obj?.time ? new Date(obj.time) : new Date()
  const timezone = date.getTimezoneOffset()

  return { date, type, timezone }
}

// 국제 표준 시간으로 변환
/**
 * UTC 0 시 기준으로 변환
 * changeTimeServer(): 2023-08-25 03:50:39
 * changeTimeServer({time: '2023-08-25 9:30:55'}): 2023-08-25 00:30:55
 * changeTimeServer({time: '2023-08-25 9:30:55', type: 'yyyy:MM:dd'}): 2023:08:25
 * changeTimeServer({type: 'yyyy:MM:dd HH:mm'}): 2023:08:25 03:50
 * changeTimeServer({time: '2023-08-25', type: 'yyyy:MM:dd 23:59:59'}): 2023:08:25 23:59:59
 */
export const changeTimeServer = (obj?: TypeTime) => {
  const { date, type, timezone } = setTimeData(obj)
  return format(add(date, { minutes: timezone }), type)
}

// 접속자 환경 시간으로 변환
/**
 * UTC local 시 기준으로 변환
 * changeTimeLocal(): 2023-08-25 22:06:55
 * changeTimeLocal({time: '2023-08-25 9:30:55'}): 2023-08-25 18:30:55
 * changeTimeLocal({time: '2023-08-25 9:30:55', type: 'yyyy:MM:dd'}): 2023:08:25
 * changeTimeLocal({type: 'yyyy:MM:dd HH:mm'}): 2023:08:25 22:06
 * changeTimeLocal({time: '2023-08-25', type: 'yyyy:MM:dd 23:59:59'}): 2023:08:25 23:59:59
 */
export const changeTimeLocal = (obj?: TypeTime) => {
  const { date, type, timezone } = setTimeData(obj)
  return format(sub(date, { minutes: timezone }), type)
}

// utc 시간으로 사용
// Aug 31, 2022 2:44 AM 으로 변환

export const updateTime = (isoDate: string) => {
  const date = new Date(isoDate)
  const timezone = date.getTimezoneOffset() * 60 * 1000
  const utc = date.getTime() + timezone
  const utcDate = new Date(utc)
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const month = monthNames[utcDate.getMonth()]
  const day = utcDate.getDate()
  const year = utcDate.getFullYear()
  const hours = utcDate.getHours()
  const minutes = utcDate.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const formattedTime = `${hours % 12}:${minutes.toString().padStart(2, '0')} ${ampm}`

  return `${month} ${day}, ${year} ${formattedTime}`
}

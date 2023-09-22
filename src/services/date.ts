import dayjs, { Dayjs, ManipulateType } from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isBetween)
dayjs.extend(relativeTime)

export type { Dayjs }
export type CanBeDate = Date | string | Dayjs | number

export const now = (): Dayjs => {
  return dayjs()
}

export const date = (value?: CanBeDate): Dayjs => {
  return dayjs(value)
}
export const guestTimezone = (): string => {
  return dayjs.tz.guess()
}

export const parsingInTz = (time: CanBeDate, timezone: string): Dayjs => {
  return dayjs.tz(time, timezone)
}

export const convertToTz = (time: CanBeDate, timezone: string): Dayjs => {
  return dayjs(time).tz(timezone)
}

export const convertToGuestTz = (time: CanBeDate): Dayjs => {
  return convertToTz(time, guestTimezone())
}

export const toUTC = (time: CanBeDate): Dayjs => {
  return dayjs(time).utc()
}

/**
 * Set UTC offset, time will be changed
 * @example
 * toOffset('2020-01-01T00:00:00Z', '+08:00') // '2020-01-01 08:00:00 +08:00'
 */
export const toOffset = (time: CanBeDate, offset: string): Dayjs => {
  return dayjs(time).utcOffset(offset)
}

/**
 * Set UTC offset, keep time unchanged
 * @example
 * withOffset('2020-01-01T00:00:00Z', '+08:00') // '2020-01-01 00:00:00 +08:00'
 */
export const withOffset = (time: CanBeDate, offset: string): Dayjs => {
  return dayjs(time).utcOffset(offset, true)
}

/**
 * Check day is weekend
 * @param date {Dayjs}
 */
export const isWeekend = (day: string | number | Date): boolean => {
  return [0, 6].includes(dayjs(day).day())
}
/**
 * Check day is saturday
 * @param date {Dayjs}
 */
export const isSaturday = (day: string | number | Date): boolean => {
  return dayjs(day).day() === 6
}
/**
 * Check day is sunday
 * @param date {Dayjs}
 */
export const isSunday = (day: string | number | Date): boolean => {
  return dayjs(day).day() === 0
}

/**
 * Returns the time duration from the given day to the current time.
 *
 * @param {CanBeDate} day - The day to calculate the duration from.
 * @return {string} - The time duration from the given day to the current time.
 */
export const fromNow = (day: CanBeDate): string => {
  return dayjs(day).fromNow()
}

/**
 * Formats a given date or string into the specified format.
 *
 * @param {CanBeDate} day - The date or string to be formatted.
 * @param {string} format - The format to be applied to the date or string.
 * @return {string} The formatted date or string.
 */
export const format = (day: CanBeDate, format: string): string => {
  return dayjs(day).format(format)
}

/**
 * Calculates the difference between two time values in the specified unit.
 *
 * @param {Dayjs} firstTime - The first time value.
 * @param {CanBeDate} secondTime - The second time value.
 * @param {ManipulateType} unit - The unit of time to calculate the difference in.
 * @return {number} The difference between the two time values in the specified unit.
 */
export const diff = (firstTime: Dayjs, secondTime: CanBeDate, unit: ManipulateType) => {
  return firstTime.diff(secondTime, unit)
}

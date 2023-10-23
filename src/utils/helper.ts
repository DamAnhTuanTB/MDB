import { FieldErrors } from 'react-hook-form/dist/types'
import { ZodIssueOptionalMessage } from 'zod'

let debounceTimeout: NodeJS.Timeout

/**
 * Checks if the given string matches the specified regular expression pattern.
 *
 * @param {string} value - The string to be tested.
 * @param {RegExp} pattern - The regular expression pattern to match against.
 * @return {boolean} Returns true if the string matches the pattern, otherwise returns false.
 */
export function isMatch(value: string, pattern: RegExp): boolean {
  return pattern.test(value)
}

/**
 * Maps a ZodIssueOptionalMessage to an error object based on the issue code.
 *
 * @param {ZodIssueOptionalMessage} issue - The ZodIssueOptionalMessage to map.
 * @return {object} The error object.
 */
export function errorMap(issue: ZodIssueOptionalMessage) {
  switch (issue.code) {
    case 'invalid_date':
      return { message: 'Invalid date' }
    case 'invalid_type':
      return { message: 'Invalid type' }
    default:
      return { message: issue.message || '' }
  }
}

/**
 * Checks if there is an input error for the given field name.
 *
 * @param {string} name - The name of the field.
 * @param {FieldErrors} errors - The object containing the field errors.
 * @return {boolean} Returns true if there is an error for the field, false otherwise.
 */
export function handleInputError(name: string, errors?: FieldErrors): boolean {
  if (!errors) return false
  let hasError = false

  if (errors[name]) {
    hasError = name in errors
  } else {
    const nameParts = name.split('.')
    const fieldArrayName = nameParts[0]
    const fieldIndex = nameParts[1]
    const fieldName = nameParts[2]
    const error = errors[fieldArrayName]

    if (error) {
      // @ts-ignore
      hasError = Object.keys(error[parseInt(fieldIndex)] || {}).includes(fieldName)
    }
  }

  return hasError
}

/**
 * Scrolls the window to the bottom of the page smoothly.
 *
 * @param {HTMLElement|HTMLDivElement|null} element - Scroll element, default is body
 * @return {void} No return value.
 */
export function scrollToBottom(element: HTMLDivElement | HTMLElement | null = document.body) {
  if (element === null) return

  window.scrollTo({ top: element.scrollHeight, behavior: 'smooth' })
}

/**
 * Retrieves the value stored in the local storage under the given key.
 *
 * @param {string} key - The key used to store the value in the local storage.
 * @return {string | undefined} - The value stored in the local storage under the given key.
 */
export function getLocalStorage<T>(key: string) {
  let localStorageValue: string | undefined = undefined

  if (typeof window !== 'undefined') {
    localStorageValue = localStorage.getItem(key) || undefined
  }

  return localStorageValue
}

export function setLocalStorage<T>(key: string, value: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value)
  }
}

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumSignificantDigits: 1

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The string to be capitalized.
 * @return {string} The capitalized string.
 */
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

/**
 * Shares the given files using the system's native sharing functionality.
 *
 * @param {File[]} files - The files to be shared.
 * @return {Promise<void>} - A promise that resolves when the sharing is complete.
 */
export async function shareFile(files: any[]) {
  if (!navigator.canShare) {
    console.log("Your system doesn't support sharing these files.")
    return
  }

  if (navigator.canShare({ files })) {
    try {
      await navigator.share({ files })
    } catch (error) {
      console.log(`Error: ${error}`)
    }
  } else {
    console.log("Your system doesn't support sharing these files.")
  }
}

/**
 * Generates a query string from an object of parameters.
 *
 * @param {T} paramsObj - The object containing the parameters.
 * @return {string} The generated query string.
 */
export function paramToQueryString<T extends Object>(paramsObj: T) {
  const params = new URLSearchParams()

  Object.entries(paramsObj).forEach(([key, value]) => {
    if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (Array.isArray(subValue)) {
          if (subValue && subValue.length > 0) params.append(`${[key]}[${subKey}][]`, JSON.stringify(subValue))
        } else {
          if (subValue) params.append(`${key}[${subKey}]`, subValue as string)
        }
      })
    } else {
      params.set(key, value)
    }
  })

  return params.toString()
}

/**
 * Finds an object in an array by searching for a specific value in a specific property.
 *
 * @param {T[]} array - The array to search in.
 * @param {keyof T} propertyName - The name of the property to search for the value in.
 * @param {T[keyof T]} name - The value to search for in the property.
 * @return {T | undefined} - The found object, or undefined if no match was found.
 */
export function findObjectByName<T>(array: T[], propertyName: keyof T, name: T[keyof T]): T | undefined {
  return array.find((item) => item[propertyName] === name)
}

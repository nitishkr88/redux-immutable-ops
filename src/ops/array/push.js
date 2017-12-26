// @flow
import splice from './splice'

const push = (array: Array<*> = [], value: any) => {
  return splice(array, array.length, 0, value)
}

export default push
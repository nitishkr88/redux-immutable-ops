// @flow
import splice from './splice'

const unshift = (array: Array<*>, ...values: any[]): Array<*> => {
  const valueArray = values.reverse()
  let result = array
  for (const val of valueArray) {
    result = splice(result, 0, 0, val)
  }
  return result
}

export default unshift
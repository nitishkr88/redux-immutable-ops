// @flow
import splice from './splice'

const shift = (array: Array<*>): Array<*> => splice(array, 0, 1)

export default shift
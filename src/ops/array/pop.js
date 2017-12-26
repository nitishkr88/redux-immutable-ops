// @flow
import splice from './splice'

const pop = (array: Array<*> = []) => splice(array, array.length - 1, 1)

export default pop
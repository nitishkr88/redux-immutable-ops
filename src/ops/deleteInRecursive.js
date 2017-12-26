// @flow
import { toPath } from 'lodash'

import deepEqual from './deepEqual'
import deleteIn from './deleteIn'
import setIn from './setIn'
import getIn from './getIn'

const empty = {}

function deleteInRecursiveWithPath<T: Object | Array<*>>(
  state: ?T,
  path: string
): ?T {
  if (path[path.length - 1] === ']') {
    // array path
    const pathTokens = toPath(path)
    pathTokens.pop()
    // $FlowFixMe
    const parent = getIn(state, pathTokens.join('.'))
    // $FlowFixMe
    return parent ? setIn(state, path) : state
  }

  // $FlowFixMe
  let result: T = state
  // $FlowFixMe
  if (getIn(state, path) !== undefined) {
    // $FlowFixMe
    result = deleteIn(state, path)
  }

  const dotIndex = path.lastIndexOf('.')
  if (dotIndex > 0) {
    const parentPath = path.substring(0, dotIndex)
    if (parentPath[parentPath.length - 1] !== ']') {
      const parent = getIn(result, parentPath)
      if (deepEqual(parent, empty)) {
        // $FlowFixMe
        return deleteInRecursive(result, parentPath)
      }
    }
  }
  return result
}

const deleteInRecursive = (
  state: Object | Array<*>,
  field: string
): ?(Object | Array<*>) => deleteInRecursiveWithPath(state, field.toString())

export default deleteInRecursive

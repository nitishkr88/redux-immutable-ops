// @flow
import { isEqualWith } from 'lodash'

const customizer = (obj: any, other: any) => {
  if (obj === other) return true

  if (!obj && !other) {
    const objIsEmpty = obj === null || obj === undefined || obj === ''
    const otherIsEmpty = other === null || other === undefined || other === ''
    return objIsEmpty === otherIsEmpty
  }
}

const deepEqual = (a: any, b: any) => isEqualWith(a, b, customizer)

export default deepEqual

import unshift from '../array/unshift'

describe('ops.unshift', () => {

  it('should add element(s) to an empty or undefined array', () => {
    expect(unshift([], 'a')).toEqual(['a'])
    expect(unshift([], 'a', 'b', 'c')).toEqual(['a', 'b', 'c'])

    expect(unshift(undefined, 'a')).toEqual(['a'])
    expect(unshift(undefined, 'a', 'b', 'c')).toEqual(['a', 'b', 'c'])
  })

  it('should add one element to the start and return a shallow copy', () => {
    expect(unshift(['b', 'c'], 'a')).toEqual(['a', 'b', 'c'])
  })

  it('should add multiple elements to the start and return a shallow copy', () => {
    const arr = ['c', 'd']
    expect(unshift(arr, 'a', 'b')).toEqual(['a', 'b', 'c', 'd'])
    expect(unshift(arr, 'e', 'f')).toEqual(['e', 'f', 'c', 'd'])
    expect(arr).toEqual(['c', 'd'])
  })
})
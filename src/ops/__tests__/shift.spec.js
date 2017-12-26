import shift from '../array/shift'

describe('ops.shift', () => {
  it('should return an empty array for empty or undefined array', () => {
    expect(shift([])).toEqual([])
    expect(shift(undefined)).toEqual([])
  })

  it('should remove first element from the array and return a shallow copy', () => {
    const arr1 = ['a', 'b', 'c']
    const arr2 = shift(arr1)

    expect(arr1).toEqual(['a', 'b', 'c'])
    expect(arr2).toEqual(['b', 'c'])
    expect(arr2).not.toBe(arr1)

    const arr3 = ['a', {foo: 'bar'}, {bar: 'baz'}]
    expect(shift(arr3)).toEqual([{foo: 'bar'}, {bar: 'baz'}])
    expect(shift(arr3)).not.toBe(arr3)
  })
})
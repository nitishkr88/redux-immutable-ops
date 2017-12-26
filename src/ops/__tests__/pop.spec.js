import pop from '../array/pop'

describe('ops.pop', () => {
  it('should return an empty array for empty or undefined array', () => {
    expect(pop([])).toEqual([])
    expect(pop(undefined)).toEqual([])
  })

  it('should remove the last element and return a shallow copy', () => {
    const arr = ['a', 'b', 'c', 'd']
    expect(pop(arr)).toEqual(['a', 'b', 'c'])
    expect(arr).toEqual(['a', 'b', 'c', 'd'])
  })
})

import push from '../array/push'

describe('ops.push', () => {
  it('should insert when the initial array is undefined', () => {
    // goes to index 0
    expect(push(undefined, 1)).toEqual([1])
    expect(push(undefined, {foo: 'bar'})).toEqual([{'foo': 'bar'}])
  })

  it('should insert value at the end and return a shallow copy', () => {
    const arr1 = [{foo: 'bar'}, 2]
    const arr2 = push(arr1, 3)
    expect(arr2).toEqual([{foo: 'bar'}, 2, 3])
    expect(arr2).not.toBe(arr1)
  })
})
import deleteIn from '../deleteIn'

describe('ops.deleteIn', () => {
  it('should not return state if path is not found', () => {
    const state = { foo: 'bar' }
    expect(deleteIn(state, undefined)).toBe(state)
    expect(deleteIn(state, 'cat')).toBe(state)
    expect(deleteIn(state, 'cat.rat.pig')).toBe(state)
  })

  it('should do nothing if array index is out of bound', () => {
    const state = {
      foo: [
        {
          bar: ['cat']
        }
      ]
    }
    expect(deleteIn(state, 'foo[2].bar[0]')).toEqual(state)
    expect(deleteIn(state, 'foo[0].bar[2]')).toEqual(state)
  })

  it('should throw exception for non-numerical array indexes', () => {
    expect(() =>
      deleteIn(
        {
          foo: ['cat']
        },
        'foo[bar]'
      )
    ).toThrow(/non-numerical index/)
    expect(() =>
      deleteIn(
        {
          foo: [{ cat: 'fido' }]
        },
        'foo[bar].cat'
      )
    ).toThrow(/array elements with a number/)
  })

  it('should delete shallow keys without mutating state', () => {
    const state = { foo: 'bar', cat: 'fido' }
    expect(deleteIn(state, 'foo')).not.toBe(state)

    expect(deleteIn(state, 'foo')).toEqual({
      cat: 'fido'
    })

    expect(deleteIn(state, 'cat')).not.toBe(state)

    expect(deleteIn(state, 'cat')).toEqual({
      foo: 'bar'
    })
  })

  it('should delete shallow array indexes without mutating state', () => {
    const state = ['the', 'quick', 'brown', 'fox']
    expect(deleteIn(state, 4)).toBe(state) // index not found
    expect(deleteIn(state, 0)).not.toBe(state)
    expect(deleteIn(state, 0)).toEqual(['quick', 'brown', 'fox'])
    expect(deleteIn(state, 1)).not.toBe(state)
    expect(deleteIn(state, 1)).toEqual(['the', 'brown', 'fox'])
    expect(deleteIn(state, 2)).not.toBe(state)
    expect(deleteIn(state, 2)).toEqual(['the', 'quick', 'fox'])
    expect(deleteIn(state, 3)).not.toBe(state)
    expect(deleteIn(state, 3)).toEqual(['the', 'quick', 'brown'])
  })

  it('should delete deep keys without mutating state', () => {
    const state = {
      foo: {
        bar: ['baz', { cat: 42 }]
      }
    }

    const result1 = deleteIn(state, 'foo.bar[0]')
    expect(result1).not.toBe(state)

    expect(result1).toEqual({
      foo: {
        bar: [
          {
            cat: 42
          }
        ]
      }
    })

    expect(result1.foo).not.toBe(state.foo)
    expect(result1.foo.bar).not.toBe(state.foo.bar)
    expect(result1.foo.bar.length).toBe(1)
    expect(result1.foo.bar[0]).toBe(state.foo.bar[1])

    const result2 = deleteIn(state, 'foo.bar[1].cat')
    expect(result2).not.toBe(state)

    expect(result2).toEqual({
      foo: {
        bar: ['baz', {}]
      }
    })

    expect(result2.foo).not.toBe(state.foo)
    expect(result2.foo.bar).not.toBe(state.foo.bar)
    expect(result2.foo.bar[0]).toBe(state.foo.bar[0])
    expect(result2.foo.bar[1]).not.toBe(state.foo.bar[1])

    const result3 = deleteIn(state, 'foo.bar')
    expect(result3).not.toBe(state)

    expect(result3).toEqual({
      foo: {}
    })

    expect(result3.foo).not.toBe(state.foo)
  })

  it("should not mutate deep state if can't find final key", () => {
    const state = {
      foo: {
        bar: [{}]
      }
    }
    const result = deleteIn(state, 'foo.bar[0].cat')
    expect(result).toBe(state)

    expect(result).toEqual({
      foo: {
        bar: [{}]
      }
    })

    expect(result.foo).toBe(state.foo)
    expect(result.foo.bar).toBe(state.foo.bar)
    expect(result.foo.bar[0]).toBe(state.foo.bar[0])
  })
})

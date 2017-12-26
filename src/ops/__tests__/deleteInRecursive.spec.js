import deleteIn from '../deleteIn'
import deleteInRecursive from '../deleteInRecursive'
import expectations from './expectations'

const describeDeleteInRecursive = (name, setup) => {
  describe(name, () => {
    beforeAll(() => {
      setup()
    })

    it('should behave like deleteIn in case of array', () => {
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

    expect(deleteInRecursive(state, 4)).toBe(state) // index not found
    expect(deleteInRecursive(state, 0)).not.toBe(state)
    expect(deleteInRecursive(state, 0)).toEqual(['quick', 'brown', 'fox'])
    expect(deleteInRecursive(state, 1)).not.toBe(state)
    expect(deleteInRecursive(state, 1)).toEqual(['the', 'brown', 'fox'])
    expect(deleteInRecursive(state, 2)).not.toBe(state)
    expect(deleteInRecursive(state, 2)).toEqual(['the', 'quick', 'fox'])
    expect(deleteInRecursive(state, 3)).not.toBe(state)
    expect(deleteInRecursive(state, 3)).toEqual(['the', 'quick', 'brown'])
    })

    it('should delete from a flat structure', () => {
      expect(
        deleteInRecursive(
          {
            dog: 'Scooby',
            cat: 'Garfield'
          },
          'dog'
        )
      ).toEqualMap({
        cat: 'Garfield'
      })
    })

    it('should not delete parent if has other children', () => {
      expect(
        deleteInRecursive(
          {
            a: {
              b: 1,
              c: 2
            },
            d: {
              e: 3
            }
          },
          'a.b'
        )
      ).toEqualMap({
        a: {
          c: 2
        },
        d: {
          e: 3
        }
      })
    })

    it('should just set to undefined if leaf structure is an array', () => {
      expect(
        deleteInRecursive(
          {
            a: [42]
          },
          'a[0]'
        )
      ).toEqualMap({
        a: [undefined]
      })
      expect(
        deleteInRecursive(
          {
            a: [42]
          },
          'b[0]'
        )
      ).toEqualMap({
        a: [42]
      })
      expect(
        deleteInRecursive(
          {
            a: [41, 42, 43]
          },
          'a[1]'
        )
      ).toEqualMap({
        a: [41, undefined, 43]
      })
      expect(
        deleteInRecursive(
          {
            a: {
              b: 1,
              c: [2]
            },
            d: {
              e: 3
            }
          },
          'a.c[0]'
        )
      ).toEqualMap({
        a: {
          b: 1,
          c: [undefined]
        },
        d: {
          e: 3
        }
      })
    })

    it('should delete parent if no other children', () => {
      expect(
        deleteInRecursive(
          {
            a: {
              b: 1,
              c: 2
            },
            d: {
              e: 3
            }
          },
          'd.e'
        )
      ).toEqualMap({
        a: {
          b: 1,
          c: 2
        }
      })
      expect(
        deleteInRecursive(
          {
            a: {
              b: {
                c: {
                  d: {
                    e: {
                      f: "Only CHILD!"
                    }
                  }
                }
              }
            }
          },
          'a.b.c.d.e.f'
        )
      ).toEqualMap({})
    })
  })
}

describeDeleteInRecursive('deleteInWithCleanUp.plain', () =>
  expect.extend(expectations)
)

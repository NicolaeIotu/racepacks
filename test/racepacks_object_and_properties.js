const tap = require('tap')
process.env.NODE_ENV = 'test'
const { Racepacks } = require(`${process.cwd()}`)

const setup = {
  packs: {
    ArrayIsArray: (x) => {
      return Array.isArray(x)
    },
    instanceofArray: (x) => {
      return x instanceof Array
    }
  },
  tests: [1, '2', [], {}, [[777, 55], 'aa', 11, 'asdasd', 223, 2332], Buffer.alloc(35)]
}
tap.strictSame(new Racepacks(setup).setup, setup)



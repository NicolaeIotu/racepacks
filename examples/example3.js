const { Racepacks } = require('../lib/racepacks')

const setup = {
  packs: {
    ArrayIsArray: (x) => {
      return Array.isArray(x)
    },
    instanceofArray: (x) => {
      return x instanceof Array
    }
  },
  tests: [1, '2', [], {}, [[777, 55], 'aa', 11, 'asdasd', 223, 2332], Buffer.alloc(2)]
}

// eslint-disable-next-line no-new
new Racepacks(setup)

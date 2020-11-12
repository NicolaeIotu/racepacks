const { Racepacks } = require('../lib/racepacks')

const setup = {
  packs: {
    op1: (x) => {
      return x + x
    },
    op2: (x) => {
      return x + x + x
    },
    op3: (x) => {
      return x + x + x + x
    },
    op4: (x) => {
      return x + x + x + x + x
    }
  },
  tests: [
    1,
    'a',
    true,
    false,
    1111,
    'aaaa'
  ]
}

// eslint-disable-next-line no-new
new Racepacks(setup)

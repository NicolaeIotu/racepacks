const { Racepacks } = require('../lib/racepacks')

const setup = {
  packs: {
    op1: (x) => {
      Math.sqrt(x)
    },
    op2: (x) => {
      Math.sqrt(Math.sqrt(x))
    },
    op3: (x) => {
      Math.sqrt(Math.sqrt(Math.sqrt(x)))
    },
    op4: (x) => {
      Math.sqrt(Math.sqrt(Math.sqrt(Math.sqrt(x))))
    }
  },
  tests: [1, 2, 55, 190]
}

const example1 = new Racepacks(setup, false)
console.log(example1.podium)

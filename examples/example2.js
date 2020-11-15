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
  tests: [1, '2', [], {}, [[777, 55], 'a', 11, 'abcdef', 223, 2332], Buffer.alloc(2)]
}

const raceResults = new Racepacks(setup)
console.log(raceResults.podium)

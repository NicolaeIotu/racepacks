const tap = require('tap')
process.env.NODE_ENV = 'test'
const { Racepacks } = require(`${process.cwd()}`)

const setup = {
  packs: {
    ArrayIsArray: (x) => {
      return Array.isArray(x)
    },
    instanceofArray: (x) => {
      console.log(x instanceof Array)
    },
    // simple ops to get the same winning times in race
    op1: (x) => {
      x
    },
    op2: (x) => {
      x
    },
    op3: (x) => {
      x
    },
    op4: (x) => {
      x
    },
    op5: (x) => {
      x
    },
    op6: (x) => {
      x
    },
    op7: (x) => {
      x
    },
    op8: (x) => {
      x
    },
    op9: (x) => {
      x
    },
    op10: (x) => {
      x
    }
  },
  tests: [1, []]
}
const raceResults = new Racepacks(setup)
tap.pass(Array.isArray(raceResults.podium))
tap.equal(raceResults.podium.length, 12)
tap.pass(require('fs').existsSync(process.env.REDIRECT_PATH))
tap.afterEach(() => { require('fs').unlinkSync(process.env.REDIRECT_PATH) })

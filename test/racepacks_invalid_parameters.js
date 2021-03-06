const tap = require('tap')
process.env.NODE_ENV = 'test'
const { Racepacks } = require(`${process.cwd()}`)

tap.throws(() => {
  // eslint-disable-next-line no-new
  new Racepacks()
}, TypeError)
tap.equal(typeof Racepacks, 'function')

tap.throws(() => {
  // eslint-disable-next-line no-new
  new Racepacks({})
}, Error)

tap.throws(() => {
  // eslint-disable-next-line no-new
  new Racepacks({
    packs: []
  })
}, Error)
tap.throws(() => {
  // eslint-disable-next-line no-new
  new Racepacks({
    packs: {},
    tests: 1
  })
}, Error)

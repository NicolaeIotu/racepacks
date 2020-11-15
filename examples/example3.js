const xtypeof = require('xtypeof')
const kindof = require('kind-of')
const _typeof = require('typeof')
const typeof_ = require('type-of')

const { Racepacks } = require('../lib/racepacks')

const setup = {
  packs: {
    kindof: (o) => {
      kindof(o)
    },
    _typeof: (o) => {
      _typeof(o)
    },
    xtypeof: (o) => {
      xtypeof(o)
    },
    typeof_: (o) => {
      typeof_(o)
    }
  },

  // eslint-disable-next-line no-sparse-arrays
  tests: [,
    null,
    undefined,
    false,
    1,
    1n,
    'a',
    Symbol('x'),
    () => {
    },
    {},
    [],
    new Map(),
    new Set(),
    new Date(),
    /^a/,
    new WeakMap(),
    new WeakSet(),
    new Promise(() => {
    }),
    new ArrayBuffer(1),
    new SharedArrayBuffer(1),
    new DataView(new ArrayBuffer(1)),
    new Int8Array(1),
    Buffer.alloc(1),
    new Uint8ClampedArray(1),
    new Int16Array(1),
    new Uint16Array(1),
    new Int32Array(1),
    new Uint32Array(1),
    new Float32Array(1),
    new Float64Array(1),
    new BigInt64Array(1),
    new BigUint64Array(1),
    new Error('err'),
    new TypeError('terr')
  ]
}

const raceResults = new Racepacks(setup)
console.log(raceResults.podium)

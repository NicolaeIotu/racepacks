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
  tests: [, //  0
    null, //  1
    undefined, //  2
    false, //  3
    1, //  4
    1n, //  5
    'a', //  6
    Symbol('x'), //  7
    () => {
    }, //  8
    {}, //  9
    [], // 10
    new Map(), // 11
    new Set(), // 12
    new Date(), // 13
    /^a/, // 14
    new WeakMap(), // 15
    new WeakSet(), // 16
    new Promise(() => {
    }), // 17
    new ArrayBuffer(1), // 18
    new SharedArrayBuffer(1), // 19
    new DataView(new ArrayBuffer(1)), // 20
    new Int8Array(1), // 21
    Buffer.alloc(1), // 22
    new Uint8ClampedArray(1), // 23
    new Int16Array(1), // 24
    new Uint16Array(1), // 25
    new Int32Array(1), // 26
    new Uint32Array(1), // 27
    new Float32Array(1), // 28
    new Float64Array(1), // 29
    new BigInt64Array(1), // 30
    new BigUint64Array(1), // 31
    new Error('err'), // 32
    new TypeError('terr') // 33
  ]
}

// eslint-disable-next-line no-new
new Racepacks(setup)

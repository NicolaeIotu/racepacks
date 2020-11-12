# racepacks

**racepacks** can compare the execution speed of multiple sets of instructions, functions, packs etc.

More documentation and features coming up soon.

## Examples
The constructor is expecting a special object formatted as per example below:

```
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

new Racepacks(setup)
```

Default output looks like this:

 *** racepacks Results *** 
  Nanosecond precision
  ( *  fastest  )

  │ (index) │        Arguments / Test        │ kindof │ _typeof │ xtypeof │ typeof_ │
  | ------- | ------------------------------ | ------ | ------- | ------- | ------- |
  │    0    │          'undefined'           │ '32 *' │ '32 *'  │   120   │   50    │
  │    1    │             'null'             │ '26 *' │   63    │   39    │   41    │
  │    2    │          'undefined'           │ '26 *' │   54    │   55    │   40    │
  │    3    │            'false'             │ '28 *' │   38    │   40    │   45    │
  │    4    │              '1'               │ '32 *' │   81    │   41    │   59    │
  │    5    │              '1n'              │  327   │ '52 *'  │   60    │   86    │
  │    6    │              'a'               │ '28 *' │   42    │   63    │   39    │

...

 *** racepacks Summary *** 
  Nanosecond precision
  
  │ (index) │   Pack    │    Title    │ Efficiency (% Last) │ Efficiency (% Next) │ Total tests time │ Wins │ Runs │
  
  | ------- | --------- | ----------- | ------------------- | ------------------- | ---------------- | ---- | ---- |
  
  │    0    │ '_typeof' │  'Winner'   │     '157.62 %'      │      '29.85 %'      │      458472      │  21  │ 272  │
  
  │    1    │ 'xtypeof' │ '2nd place' │      '98.41 %'      │      '0.91 %'       │      595308      │  4   │ 272  │
  │    2    │ 'typeof_' │ '3rd place' │      '96.61 %'      │      '96.61 %'      │      600738      │  3   │ 272  │
  │    3    │ 'kindof'  │     ''      │      '0.00 %'       │      '0.00 %'       │     1181136      │  6   │ 272  │


'use strict'

/* racepacks is Copyright (C) 2020 Nicolae Iotu, nicolae.g.iotu@gmail.com
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
limitations under the License.

Author Nicolae Iotu, nicolae.g.iotu@gmail.com */

const { createWriteStream, mkdirSync, unlinkSync } = require('fs')
const { tmpdir } = require('os')
const { join, normalize } = require('path')
const { Transform } = require('stream')
const { buildRotationalRunOrder, getHotPlugSetup } = require('./utils')

const ___tmpdir = join(tmpdir(), 'racepacks')
const outputUncontrollable = 'Info: racepacks runs in browser. Extra output might appear.'
// eslint-disable-next-line no-new-func
const isBrowser = new Function('try {return this===window;}catch(e){return false;}')()

let redirectPath
let redirectStream
let redirectStreamData = false
let slice24
let slicedTableContent = ''
let __objCounter = 0
let hotPlugSetup

if (!isBrowser) {
  // setup filesystem
  try {
    mkdirSync(___tmpdir, { recursive: true })
    const [month, date, year] = new Date().toLocaleDateString('en-US').split('/')
    const [hour, minute, second, apm] = new Date().toLocaleTimeString('en-US').split(/[: ]/)
    redirectPath = join(___tmpdir, 'racepacks_' + `${year}${month}${date}_${hour}${minute}${second}${apm}`)
    redirectStream = createWriteStream(redirectPath)
    redirectStream.once('finish', function (data) {
      try {
        if (data && data.toString().length > 0) { redirectStreamData = true }
      } catch (e) {}
    })

    // prepare for output manipulation
    slice24 = new Transform({
      transform (chunk, enc, cb) {
        const result = String.prototype.replace.call(chunk.toString(), /\n$/, '')
        if (result.length > 24) {
          cb(null, String.prototype.slice.call(result, 0, 24) + '...')
        } else {
          cb(null, result)
        }
      }
    })
    slice24.on('data', (data) => {
      slicedTableContent = data.toString()
    })
  } catch (e) {
    try {
      redirectStream = createWriteStream(normalize('/dev/null'))
    } catch (e1) {
      console.warn(outputUncontrollable)
    }
  }
}

function Racepacks (setup, tableOutput = true, targetThis = null, silent = false) {
  if (__objCounter > 0) {
    throw new Error('Multiple instances of \'racepacks\' not supported at this time.')
  }

  __objCounter++

  if (isBrowser && !silent) { console.warn(outputUncontrollable) }

  hotPlugSetup = getHotPlugSetup(setup)

  // Available for inspection only
  this.setup = setup
  Object.freeze(this.setup)
  this.tableOutput = tableOutput
  Object.freeze(this.tableOutput)
  this.targetThis = targetThis
  Object.freeze(this.targetThis)
  this.silent = silent
  Object.freeze(this.silent)
  Object.defineProperty(this, 'rotationalRunOrder', {
    enumerable: false,
    value: buildRotationalRunOrder(Object.keys(hotPlugSetup.packs))
  })
  Object.freeze(this.rotationalRunOrder)

  this.raceTimes = []
  this.raceDescriptionTable = []
  this.raceStats = {}
  this.podium = []

  race.call(this, tableOutput, silent)
  // prevent any further changes after the race is completed
  Object.freeze(this)
  return this
}

/**
 * A reference to the original console object.
 * @type {Console}
 */
const originalConsole = console
/**
 * Custom console used primarily for separating racepacks output from the output generated while running the tests
 * of the packs.
 * @type {Console}
 */
let racepacksConsole = originalConsole
/**
 * Custom console used to modify output in certain conditions.
 * @type {Console}
 */
let sliceConsole = originalConsole
const racepacksResetConsoles = function () {
  // eslint-disable-next-line no-global-assign
  console = originalConsole
  racepacksConsole = originalConsole
  sliceConsole = originalConsole
}

const racepacksSetupConsoles = function (redirectStream, __isBrowser) {
  if (!__isBrowser) {
    if (redirectStream) {
      // custom stream for tests' output; this prevents messing with racepacks output
      if (console === originalConsole) {
        // eslint-disable-next-line no-global-assign
        console = new originalConsole.Console(redirectStream, redirectStream)
      }

      if (racepacksConsole === originalConsole) {
        racepacksConsole = new originalConsole.Console({
          stdout: process.stdout,
          stderr: process.stderr,
          ignoreErrors: false,
          colorMode: true,
          groupIndentation: 4
        })
      }
    }

    // this must run even if redirectStream is not available
    if (sliceConsole === originalConsole) {
      sliceConsole = new originalConsole.Console(slice24, slice24)
    }

    return
  }

  // this runs in case above conditions are not met
  racepacksResetConsoles()
}

const getRaceSummary = function (raceStats) {
  if (typeof raceStats !== 'object') {
    throw new TypeError('getRaceSummary: invalid member "raceStats"')
  }

  const raceStatsTable = []
  for (const packName in raceStats) {
    raceStatsTable.push({
      Pack: packName,
      Title: '',
      'Efficiency (% Last)': '0 %',
      'Efficiency (% Next)': '0 %',
      'Total tests time': Math.max(1, Number(raceStats[packName].ttime)),
      Wins: raceStats[packName].wins,
      Runs: raceStats[packName].runs
    })
  }

  // sort
  raceStatsTable.sort(function (a, b) {
    return a['Total tests time'] - b['Total tests time']
  })

  // get the podium
  this.podium = []
  for (const pp of raceStatsTable) {
    this.podium.push(pp.Pack)
  }

  // titles
  const titles = ['Winner', '2nd place', '3rd place']
  let nextTitle = 0
  const rstLen = raceStatsTable.length
  let effNext

  // generate output
  for (let i = 0; i < rstLen; i++) {
    // titles
    if (nextTitle < titles.length) {
      raceStatsTable[i].Title = titles[nextTitle]
    }
    if (i < rstLen - 1) {
      nextTitle++
    }

    // % last
    raceStatsTable[i]['Efficiency (% Last)'] =
      (raceStatsTable[rstLen - 1]['Total tests time'] * 100 / raceStatsTable[i]['Total tests time'] - 100).toFixed(2) + ' %'

    // % next
    effNext = (i < rstLen - 1
      ? i + 1
      : i)
    raceStatsTable[i]['Efficiency (% Next)'] =
      (raceStatsTable[effNext]['Total tests time'] * 100 / raceStatsTable[i]['Total tests time'] - 100).toFixed(2) + ' %'
  }

  return raceStatsTable
}

const showSummary = function (raceStatsTable) {
  if (!Array.isArray(raceStatsTable)) {
    throw new TypeError('showSummary: invalid member "raceStatsTable"')
  }

  racepacksConsole.log('')
  if (isBrowser) {
    racepacksConsole.group('%c *** racepacks Summary *** ', 'background-color: #6f0; font-weight: bold')
    racepacksConsole.log('%cIn browser the precision is rounded millisecond. Run with Node.JS for nanosecond' +
      ' precision.', 'font-weight: bold; color: red')
  } else {
    racepacksConsole.group('\x1b[1;30;102m *** racepacks Summary *** \x1b[0m')
    racepacksConsole.log('\x1b[1;91mNanosecond precision\x1b[0m')
  }

  racepacksConsole.table(raceStatsTable)
  racepacksConsole.groupEnd()
}

const describeRace = function (raceTimes, raceDescriptionTable, tableOutput = true) {
  if (!Array.isArray(raceTimes)) {
    throw new TypeError('describeRace: invalid \'raceTimes\' member')
  }
  if (raceTimes.length === 0) {
    throw new Error('describeRace: empty member \'raceTimes\'')
  }
  racepacksSetupConsoles(redirectStream, isBrowser)

  racepacksConsole.log('')
  if (isBrowser) {
    racepacksConsole.group('%c *** racepacks Results *** ', 'background-color: #6f0; color: black; font-weight:' +
      ' bold')
    racepacksConsole.log('%cIn browser the precision is rounded millisecond. Run with Node.JS for nanosecond' +
      ' precision.', 'font-weight: bold; color: red')
    racepacksConsole.log('(  %c * fastest %c )', 'background-color: #666; color: #6f0; font-weight: bold')
  } else {
    racepacksConsole.group('\x1b[1;30;102m *** racepacks Results *** \x1b[0m')
    racepacksConsole.log('\x1b[1;91mNanosecond precision\x1b[0m')
    racepacksConsole.log('( * \x1b[92;100m fastest \x1b[0m )')
  }

  if (tableOutput) {
    racepacksConsole.table(raceDescriptionTable)
  } else {
    let testNo = 0
    for (const test of hotPlugSetup.tests) {
      if (isBrowser) {
        racepacksConsole.group(`Test #${testNo + 1}: `)
        racepacksConsole.log(test)
        for (const pack in raceTimes[testNo]) {
          if (raceTimes[testNo][pack].winner === 1) {
            racepacksConsole.log(`%c ${pack}: ${raceTimes[testNo][pack].end - raceTimes[testNo][pack].start} ms `,
              'background-color: #666; color: #6f0; font-weight: bold')
          } else {
            racepacksConsole.log(` ${pack}: ${raceTimes[testNo][pack].end - raceTimes[testNo][pack].start} ms `)
          }
        }
      } else {
        sliceConsole.log(test)
        racepacksConsole.group(`Test #${testNo + 1}: *** ${slicedTableContent} ***`)
        for (const pack in raceTimes[testNo]) {
          if (raceTimes[testNo][pack].winner === 1) {
            racepacksConsole.log(`\x1b[92;100m ${pack}: ${raceTimes[testNo][pack].end - raceTimes[testNo][pack].start} ns \x1b[0m`)
          } else {
            racepacksConsole.log(` ${pack}: ${raceTimes[testNo][pack].end - raceTimes[testNo][pack].start} ns `)
          }
        }
      }

      racepacksConsole.groupEnd()
      testNo++
    }
  }

  racepacksConsole.groupEnd()
  // restore console
  racepacksResetConsoles()
  // eslint-disable-next-line no-global-assign
  // console = originalConsole
}

const race = function (tableOutput = true, silent = false) {
  this.raceTimes = []
  this.raceDescriptionTable = []
  this.raceStats = {}
  for (const pack in hotPlugSetup.packs) {
    this.raceStats[pack] = {
      ttime: 0n,
      wins: 0,
      runs: 0
    }
  }

  let ptime
  if (isBrowser) {
    // this adds an extra delay, but it does so for both start and end ...
    ptime = function () {
      return BigInt(Math.round(window.performance.now()))
    }
  } else {
    ptime = process.hrtime.bigint
  }
  let testNo = 0
  let start = 0
  let end = 0

  racepacksSetupConsoles(redirectStream, isBrowser)

  const rrOrderLength = this.rotationalRunOrder.length
  // a simple check of the format of this.rotationalRunOrder
  const checkRotLen = Math.sqrt(rrOrderLength)
  if (checkRotLen !== Math.floor(checkRotLen)) {
    racepacksConsole.warn('This test runs with an altered/invalid rotation order and it might be inaccurate!')
  }

  // this is a repeating block which runs in certain conditions
  function raceInner (i, testNo, test, warmUpsCounter, lastInRotOrder) {
    pack = this.rotationalRunOrder[i]
    this.raceTimes[testNo][pack] = this.raceTimes[testNo][pack] ||
      {
        start: 0n,
        end: 0n,
        runs: 0
      }
    this.raceTimes[testNo][pack].winner = 0

    if (Array.isArray(test)) {
      start = ptime()
      hotPlugSetup.packs[pack].apply(this.targetThis, test)
      end = ptime()
    } else {
      start = ptime()
      hotPlugSetup.packs[pack].call(this.targetThis, test)
      end = ptime()
    }

    this.raceTimes[testNo][pack].start += start
    this.raceTimes[testNo][pack].end += end
    this.raceTimes[testNo][pack].runs++

    if (warmUpsCounter <= 1) {
      this.raceStats[pack].ttime += this.raceTimes[testNo][pack].end - this.raceTimes[testNo][pack].start
      this.raceStats[pack].runs++
    }

    // get the winner if it's the last step
    if (warmUpsCounter <= 1 && i === lastInRotOrder) {
      const winner = []
      for (const _testName_ in this.raceTimes[testNo]) {
        this.raceTimes[testNo][_testName_].start = this.raceTimes[testNo][_testName_].start / BigInt(i + 1)
        this.raceTimes[testNo][_testName_].end = this.raceTimes[testNo][_testName_].end / BigInt(i + 1)
        this.raceDescriptionTable[testNo][_testName_] =
          parseInt((this.raceTimes[testNo][_testName_].end -
            this.raceTimes[testNo][_testName_].start).toString(10), 10)

        if (winner.length === 0) {
          Array.prototype.push.call(winner, _testName_)
        } else {
          const t1 = this.raceTimes[testNo][_testName_].end - this.raceTimes[testNo][_testName_].start
          const t2 = this.raceTimes[testNo][winner[0]].end - this.raceTimes[testNo][winner[0]].start
          if (t1 < t2) {
            winner[0] = _testName_
          } else if (t1 === t2) {
            Array.prototype.push.call(winner, _testName_)
          }
        }
      }

      for (const w in winner) {
        this.raceTimes[testNo][winner[w]].winner = 1
        this.raceDescriptionTable[testNo][winner[w]] = this.raceDescriptionTable[testNo][winner[w]] + ' *'
        this.raceStats[winner[w]].wins += 1
      }
    }
  }

  // end raceInner

  const lastInRotOrder = rrOrderLength - 1
  // experimental knob ! 'warm up' time source
  const warmUpRuns = 1
  let warmUpsCounter,
    pack
  for (const test of hotPlugSetup.tests) {
    warmUpsCounter = warmUpRuns
    this.raceTimes[testNo] = {}
    this.raceDescriptionTable[testNo] = {}

    if (isBrowser) {
      this.raceDescriptionTable[testNo]['Arguments / Test'] = test
    } else {
      sliceConsole.log(test)
      this.raceDescriptionTable[testNo]['Arguments / Test'] = slicedTableContent
    }

    for (let i = 0; i < rrOrderLength; i++) {
      if (i === 0) {
        do {
          raceInner.call(this, i, testNo, test, warmUpsCounter, lastInRotOrder)
          warmUpsCounter--
        } while (warmUpsCounter > 0)
      } else {
        raceInner.call(this, i, testNo, test, warmUpsCounter, lastInRotOrder)
      }
    }

    testNo++
  }

  racepacksResetConsoles()

  // remove heaters
  for (const a1 in this.raceTimes) {
    for (const a2 in this.raceTimes[a1]) {
      if (/^du[0-9]*pe$/.test(a2)) { delete this.raceTimes[a1][a2] }
    }
  }
  for (const b1 in this.raceDescriptionTable) {
    for (const b2 in this.raceDescriptionTable[b1]) {
      if (/^du[0-9]*pe$/.test(b2)) { delete this.raceDescriptionTable[b1][b2] }
    }
  }
  for (const c1 in this.raceStats) {
    if (/^du[0-9]*pe$/.test(c1)) { delete this.raceStats[c1] }
  }

  // prepare results
  const raceStatsTable = getRaceSummary.call(this, this.raceStats)
  if (!silent) {
    // show results
    describeRace(this.raceTimes, this.raceDescriptionTable, tableOutput)
    showSummary(raceStatsTable)
  }

  if (!isBrowser) {
    redirectStream.end(function () {
      if (redirectStreamData) {
        racepacksConsole.warn(`Extra output was generated during tests. See '${redirectPath}'.`)
      } else {
        unlinkSync(`${redirectPath}`)
      }
    })
  }
}

Racepacks.prototype.constructor = Racepacks

// features available for tests
if (process.env.NODE_ENV === 'test') {
  module.exports.racepacksSetupConsoles = racepacksSetupConsoles
  module.exports.racepacksResetConsoles = racepacksResetConsoles
  module.exports.getRaceSummary = getRaceSummary
  module.exports.describeRace = describeRace
  module.exports.showSummary = showSummary
  module.exports.race = race
}

// main export
module.exports.Racepacks = Racepacks

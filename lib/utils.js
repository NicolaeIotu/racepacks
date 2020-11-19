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

function buildRotationalRunOrder (keysArray) {
  let count
  if (Array.isArray(keysArray)) {
    count = keysArray.length
  } else {
    throw new TypeError('buildRotationalRunOrder is expecting an Array.')
  }
  let rot = 0
  const rotationalRunOrder = []

  for (let i = 0; i < count; i++, rot = i) {
    for (let j = 0; j < count; j++) {
      Array.prototype.push.call(rotationalRunOrder, keysArray[rot % count])
      rot++
    }
  }

  return rotationalRunOrder
}

function getHotPlugSetup (setup) {
  const hotPlugSetup = {
    packs: {},
    tests: setup.tests
  }
  let hotDupe; let packsCount = 0
  for (const prop in setup.packs) {
    hotDupe = 'du' + Math.floor(Math.random() * 10000000) + 'pe'
    hotPlugSetup.packs[hotDupe] = setup.packs[prop]
    packsCount++
  }
  if (packsCount === 0) {
    throw new Error('No packs detected!')
  }
  for (const prop in setup.packs) {
    hotPlugSetup.packs[prop] = setup.packs[prop]
  }
  return hotPlugSetup
}

module.exports.buildRotationalRunOrder = buildRotationalRunOrder
module.exports.getHotPlugSetup = getHotPlugSetup

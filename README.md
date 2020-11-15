# racepacks

**racepacks** can compare the execution speed of multiple sets of instructions, functions, packs etc.

When running with Node.js **racepacks** has nanosecond precision. This is the recommended way of running **racepacks** if possible.
 
When running in browser **racepacks** has millisecond precision.

* Examples
  * [racepacks in Node.js](#racepacks-in-node-js)
  * [racepacks in browser](#racepacks-in-browser)
* <a href="https://nicolaeiotu.github.io/racepacks" target="_blank" title="racepacks Documentation">Documentation</a>
* [Others](#others)

## Examples
The constructor is expecting a special `setup` object formatted as per examples below:

### racepacks in Node.js
```
const { Racepacks } = require('racepacks')

const setup = {
  packs: {
    // racing function 'op1'
    op1: (x) => {
      // racing content
      Math.sqrt(x)
      // ...
    },

    // racing function 'op2'
    op2: (x) => {
      // racing content
      Math.sqrt(Math.sqrt(x))
      // ...
    },

    // racing function 'op3'
    op3: (x) => {
      // racing content
      Math.sqrt(Math.sqrt(Math.sqrt(x)))
      // ...
    },

    // racing function 'op4'
    op4: (x) => {
      // racing content
      Math.sqrt(Math.sqrt(Math.sqrt(Math.sqrt(x))))
      // ...
    }
  },
  tests: [1, 2, 55, 190]
}

const example1 = new Racepacks(
    // the setup object
    setup, 

    // output results/test in table format (the summary is always in table format)
    // default: true
    true, 

    // a value for 'this' when used within the functions called in 'setup'
    // default: null
    null, 

    // keep silent
    // default: false
    false)
```

Sample output:

  <span style="background-color: lawngreen; color: black; font-weight: bold;">
    &nbsp;*** racepacks Results ***&nbsp;</span>
  <br>
  <span style="color: red;"> Nanosecond precision </span><br>
  ( *  <span style="color: lawngreen; background-color: grey;">&nbsp;fastest&nbsp;</span>  )
  <table>
  <thead>
    <tr>
      <th>(index)</th>
      <th>Arguments / Test</th>
      <th>op1</th>
      <th>op2</th>
      <th>op3</th>
      <th>op4</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>'1'</td>
      <td>40</td>
      <td>'38 *'</td>
      <td>53</td>
      <td>46</td>
    </tr>
    <tr>
      <td>1</td>
      <td>'2'</td>
      <td>'25 *'</td>
      <td>29</td>
      <td>29</td>
      <td>32</td>
    </tr>
    <tr>
      <td>2</td>
      <td>'55'</td>
      <td>'25 *'</td>
      <td>29</td>
      <td>41</td>
      <td>33</td>
    </tr>
    <tr>
      <td>3</td>
      <td>'190'</td>
      <td>'25 *'</td>
      <td>30</td>
      <td>30</td>
      <td>32</td>
    </tr>
  </tbody>
  </table>

  <span style="background-color: lawngreen; color: black; font-weight: bold;">
    &nbsp;*** racepacks Summary ***&nbsp;</span>
  <br>
  <span style="color: red;"> Nanosecond precision </span>
  
  <table>
  <thead>
    <tr>
      <th>(index)</th>
      <th>Pack</th>
      <th>Title</th>
      <th>Efficiency (% Last)</th>
      <th>Efficiency (% Next)</th>
      <th>Total tests time</th>
      <th>Wins</th>
      <th>Runs</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>0</td>
      <td>'op1'</td>
      <td>'Winner'</td>
      <td>'23.44 %'</td>
      <td>'6.34 %'</td>
      <td>36465</td>
      <td>3</td>
      <td>32</td>
    </tr>
    <tr>
      <td>1</td>
      <td>'op2'</td>
      <td>'2nd place'</td>
      <td>'16.08 %'</td>
      <td>'13.16 %'</td>
      <td>38777</td>
      <td>1</td>
      <td>32</td>
    </tr>
    <tr>
      <td>2</td>
      <td>'op3'</td>
      <td>'3rd place'</td>
      <td>'2.58 %'</td>
      <td>'2.58 %'</td>
      <td>43880</td>
      <td>0</td>
      <td>32</td>
    </tr>
    <tr>
      <td>3</td>
      <td>'op4'</td>
      <td>''</td>
      <td>'0.00 %'</td>
      <td>'0.00 %'</td>
      <td>45014</td>
      <td>0</td>
      <td>32</td>
    </tr>
  </tbody>
  </table>


### racepacks in browser
```
...
<head>
    ...
    <script src="./racepacks.bundle.js"></script>
    ...
...
    <script>
        const Racepacks = racepacksBundled.Racepacks;
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
        };
        
        const raceResults = new Racepacks(setup)
        console.log(raceResults.podium)
    </script>
...
```

For more examples see 'examples' folder.

## Others
**racepacks** itself runs single threaded and was meant to handle directly synchronous instructions only. While
 testing multithreading and/or async instructions might work, it's not guaranteed that the results will be accurate
  at this stage.

&copy; Copyright 2020 Nicolae Iotu, nicolae.g.iotu@gmail.com

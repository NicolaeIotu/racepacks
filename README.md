# racepacks

**racepacks** can reliably determine the fastest running set of instructions.
**racepacks** will run, measure, record output and display in a human readable format the race results after
 performing the tests indicated.

When running with Node.js, **racepacks** will redirect output and errors of the code being tested to a file located
 in the system temporary folder i.e. '/tmp/racepacks/racepacks_20201120_25101PM' (OS dependant). If required you can
 further analyze the output if any.
  
When running in browser extra content may appear in the console.

**racepacks** itself runs single threaded and in order to ensure the fairness of the tests a custom rotational order
 is used. This means that the functions being tested are rotated in such a way that multiple runs of each test are
 executed and for each of these runs the order of the functions is changed. If the tests time difference obtained
 after running Racepacks is small or comparable, it is recommended to run it a couple of times more. This is
 because even if special provisions are in place Racepacks cannot ensure constant processor time for the tests. If
 you know how to do this please contact the author :)
     
**racepacks** has nanosecond precision when running with Node.js, and microsecond or millisecond precision when
 running in the browser.

* Examples
  * [racepacks in Node.js](#racepacks-in-nodejs)
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

    // output results per test in table format (the summary is always in table format)
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

**` *** racepacks Results *** `**<br>
**` Nanosecond precision `**<br>
**` ( *  fastest  ) `**
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

**` *** racepacks Summary *** `**<br>
**` Nanosecond precision `**<br>
**` ( *  fastest  ) `**
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

**racepacks** is &copy; Copyright 2020 Nicolae Iotu, nicolae.g.iotu@gmail.com

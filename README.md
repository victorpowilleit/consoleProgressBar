# Overview
A simple progress bar for terminal and console.

<img width="220" alt="image" src="https://github.com/victorpowilleit/consoleProgressBar/assets/40838411/c7cc4903-7ab4-4f74-b552-00788dd4a990">

It receives 4 paramenter, explained bellow.

### bruteProgress:
 Simply the actual iteration of the measured process divided by the maximum iterations it shall run.

### length (optional):
 The length (in characters) the bar will take when completed.
 The default value is 20

### stepsToPrint (optional):
 Defines how many prints the bar will have until it reaches 100%
 It's default value is set to 100, so one print for every 1% of the bar. Larger numbers make the bar progress smoother, while smaller values may feel "bumpy".

### index (optional):
 This last value was included for cases where more than a single bar is placed at the same time (for handling sub-processes, for example, or deal with async processes). It simply defines a number (an index) to save the values used by each bar, so they won`t mess up - however it's not recommended at this point to use this, as it mantains de data properly but cant't yet show more than a single active bar at once.

## Usage
 Call showProgressBar as the first line inside your iteration cycle and then, as it can be really tricky to get a loop to properly send a "1" when it's life-cycle is over, is recommended to call it once again right after the end of it's iterations passing (1) as the bruteProgress param, granting then it will surely get to end.

## Install

You can install this lib with NPM:
```bash
npm install https://github.com/victorpowilleit/consoleProgressBar

```

## Examples

```javascript
import {showProgressBar} from 'consoleProgressBar'

// progress bar test
let progress = 0
const interval = setInterval(()=>{
    showProgressBar(progress/100)
    progress++
    progress>100&&clearInterval(interval)
}, 100)

```
The code above, being artificially created for doing so, ends properly at 100%, sending exacly 1 as param for the progreesion bar. That's, however, not aways the case.
Bellow, lies a more accurate example of how it's recommended to be used:

```javascript
import {showProgressBar} from 'consoleProgressBar'

function realWorldFunction(props){
  //start of a timing consuming iteration loop
  for(let i in longArray){
    const progress = i/longArray
    showProgressBar(progress)
    //data processing algorithm
  }
  showProgressBar(1)
  return something
}

'use strict'
// plugin for run time arguments
const promptly = require('promptly');

// to validate time format
const time_format = 'hh:mm:ss';

(async () => {
	try {
		// initial array for time inputs
		let time_input = []
	    
	    // asking for no of test case
	    const no_of_test = await promptly.prompt('The number of test cases to find lucky time ->');
	    console.info('The number of test cases entered:', no_of_test);

    	// converting time to test and prepare for asking time
    	let count_test = parseInt(no_of_test);
	    if ( parseInt(no_of_test) > 0 ) {


	    	// count and ask for time values
			for (var i = 1; i <= count_test; i++) {
				const enter_time = await promptly.prompt('Enter time '+(i)+' ->');

				// validating time format
				if (enter_time.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/i)) {

					// add if all correct
					time_input.push(enter_time)	

				} else {
					// throw if time format fails to validate
					throw new Error('Time format is incorrect for lucky time.')

				}
			}
			console.log('Time Selected:',time_input)

			// function to evaluate lucky time
			evaluate_lucky_time(time_input)
	    } else {

			console.log('Please add accurate arguments to find lucky time.')

	    }
	} catch (e) {
		console.log('Failed to find lucky time due to ' + e.message)
	}
})();

// minute second timer
function countMS (val, flag = 0) {
	let v = parseInt(val);
	let ev = ''
	if (v > 59) {
		ev = '0'+0
	} else if (v == 0) {
		ev = '0'+(v+1)
	} else if (v < 10) {
		ev = '0'+(v + flag)
	} else {
		ev = (v + flag);
	}
	return ev
}

// hour timer
function countH (val, flag = 0) {
	let v = parseInt(val);
	let ev = ''
	if (v >= 23) {
		ev = '0'+0
	} else if (v == 0) {
		ev = '0'+(v+1)
	} else if (v < 10) {
		ev = '0'+(v + flag)
	} else {
		ev = (v + flag);
	}
	return ev
}

// algorithm for lucky time finding
async function evaluate_lucky_time(time_input) {
	let time_output = []

	const times = [0,1,2,3,4,5]

	for (var i = 0; i < time_input.length; i++) {
		let splittime = time_input[i].split(':')
		// console.log('dd',time_input[i], splittime);
		let hh = parseInt(splittime[0])
		let mm = parseInt(splittime[1])
		let ss = parseInt(splittime[2])

		// inital count for second
		ss = countMS(ss, 1);
		mm = countMS(mm); 
		hh = countH(hh); 

		let isFinal = false;
		do {

			let str = ''+hh+mm+ss;
			let checkForNextCall = 0;
			let check = str.split('').map(o=>parseInt(o))
			for (var j = 0; j < times.length; j++) {
				let check2 = check.includes(times[j])
				// console.log('dd', check, str, times, check2, j, times[j])
				if (!check2) {
					// checkForNextCall--;
				} else {
					checkForNextCall++;
				}
			}

			if (checkForNextCall == times.length) {
				// console.log('checkForNextCall', str, checkForNextCall)
				isFinal = true
				let finalstr = str.substr(0,2)+':'+str.substr(2,2)+':'+str.substr(4,2)
				time_output.push(finalstr)
			} else {
				ss = countMS(ss, 1);	
				if (parseInt(ss) == 0) {
					mm = countMS(mm, 1);
					if (parseInt(mm) == 0) {
						hh = countH(hh, 1);
					}
				}
			}
		} while(!isFinal)

	}

	console.log('Lucky Time Output', time_output)
}

// Test:
// evaluate_lucky_time(['00:00:00'])
// evaluate_lucky_time(['12:59:59'])
// evaluate_lucky_time(['23:59:59'])
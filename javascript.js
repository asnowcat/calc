const INITIAL = 0;
const FINAL = 1;
const STRING = 'string';
const NUMBER = 'number';
const ADD = '+';
const SUB = '-';
const DIV = '/';
const MULT = 'x';
const CLEAR = 'C';
const RETURN = '=';
const OPERATORS = Object.freeze([ADD, SUB, DIV, MULT]);

var mode, op, buf;

function clear() { ret(0); }

function ret(x) {
	mode = INITIAL;
	op = null;
	buf = [x,0];
	display(buf[INITIAL]);
	
}

function display(x) {
	document.getElementById("display").innerHTML = x.toString();
}

function input(x) {
	let d = 'ERROR';
	if (x === CLEAR) {
		clear();
		return;
	}
	if (x === RETURN) {
		switch(op) {
			case ADD:
				buf[INITIAL] += buf[FINAL];
				buf[FINAL] = 0;
				break;
			case SUB:
				buf[INITIAL] -= buf[FINAL];
				buf[FINAL] = 0;
				break;
			case '*':
			case MULT:
				buf[INITIAL] *= buf[FINAL];
				buf[FINAL] = 0;
				break;
			case DIV:
				buf[INITIAL] /= buf[FINAL];
				buf[FINAL] = 0;
				break;
		}
		ret(buf[INITIAL]);
		return;
	}

	if (typeof(x) === NUMBER) {
		buf[mode] = buf[mode] * 10 + x;
		d = buf[mode];
	} else if (OPERATORS.includes(x) && mode === INITIAL) {
		mode = FINAL;
		op = x;
		d = op;
	}
	display(d);
}

function dump() {
	console.log('MODE     ' + mode);
	console.log('OP       ' + op);
	console.log('INITIAL  ' + buf[INITIAL]);
	console.log('FINAL    ' + buf[FINAL]);
}

document.addEventListener("keydown", event => {
	if (event.isComposing || event.keyCode === 229) {
	  return;
	}
	switch (event.keyCode) {
		case 61: input(ADD); return;
		case 107: input(ADD); return;
		case 173: input(SUB); return;
		case 109: input(SUB); return;
		case 88: input(MULT); return; // 'x'
		case 56: input(MULT); return; // '*'
		case 106: input(MULT); return; // '*'
		case 111: input(DIV); return;
		case 191: input(DIV); return;
		case 13: input(RETURN); return;
		case 67: input(CLEAR); return; // 'c'
	}
	if (event.keyCode >= 48 && event.keyCode <= 57) { // keyboard number keys
		input(event.keyCode - 48);
	}
	if (event.keyCode >= 96 && event.keyCode <= 105) { // numpad keys
		input(event.keyCode - 96);
	}
  });

clear();
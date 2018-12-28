// Command uname
function date () {
	var obj = {
		data : {
			miliseconds : {
				data : new Date(),
				__type : "string"
			},
			__type : "array"
		},
		
		get : function (args) {
			switch (args) {
				case 'm' :
					return "m";
				default :
					return 1+1;
			}
		}
	}
	return obj;
};

// Command uname
var uname = {
	data : {
		kernel : {
			data : "Linux",
			__type : "string"
		},
		nodename : {
			data : "LegacyIce-Antix",
			__type : "string"
		},
		machine : {
			data : "x86_64",
			__type : "string"
		},
		__type : "array"
	},
	
	get : function (args) {
		switch (args) {
			case 's' :
				return this.data.kernel.data;
			case 'n' :
				return this.data.nodename.data;
			case 'm' :
				return this.data.machine.data;
			default :
				return this.data.kernel.data;
		}
	},
	
	set : function () {
		return false
	},
	
	hack : function () {
		alert ("You Have Been Hacked");
	},
	
	man : {
		data : `NAME
	uname - print system information (*)

SYNOPSIS
	uname.get(OPTION)
	
DESCRIPTION
	with no option, same as -s
	s, print the kernel name
	n, print the network node hostname
	m, print the machine hardware name

AUTHOR
	Written by Mario Chorvath`,
		__type : "string"
	}
};

var obj;
var counter_one = 0;

// Event listener for FORM
var form = document.forms.namedItem ("form");
form.addEventListener ('submit', function (ev) {
	console.log ("Counter: "+counter_one);
	document.getElementById ("shell").value = document.getElementById ("shell").value.trim ();
	//~ if ((document.getElementById ("shell").value) && (document.getElementById ("shell").value != shellHistory[shellHistory.length - 1])) {
		//~ shellHistory.push (document.getElementById ("shell").value);
		//~ shellHistoryCount++;
		//~ shellHistoryCurrent++;
	//~ }
	console.log ('==='+document.getElementById ("shell").value.substr(0,3));
	if (document.getElementById ("shell").value.substr (0,3) == "ret") {
		ret ();
	}
	else {
		printObject (document.getElementById ("shell").value);
	}
	ev.preventDefault ();
}, false);

// Print object
function printObject (o) {
	//~ console.log(o);
	if (o) {
		obj = window[o]();
		//~ console.log(obj);
		document.getElementById ('output').innerHTML = obj;
	}
	else {
		document.getElementById ('output').innerHTML = '';
	}
	console.log ('PRINT');
}

// Print object
function ret () {
	console.log ("*******");
	
	var temp = document.getElementById ("shell").value.match (/([^ ]+) ?(.*)/);;
	
	console.log ("www: "+temp[1]+"   "+temp[2]);
	if (temp[2]) {
		//~ object = obj[temp[2]];
		strrr = '["data"]["miliseconds"]["data"]';
		object = obj+strrr;
		//~ object = obj.data.miliseconds.data;
	}
	else {
		object = obj;
	}
	// Trim object name
	//~ o = o.trim ();
	// Remove all dots from end of string
	if (object) {
		// If variable is string
		if (varType (object) == 'String' || varType (object) == 'Date') {
			document.getElementById ('output').innerHTML = object;
			console.log ("xxxxxxxxxxx");
		}
		// If variable is not a string
		else {
			var out = '';
			for (var p in object) {
				//~ console.log ("==="+p+":::"+obj[p]);
				out += p + ': ' + object[p] + '\n';
			}
			document.getElementById ('output').innerHTML = out;
			//~ document.getElementById ('output').innerHTML += object;
			//~ alert ("..."+out);
			console.log ("OUTPRE: "+object);
			console.log ("OUT: "+out);
		}
	}
	else {
		document.getElementById ('output').innerHTML = '';
	}
	counter_one++;
}

// Get real type of variable
function varType (obj) {
    var clas = Object.prototype.toString.call (obj).slice (8, -1);
    return clas;
}

// Recursive access to object by variable
function fetchFromObject(obj, prop) {

    if(typeof obj === 'undefined') {
        return false;
    }

    var _index = prop.indexOf('.')
    if(_index > -1) {
        return fetchFromObject(obj[prop.substring(0, _index)], prop.substr(_index + 1));
    }

    return obj[prop];
}

//~ function getAllMethods (object) {
	//~ return Object.getOwnPropertyNames (object).filter (function (property) {
	//~ return typeof object[property] == 'function';
	//~ });
//~ }

//~ function System () {
	//~ function FileSystem () {
	//~ function Xorg () {
		//~ function Windows () {
					//~ ...
					//~ date
					//~ uname
					
		//~ }
	//~ }
//~ }

// Command date
function date () {

	var obj = {

		data : {
			miliseconds : {
				data : null,
				__type : "Number"
			},
			iso : {
				data : "",
				__type : "String",
				__format : "ISO 8601"
			},
			__type : "Array"
		},
		
		get : function (args) {
			switch (args) {
				case 'm' :
					return Date.now ();
				default :
					return Date ();
			}
		},
		
		set : function (args) {
				return false;
		},

		man : {
		data : `NAME
	date - print or set the system date and time

SYNOPSIS
	date.get(OPTION)
	
DESCRIPTION
	with no option, show date in ISO 8601 format
	m, print UNIX Epoch time

AUTHOR
	Written by Mario Chorvath`,
		__type : "string"
		}
	}
	
	obj.data.miliseconds.data = Date.now();
	obj.data.iso.data = Date();
	
	return obj;
};

// Command uname
function uname () {
	var obj = {
		data : {
			kernel : {
				data : "Linux",
				__type : "String"
			},
			nodename : {
				data : "LegacyIce-Antix",
				__type : "String"
			},
			machine : {
				data : "x86_64",
				__type : "String"
			},
			__type : "Array"
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
			__type : "String"
		}
	}
	
	return obj;
};

var obj;
var counter_one = 0;

// Event listener for FORM
var form = document.forms.namedItem ("form");
form.addEventListener ('submit', function (ev) {
	document.getElementById ("shell").value = document.getElementById ("shell").value.trim ();
	if ((document.getElementById ("shell").value) && (document.getElementById ("shell").value != shellHistory[shellHistory.length - 1])) {
		shellHistory.push (document.getElementById ("shell").value);
		shellHistoryCount++;
		shellHistoryCurrent++;
	}
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
	if (o) {
		obj = window[o]();
		document.getElementById ('output').innerHTML = obj;
	}
	else {
		document.getElementById ('output').innerHTML = '';
	}
}

// Print object
function ret () {

	var temp = document.getElementById ("shell").value.match (/([^ ]+) ?(.*)/);;

	if (temp[2]) {
		object = fetchFromObject (obj, temp[2]);
	}
	else {
		object = obj;
	}
	// Remove all dots from end of string
	if (object) {
		// If variable is string
		if (varType (object) != 'Object') {
			document.getElementById ('output').innerHTML = object;
		}
		// If variable is not a string
		else {
			var out = '';
			for (var p in object) {
				out += p + ': ' + object[p] + '\n';
			}
			document.getElementById ('output').innerHTML = out;
		}
	}
	else {
		document.getElementById ('output').innerHTML = 'No';
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
        return fetchFromObject (obj [prop.substring (0, _index)], prop.substr (_index + 1));
    }
    else {
		if (prop.indexOf ('(') > -1) {
			var position = prop.indexOf ('(')
			var matches = prop.match (/\((.*)\)/);
			prop = prop.substring (0, position);
			return obj[prop](matches[1].replace(/['"]+/g, ''));
		}
		else {
			return obj[prop];
		}
	}
}

//~ function getAllMethods (object) {
	//~ return Object.getOwnPropertyNames (object).filter (function (property) {
	//~ return typeof object[property] == 'function';
	//~ });
//~ }

if (document.getElementById ("shell") != null) {
		document.getElementById ("shell").focus();
}

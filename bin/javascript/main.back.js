// Command uname
var date = {
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

// Event listener for FORM
var form = document.forms.namedItem ("form");
form.addEventListener ('submit', function (ev) {
	//~ document.getElementById ("shell").value = document.getElementById ("shell").value.trim ();
	if ((document.getElementById ("shell").value) && (document.getElementById ("shell").value != shellHistory[shellHistory.length - 1])) {
		shellHistory.push (document.getElementById ("shell").value);
		shellHistoryCount++;
		shellHistoryCurrent++;
	}
	console.log (shellHistory);
	printObject (document.getElementById ("shell").value);
	ev.preventDefault ();
}, false);

// Print object
function printObject (o) {
	// Trim object name
	o = o.trim ();
	// Remove all dots from end of string
	while (o[o.length-1] === ".")
	o = o.slice (0,-1);
	if (o) {
		// Split string by firs dot
		var temp = o.match (/([^\.]+)\.?(.*)/);
		//~ console.log ("obj: "+temp[1]);
		//~ console.log ("prop: "+temp[2]);
		var obj_temp = window[temp[1]];
		var prop = temp[2];
		
		if (obj_temp) {
			obj = eval (o);
			// If variable is string
			if (typeof (obj) == "string") {
				document.getElementById ('output').innerHTML = obj;
			}
			// If variable is not a string
			else {
				var out = '';
				for (var p in obj) {
					out += p + ': ' + obj[p] + '\n';
				}
				document.getElementById ('output').innerHTML = out;
			}
		}
	}
	else {
		document.getElementById ('output').innerHTML = '';
	}
}

//~ function getAllMethods (object) {
	//~ return Object.getOwnPropertyNames (object).filter (function (property) {
	//~ return typeof object[property] == 'function';
	//~ });
//~ }

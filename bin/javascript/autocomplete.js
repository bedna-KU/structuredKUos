// ###########################################################################
// Aaron web operating system
// https://github.com/bedna-KU/Aaron
// ---------------------------------------------------------------------------
// Autocomplete for commandline
// JavaScript functions
// Command for kernelultras 0.0.1
// (D.M.Y) 31.07.2011
// Author: Mário Chorváth - Bedna
// License GPLv2: GNU GPL version 2 https://www.gnu.org/licenses/gpl-2.0.html.
// This is free software: you are free to change and redistribute it.
// There is NO WARRANTY, to the extent permitted by law.
// ###########################################################################

// Variables
var subDir = "";
var matches = [];
var myInput = document.getElementById ("shell");
var myInputArea = document.getElementById ("content");
var autocmpCMD = autocmpCMDcommands;
var pwd = "";
var userLoginName = "guest";
var sessionID = "1";

// Regex for first slash
var slashAtBeginning = new RegExp ("^.* /");

// Read directory with XHR
readDirectory ();

// ====================================================================
// Search command by regex and return him,
// or return all similiar commands by regex
// ====================================================================
function searchStringInArray (str, strArray) {
	// Regex to search command from beginning of string
	var rgxp = new RegExp ("^"+str+".*", "g");
	matches = [];
	// Search matches in array with commands
	for (var i = 0; i < strArray.length; i++) {
		if (strArray[i].match (rgxp)) {
			matches.push (strArray[i]);
		}
	}
	return matches;
}

// ====================================================================
// Add event listener on keypressed
// ====================================================================
// If command line
if (myInput) {
	if (myInput.addEventListener) {
		myInput.addEventListener ('keydown',this.keyHandlerAuto,false);
	} else if (myInput.attachEvent) {
		myInput.attachEvent ('onkeydown',this.keyHandlerAuto); /* damn IE hack */
	}
}
// If textarea
if (myInputArea) {
	if (myInputArea.addEventListener) {
		myInputArea.addEventListener ('keydown',this.keyHandlerAuto,false);
	} else if (myInputArea.attachEvent) {
		myInputArea.attachEvent ('onkeydown',this.keyHandlerAuto); /* damn IE hack */
	}
}

// ====================================================================
// Key handler, autocompete command, or part of command
// ====================================================================
function keyHandlerAuto (e) {
	// Keycode for TAB
	var TABKEY = 9;
	// Keycode for slash
	var SLASH = 111;
	// Keycode for backspace
	var BACKSPACE = 8;
	// If slash on beginning, scan root directory
	if (this.value) {
		if (this.value.match (slashAtBeginning)) {
			pwd = "";
			readDirectory ();
		}
	}
	// If pressed Backspace
	if (e.keyCode == BACKSPACE) {
		subDir = "";
	}
	sh = document.getElementById("shell");
	// If pressed TAB
	if (e.keyCode == TABKEY && document.getElementById("shell")) {
		// Get Current cursor position
		var currentCursorPos = sh.selectionStart;
		// Part of commandline from beginning to cursor
		var CMDlineBeginning = sh.value.substring (0, currentCursorPos);
		///console.log (CMDlineBeginning);
		// Part of commandline from cursor to end
		var CMDlineEnd = sh.value.substring (currentCursorPos, sh.value.length);
		// Regex to extract (part) command on current position
		var rgxp2 = /[a-zA-Z0-9\.\/@_-]+$/g;
		//~ var rgxp2 = new RegExp ("[a-zA-Z0-9_\./@-]+$", "g");
		var tempLastCMD = CMDlineBeginning.match (rgxp2);
		// If finds one or more matches in commands array
		///console.log (sh.value);
		if (searchStringInArray (tempLastCMD && tempLastCMD[tempLastCMD.length - 1], autocmpCMD)) {
			// Matches writes in a row separated spaces
			var output = matches.join (' ');
			// If search only one match, autocomplete command or path
			if (matches.length == 1) {
				// Output
				if (matches[0].slice (-1) == "/") {
					sh.value = CMDlineBeginning + matches[0].substring (tempLastCMD[0].length, matches[0].length);
					subDir = matches[0];
					// autocmpCMD.push (subDir);
					readDirectory (sh.value);
				}
				else {
					sh.value = CMDlineBeginning + matches[0].substring (tempLastCMD[0].length, matches[0].length) + " ";
					subDir = subDir.substring (0, subDir.lastIndexOf('/'));
					readDirectory (sh.value);
				}
				// Count right cursor position
				cursorOffset = matches[0].substring (tempLastCMD[0].length, matches[0].length).length + 1;
				sh.value += CMDlineEnd;
				sh.selectionStart = currentCursorPos + cursorOffset;
				sh.selectionEnd = sh.selectionStart;
				// Clear autocomplete line
				document.getElementById ("autocomplete").innerHTML = "";
			}
			// If search more then one match, write all matches
			else if (matches.length > 1) {
				document.getElementById ("autocomplete").innerHTML = output;
				// Set minPosition to 999, because search match in all matches
				var minPosition = 999;
				var tempPosition = 0;
				// Loop for all commands and paths
				for (var i = 1; i < matches.length; i++) {
					// Loop for all charakters of expression
					for (var j = 0; j <= matches[0].length; j++) {
						// Compare matches
						if (matches[0].substring (0, j) == matches[i].substring (0, j)) {
							tempPosition = j;
						}
					}
					// Search match in all matchces (Select minimal)
					if (tempPosition < minPosition) {
						minPosition = tempPosition;
					}
					// Output
					sh.value = CMDlineBeginning + matches[0].substring (tempLastCMD[0].length, minPosition);
					// Count right cursor position
					cursorOffset = minPosition - tempLastCMD[0].length;
					sh.value += CMDlineEnd;
					sh.selectionStart = currentCursorPos + cursorOffset;
					sh.selectionEnd = sh.selectionStart;
				}
				matches = [];
			}
			else {
				// Print all matches
				output = matches.join (' ');
				document.getElementById ("autocomplete").innerHTML = output;
			}
		}
		// Prevent default action
		if (e.preventDefault) {
			e.preventDefault ();
		}
		return false;
	}
}

// ====================================================================
// XHR - read directory
// ====================================================================
function readDirectory () {
	// Define worker for read directory
	var worker_autocomplete = new Worker ('bin/javascript/worker_autocomplete.js');
	userLoginName_enc = encodeURIComponent (userLoginName);
	// Aray for send to worker
	///console.log ("PWD :"+pwd+"xxxxx");
	autocomplete_array = {"pwd": pwd, "subDir": subDir, "sessionID": sessionID, "userLoginName": userLoginName_enc};
	// Send array to worker
	worker_autocomplete.postMessage (autocomplete_array);
	///worker_autocomplete.terminate ();
	// Event worker - after successfully read directory on server
	worker_autocomplete.onmessage = function (event) {
		// Returned list files from server
		var json_data_files = event.data;
		// Parse list files to array
		if (json_data_files) {
			//~ console.log (":::" + json_data_files);
			var obj_files = JSON.parse (json_data_files);
		}
		// Insert autocomplete paths to array
		if (typeof obj_files != 'undefined') {
			autocmpCMD = obj_files;
			// Add commands to autocomplete array
			autocmpCMD = autocmpCMD.concat (autocmpCMDcommands);
		}
		// Terminate worker
		worker_autocomplete.terminate ();
	}
}

// ###########################################################################
// Aaron web operating system
// https://github.com/bedna-KU/Aaron
// ---------------------------------------------------------------------------
// Shortcuts
// JavaScript functions
// Command for kernelultras 0.0.1
// (D.M.Y) 31.07.2011
// Author: Mário Chorváth - Bedna
// License GPLv2: GNU GPL version 2 https://www.gnu.org/licenses/gpl-2.0.html.
// This is free software: you are free to change and redistribute it.
// There is NO WARRANTY, to the extent permitted by law.
// ###########################################################################

// Variables
///var myInput = document.getElementById ("shell");

// ====================================================================
// Add event listener on keydown
// ====================================================================
document.body.addEventListener("keydown", onkeydown);

// ====================================================================
// If pressed Ctrl+
// ====================================================================

function onkeydown (event) {
	// --------------------------------------------------------------------
	// If pressed Ctrl+N
	// --------------------------------------------------------------------
	if (event.ctrlKey && event.keyCode == 88) {
		event.preventDefault ();
		window.location.href = "index.php?shell=news";
	}
	// --------------------------------------------------------------------
	// If pressed Ctrl+V
	// --------------------------------------------------------------------
	if (event.ctrlKey && event.keyCode == 86) {
		// Preserve work only on body
		if (document.activeElement.id != "shell" && document.activeElement.id != "content" && document.activeElement.tagName != "TEXTAREA" && document.activeElement.tagName != "INPUT") {
			// Get output
			var x = document.getElementsByClassName ("clipboard");
			// Create textarea
			x[0].innerHTML = '<textarea class="" id="clipboard" rows="0" cols="0"></textarea>';
			// Focus textarea
			clipboard.focus ();
			// Add event úaste on textarea
			document.getElementById("clipboard").addEventListener("paste", getClipboard, false);
			// Run paste into clipboard
		}
	}
	// --------------------------------------------------------------------
	// If pressed Ctrl+C
	// --------------------------------------------------------------------
	else if (event.ctrlKey && event.keyCode == 67) {
		// Get selected text from textarea getElementById("content")
		if (document.getElementById ("content")) {
			var activeItem = "content";
		}
		else if (document.getElementById ("shell")) {
			var activeItem = "shell";
		}
		if (document.getElementById ("textarea")) {
			var activeItem = "textarea";
		}
		if (activeItem) {
			var selectedItem = document.getElementById (activeItem);
			var selectedStart = selectedItem.selectionStart;
			var selectedEnd = selectedItem.selectionEnd;
			if (selectedEnd - selectedStart > 0) {
				var selectedText = selectedItem.value.substring(selectedStart, selectedEnd);
			}
		}
		// Run copy only if no selected text in page and textarea getElementById("content")
		if (window.getSelection() == "" && typeof selectedText === 'undefined') {
			var worker_read_clipboard = new Worker ('bin/javascript/worker_read_clipboard.js');

			userLoginName_enc = encodeURIComponent (userLoginName);

			download_array = {"name": "clipboard", "sessionID": sessionID, "userLoginName": userLoginName_enc};

			worker_read_clipboard.postMessage (download_array);
			// worker_write_clipboard.terminate ();
			// Event worker - after successfully write clipboard on server
			worker_read_clipboard.onmessage = function (event) {
				var textContent = event.data;
				var x = document.getElementsByClassName ("clipboard");
				x[0].innerHTML = '<textarea id="clipboard" rows="20"></textarea>';
				// document.designMode = "on";
				// clipboard.contentEditable = "true";
				clipboard.value = textContent;
				clipboard.focus ();
				clipboard.select ();
				// copyToClipboard ();
				worker_read_clipboard.terminate ();
			}
		}
	}
}

// Not work in FireFox
//~ function copyToClipboard () {
	//~ var successful = document.execCommand('copy');
	//~ if (successful) {
		//~ console.log ("OK");
	//~ }
	//~ else {
		//~ console.log ("NO");
	//~ }
 //~ }

// ====================================================================
// Get text from local clipboard
// ====================================================================
function getClipboard (e) {
	var pastedText = undefined;
	// Trapping data from clipboard
	if (window.clipboardData && window.clipboardData.getData) {
		pastedText = window.clipboardData.getData ('Text');
	}
	else if (e.clipboardData && e.clipboardData.getData) {
		pastedText = e.clipboardData.getData ('text/plain');
	}
	// Write clipboard into file with XHR2
	writeClipboard (pastedText);
}

// ====================================================================
// XHR - Write clipboard to server
// ====================================================================
function writeClipboard (clipboard) {
	// New worker for upload clipboard
	var worker_write_clipboard = new Worker ('bin/javascript/worker_write_clipboard.js');
	// Encode clipboard and uer login name
	clipboard_enc = encodeURIComponent (clipboard);
	userLoginName_enc = encodeURIComponent (userLoginName);
	// Array for worker
	upload_array = {"name": "clipboard", "content": clipboard_enc, "size": clipboard_enc.length, "sessionID": sessionID, "userLoginName": userLoginName_enc};
	// Spawn worker
	worker_write_clipboard.postMessage (upload_array);
	// worker_write_clipboard.terminate ();
	// Event worker - after successfully write clipboard on server
	worker_write_clipboard.onmessage = function (event) {
		var textContent = event.data;
		var x = document.getElementsByClassName ("clipboard");
		// If clipboard successfully uploaded
		if (textContent == "OK") {
			x[0].innerHTML = '<h1 class="green">Text copied successfully into remote clipboard</h1>';
		}
		else {
			x[0].innerHTML = '<h1 class="red">'+textContent+'</h1>';
		}
		// Terminate worker
		worker_write_clipboard.terminate ();
	}
}

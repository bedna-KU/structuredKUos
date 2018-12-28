<body>
	<div id = "ku_win">
		{% req=shell, $shell_request %}				// Run command from $_REQUEST
		<div id="root_mail">
			{{ show_root_messages }}				// Show messages for root
		</div>
		<div id="mail">
			{{ show_emails }}						// Show internal emails
		</div>
		<div id="chat">
			{{ show_chat }}							// Show chat
		</div>
		{{ show_current_command }}					// Show current command
		<div id="output">
			<div class="clipboard"></div>
			{% show_output, req %}					// Show output from command
		</div>
		{{ input }}									// Show command line
		{{ javas, bin/javascript/shortcuts.js }}	// Run javascript
		{{ javas, bin/javascript/history.js }}		// Run javascript
		{{ javas, bin/javascript/move_on_page.js }}	// Run javascript
		{{ javas, bin/javascript/autocomplete.js }}	// Run javascript
		{{ javas, bin/javascript/javascript.js }}	// Run javascript
		{{ javas, bin/javascript/scroll_down.js }}	// Run javascript
	</div>
</body>

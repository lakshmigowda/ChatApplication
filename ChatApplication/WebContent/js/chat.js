/*Chat object, which holds list of  messages*/
var chat = function(name, msgs) {
	this.name = name;
	this.msgs = msgs;
	this.display = function() {
		var text = "";
		for (index in msgs) {
			text += msgs[index].name + ":" + msgs[index].info + "<br>";
		}
		return text;
	}
	this.addmsg = function(msg) {
		this.msgs.push(msg);
	}
};

/* Message object, which holds a message in <sender name, message text> format */
var msg = function(name, info) {
	this.name = name;
	this.info = info;
};

/* Global variables */
var chatX, chatY, chats, user;

/* Load the hard coded messages once the body is loaded */
function loadchat() {
	var msgX = new msg("Tom", "hello");
	var msgY = new msg("Luci", "hi");
	var msgZ = new msg("David", "hello");
	var msgsX = [ msgX, msgY ];
	var msgsY = [ msgZ, msgY ];

	chatX = new chat("Tom", msgsX);
	chatY = new chat("David", msgsY);
	chats = [ chatX, chatY ];
	user = "";
	document.getElementById("history").innerHTML = "<p class='listname' onclick='handleHistoryClick(this.id)' id="
			+ chatX.name
			+ ">"
			+ chatX.name
			+ "</p>"
			+ "<p class='listname' onclick='handleHistoryClick(this.id)' id="
			+ chatY.name + ">" + chatY.name + "</p>"
}

/* Handler to send a message */
function handleSend() {
	var msgX = new msg("Luci", document.getElementById("text").value);
	for (index in chats) {
		if (chats[index].name == user) {
			chats[index].addmsg(msgX);
			var content = document.getElementById("content");
			content.innerHTML = chats[index].display();
			document.getElementById("text").value = "";
			content.scrollTop = content.scrollHeight;
		}
	}
}

/* Handler for history click */
function handleHistoryClick(name) {
	user = name;
	for (index in chats) {
		if (chats[index].name == name) {
			document.getElementById("content").innerHTML = chats[index]
					.display();
			document.getElementById("heading").innerHTML = "Your chat with "
					+ name
		}
	}
}

/* Handler to send message on enter key press */
function handleKeyPress(e) {
	if (e.keyCode == 13) {
		handleSend();
		return false;
	}
}

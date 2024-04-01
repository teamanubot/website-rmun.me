window.onload = function (e) {
	liff.init(function () {
		makeList();
	});
};

function getP() {
	var type = getParameterByName("type");
	if(!type) {
		document.getElementById("home").src = "bg.jpg";
	}
	else
	{
		makeList();
	}
}

function getParameterByName(name, url) {
	if(!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if(!results) return null;
	if(!results[2]) return "";
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function getProfile(){
	liff.getProfile().then(function (profile) {
		document.getElementById("userid").textContent = "Hai  " + profile.displayName;
		document.getElementById("main").src = profile.pictureUrl;
		document.getElementById("close").addEventListener("click", function () {
			liff.closeWindow();
		});
	});
}

function makeList(){
	var type = getParameterByName("type");
	url = getParameterByName("url");
	url2 = getParameterByName("url2");
	text = getParameterByName("text");
	img = getParameterByName("img");
	ocu = getParameterByName("ocu");
	piu = getParameterByName("piu");


	if(type == "text" && text !== "undefined") {
		liff.sendMessages([{
			type: "text",
			text: text
		}]).then(function () {
			liff.closeWindow();
		});
	};

	if(type == "image" && img !== "undefined") {
		liff.sendMessages([{
			type: "image",
			originalContentUrl: img,
			previewImageUrl: img
		}]).then(function () {
			liff.closeWindow();
		});
	};

	if(type == "video" && ocu !== "undefined" && piu !== "undefined") {
		liff.sendMessages([{
			type: "video",
			originalContentUrl: ocu,
			previewImageUrl: piu
		}]).then(function () {
			liff.closeWindow();
		});
	}

	if(type == "template" && url !== "undefined" && url2 !== "undefined") {
		liff.sendMessages([
			{
				"type": "template",
				"altText": "Rivai Cogans~",
				"template": {
					"type": "image_carousel",
					"columns": [
						{
							"imageUrl": url,
							"action": {
								"type": "uri",
								"uri": url2
							}
						}
					]
				}
			}
		]).then(function () {
			liff.closeWindow();
		}
	}
	else
	{
		liff.closeWindow();
	}
}
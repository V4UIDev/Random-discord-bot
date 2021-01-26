const request = require('request');
const cheerio = require('cheerio');
const discord = require('discord.js');
const botClient = new discord.Client();


botClient.login("ENTER BOT TOKEN HERE");

botClient.on('ready', () =>{
	console.log(`${botClient.user.tag} has logged in`)
})

const isValidCommand = (message, cmdName) => message.content.toLowerCase().startsWith(">" + cmdName); // setting a regular symbol to call the bot

botClient.on('message', async function(message){
	if(message.author.bot) return;
	if(isValidCommand(message, "randomfact")){
		message.reply("here is a cool fact!")
		const url = 'http://randomfactgenerator.net/';
		factSearch(url);
		

	} // Calls the command

	if(isValidCommand(message,"randomanimal")){
		let numberRandAn = Math.floor(Math.random() * 21).toString();
		let numberRandPg = Math.floor((Math.random() * 3) + 1).toString();
		let animalArray = ['dog','cat','fish','bird','horse','lion','giraffe','elephant','deer','bear','snake','cow','pig','sheep','duck','chicken','panda','monkey','gorilla','rhino','hedgehog'];

		const animalUrl = ('https://results.dogpile.com/serp?qc=images&q=' + animalArray[numberRandAn] + '&page=' + numberRandPg + '&sc=2PJid7PeMHmG20');
		animalSearch(animalUrl);
		// Random animal search
	}

	if(isValidCommand(message, "urlshorten")){
		let messageArr = message.content.split(" ");
		let url = ("https://is.gd/create.php?format=simple&url=" + messageArr[1]);
		console.log(url);
		urlShorten(url);
		/* Shortens a url using the is gd website.
		I did think about using the node package but decided
		against it to keep to bot as simple as possible. */
	}

	if(isValidCommand(message, "piglatin")){
		let messageArr = message.content.split(" ");
		console.log(messageArr);
		translatePigLatin(messageArr);
		// Translates a statement into Pig Latin xD
	}

	function factSearch(url){
	var options = {
	url: url,
	method: "GET"
	
};

request(options, function(error, response, responseBody){
	if(error){
	return console.log('The service is down.');
	message.channel.send("The service is down.");
	}
	$ = cheerio.load(responseBody);
	const randomfactResponse = $("#z");
	let randomfactText = (randomfactResponse.text());
	let randomfactRegex = /\w+.*\n/i;
	let randomfactResponseTranslate = randomfactText.match(randomfactRegex);

	// Scrapes fact from website, and uses regular expressions to change it to the desired output.
	
	message.channel.send(randomfactResponseTranslate);
	

})
}

function animalSearch(animalUrl){
	var options = {
	url: animalUrl,
	method: "GET",
	headers: {
		"Accept":"text/html",
		"User-agent":"Chrome"
	}
};
request(options, function(error, response, responseBody){
	if(error){
		return console.log("An error has occured");
		message.channel.send("An error has occured.");
	}
	$ = cheerio.load(responseBody)
	var links = $(".image a.link");
	var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
	let channelResponse = urls[Math.floor(Math.random() * urls.length)];
	console.log(channelResponse);

	if(channelResponse === undefined){
		animalSearch(animalUrl);
	}else{
	message.channel.send(channelResponse);
	} // Searches for an animal image, loops function if match is undefined.
})
}

function urlShorten(url){
	var options = {
	url: url,
	method: "GET",
	headers: {
		"Accept":"text/html",
		"User-agent":"Chrome"
	}
};
request(options, function(error, response, responseBody){
		if(error){
		return console.log("An error has occured");
		message.channel.send("An error has occured.");
	}
	$ = cheerio.load(responseBody);
	let shortenedUrl = $("body").text();
	message.reply(shortenedUrl); // Gets the shortened URL from the is.gd website.

});
}

function translatePigLatin(messageArr) {

let newArr = [];

for(i = 1; i < messageArr.length; i++){
 let str = messageArr[i]
  let strSingle = str.match(/\w/g);
  let strFirst = strSingle[0].match(/[aeiou]/i);
  let strStart = str.match(/[^aeiou]+/).join("");
  let strStartValue = strStart.match(/\w/g);

  if(strFirst == null){
    strSingle.push(strStart)
    strSingle.splice(0, strStart.length);
    strSingle.push("a","y")
    newStr = strSingle.join("");
    console.log(newStr)
    newArr.push(newStr);
  } else if(strStart !== null) {
    newArr.push(str + "way");
	}
  }

  console.log(newArr);
  let pigTranslate = newArr.join(" ");
  message.channel.send(pigTranslate);

  // Translating to pig latin function
}
});










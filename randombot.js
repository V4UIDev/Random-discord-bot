const request = require('request');
const cheerio = require('cheerio');
const discord = require('discord.js');
const botClient = new discord.Client();


botClient.login("PUT BOT TOKEN HERE");

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

		// Chooses a random animal from the array and a random page to pick the image from and puts the choices into an array
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
	/* picks a random url from the urls given from the webscrape,
	and makes sure it is not undefined */
	console.log(channelResponse);

	if(channelResponse === undefined){
		animalSearch(animalUrl);
	}else{
	message.channel.send(channelResponse);
	}
})

}
})








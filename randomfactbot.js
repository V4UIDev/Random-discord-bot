const request = require('request');
const cheerio = require('cheerio');
const discord = require('discord.js');
const botClient = new discord.Client();


botClient.login("ENTER DISCORD BOT TOKEN HERE");

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
})








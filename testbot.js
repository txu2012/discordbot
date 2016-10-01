var Discord = require("discord.js");
var PixivAppApi = require("pixiv-app-api");
var pixivImg = require("pixiv-img");
var Danbooru = require("danbooru");

var bot = new Discord.Client();
const pixiv = new PixivAppApi("temp1" , "temp2");

	
bot.on("message", (message) => {
	
	let prefix = "!";
	
	if(!message.content.startsWith(prefix)) return;
	
	// Auto Response Phrases
	
    if (message.content.startsWith(prefix + "ping")) {
        message.channel.sendMessage("pong!");
    }
	
	if (message.content.startsWith(prefix + "wan")) {
		message.channel.sendMessage("WanWan Army WanWan");
	}
	
	if (message.content.startsWith(prefix + "naru")) {
		message.channel.sendMessage("Get out of here <@104683226840170496> you Kotori");
	}
	
	if (message.content.startsWith(prefix + "random")) {
		message.channel.sendMessage(Math.floor(Math.random()*(100-0)));
	}
	
	if (message.content.startsWith(prefix + "rand")) {
		let args = message.content.split(" ").slice(1);
		let x = args[0];
		let y = args[1];
		message.channel.sendMessage(Math.floor(Math.random() * (y-x+1)) + (x-1+1));
	}
	
	if(message.content.startsWith(prefix + "commands")) {
		message.channel.sendMessage("List of commands: !ping , !wan , !random , !rand <min> <max> , !blackjack ");
	}
	
	// Auto Games
	
	if(message.content.startsWith(prefix + "blackjack")) {
		message.channel.sendMessage("Lets play a game of blackjack. I go first.");
		
		function cards(x) {
			if(x === 8) {
				return "8";
			}
			else if(x === 11) {
				return "Jack";
			}
			else if(x === 12) {
				return "Queen";
			}
			else if(x === 13) {
				return "King";
			}
			else if(x === 1 || x === 14) {
				return "Ace";
			}
			else {
				return x;
			}
		}		
		
		var i = 0;
		var j = 0;
		let botX = Math.floor(Math.random() * (14)) + 1;
		let playerX = Math.floor(Math.random() * (14)) + 1;
		
		message.channel.sendMessage("I got a(n):" + cards(botX));
		if(botX === 10 || botX === 11 || botX === 12 || botX === 13) {
			botX = 10;
		}
		else if(botX === 14 || botX === 1) {
			botX = 11;
		}
		
		let combinedBot = botX;
		
		console.log(combinedBot, "bot card"); // Testing in console
		
		message.channel.sendMessage("You got a(n):" + cards(playerX));
		if(playerX === 10 || playerX === 11 || playerX === 12 || playerX === 13) {
			playerX = 10;
		}
		else if(playerX === 14 || playerX === 1) {
			playerX = 11;
		}
		
		let combinedPlayer = playerX;
		
		console.log(combinedPlayer, "player card"); // Testing in console
		
		for(i = 0; i < 100; i++) {
			botX = Math.floor(Math.random() * (14)) + 1;
			message.channel.sendMessage("I got a(n):" + cards(botX));
			if(botX === 10 || botX === 11 || botX === 12 || botX === 13) {
				botX = 10;
			}
			else if(botX === 14 || botX === 1) {
				botX = 11;
			}
			
			console.log(botX, "bot card"); // Testing in console
			
			combinedBot = combinedBot + botX; 
			
			if(combinedBot >= 22 && botX === 11) {
				console.log(combinedBot, "bot combined before ace"); // Testing in console
				combinedBot = combinedBot - 10;
				console.log(combinedBot, "bot combined after ace"); // Testing in console
			}
			
			console.log(combinedBot, "bot combined"); // Testing in console
			
			if(combinedBot >= 16) {
				break;
			}
			else {
				continue;
			}
		}
		
		if(combinedBot >= 22) {
			console.log(combinedPlayer, combinedBot); // Testing in console
			message.channel.sendMessage("I busted with: " + combinedBot);
			message.channel.sendMessage("You win!");
			return;
		}
		else{
			
			for(j = 0; j < 100; j++) {
				playerX = Math.floor(Math.random() * (14)) + 1;
				message.channel.sendMessage("You got a(n):" + cards(playerX));
				if(playerX === 10 || playerX === 11 || playerX === 12 || playerX === 13) {
					playerX = 10;
				}
				else if(playerX === 14 || playerX === 1) {
					playerX = 11;
				}
				
				console.log(playerX, "player card"); // Testing in console
				
				combinedPlayer = combinedPlayer + playerX;
				
				if(combinedPlayer >= 22 && playerX === 11) {
					console.log(combinedPlayer, "player combined before ace"); // Testing in console
					combinedPlayer = combinedPlayer - 10;
					console.log(combinedPlayer, "player combined after ace"); // Testing in console
				}
				
				console.log(combinedPlayer, "player combined"); // Testing in console
				
				if(combinedPlayer >= 16) {
					break;
				}
				else {
					continue;
				}
			}
			
			if(combinedPlayer >= 22) {
				console.log(combinedPlayer, combinedBot); // Testing in console
				message.channel.sendMessage("You busted with: " + combinedPlayer);
				message.channel.sendMessage("I win!");
			}
			else if (combinedPlayer === combinedBot) {
				console.log(combinedPlayer, combinedBot); // Testing in console
				message.channel.sendMessage("We tied with: " + combinedBot);
			}
			else if(combinedPlayer > combinedBot) {
				console.log(combinedPlayer, combinedBot); // Testing in console
				message.channel.sendMessage("You won with: " + combinedPlayer);
			}
			else {
				console.log(combinedPlayer, combinedBot); // Testing in console
				message.channel.sendMessage("I won with: " + combinedBot);
			}
			
		}
	}
	
	// Pixiv Illustrator Search
	
	if(message.content.startsWith(prefix + "pixiv")) {
		let args = message.content.split(" ").slice(1);
		let illustrator = args[0];
		let tags = [];
		if(args.length > 2) {
			for(var i = 1; i < 10 ; i + 1) {
				if(args[i] !== "") {
					tags.push(args[i]);
				}
				else {
					break;
				}
			} 
		}
		console.log(pixiv.searchIllust(illustrator, tags)
			.then(json => {return pixivImg(json.illusts[0].image_urls.large);}));
		message.channel.sendMessage(pixiv.searchIllust(illustrator, tags)
			//.then(links => {return links;})
			.then(json => {return pixivImg(json.illusts[0].image_urls.large);})
			);

	}
	
	// Danbooru Search
	if(message.content.startsWith(prefix + "danbooru")) {
		var tag = message.content.split(" ");
		tagList = tag.shift();
		console.log(tag1);
		
		Danbooru.get('posts', {limit: 5, tags: tagList.join("+")}, function(err, data) {
			if(err) throw err;
			console.log(data);
			message.channel.sendMessage("https://danbooru.donmai.us" + data.file_url);
		});
	}
});

bot.on('ready', () => {
  console.log('I am ready!');
});

bot.login("api-token");
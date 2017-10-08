const Discord = require('discord.js');
const client = new Discord.Client();
const username = "ViMaSter";
const discriminator = "7619";
const musicTextChannel = "317309845130838017";

client.on('ready', () => {
  console.log('Discord library is ready!');
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
	if (typeof oldMember.voiceChannelID == "string")
	{
		return;
	}

	if (typeof newMember.voiceChannelID != "string")
	{
		return;
	}

	if (newMember.user.username != username)
	{
		return;
	}

	if (newMember.user.discriminator != discriminator)
	{
		return;
	}

	newMember.voiceChannel.join()
  		.then(connection => {
  			console.log("waiting after join...");
  			var waitTill = new Date(new Date().getTime() + 1000);
			while(waitTill > new Date()){}
  			console.log("sending command...");
  			client.channels.find("id", musicTextChannel).send('!play https://www.youtube.com/watch?v=UhLJ0sFBS40')
  			.then(connection => {
	  			var waitTill = new Date(new Date().getTime() + 2000);
				while(waitTill > new Date()){}
	  			console.log("leaving...");
				newMember.voiceChannel.leave()
  			});
		})
 		.catch(console.error);
});

client.login(process.env.DISCORD_WBL_BOT_TOKEN);
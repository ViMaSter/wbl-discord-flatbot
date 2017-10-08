const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log('Discord library is ready!');
  console.log(`Logged in as ${client.user.tag}!`);
  console.log(`Waiting for user ${process.env.DISCORD_USERNAME}#${process.env.DISCORD_DISCRIMINATOR}!`);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  	console.log(`voiceStateUpdate on user ${newMember.user.username}#${newMember.user.discriminator}`);

	if (typeof oldMember.voiceChannelID == "string")
	{
		return;
	}

	if (typeof newMember.voiceChannelID != "string")
	{
		return;
	}

	if (newMember.user.username != process.env.DISCORD_USERNAME)
	{
		return;
	}

	if (newMember.user.discriminator != process.env.DISCORD_DISCRIMINATOR)
	{
		return;
	}

  	console.log(`	We care about this user; joining same voice channel '${newMember.voiceChannel.name}'`);

	newMember.voiceChannel.join()
  		.then(connection => {
  			console.log(`	Joined - quick pause...`);
  			var waitTill = new Date(new Date().getTime() + 1000);
			while(waitTill > new Date()){}
  			console.log(`	Requesting song...`);
  			client.channels.find("id", process.env.DISCORD_MUSICTEXTCHANNELID).send('!play https://www.youtube.com/watch?v=UhLJ0sFBS40')
	  			.then(connection => {
  					console.log(`	Song requested`);
		  			var waitTill = new Date(new Date().getTime() + 2000);
					while(waitTill > new Date()){}
					console.log(`	Leaving room again...`);
					newMember.voiceChannel.leave()
	  			});
		})
 		.catch(console.error);
});

client.login(process.env.DISCORD_WBL_BOT_TOKEN);
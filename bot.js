const Discord = require('discord.js');
const client = new Discord.Client();
const username = "Rette";
const discriminator = "7921";
const musicChannel = "340113556601044993";

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

	client.channels.find("id", musicChannel).send('!play https://www.youtube.com/watch?v=UhLJ0sFBS40');
});

client.login(process.env.DISCORD_WBL_BOT_TOKEN);
// Main discord functionality
const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`[DISCORD]	Discord library is ready!`);
  console.log(`[DISCORD]	Logged in as ${client.user.tag}!`);
  console.log(`[DISCORD]	Waiting for user ${process.env.DISCORD_USERNAME}#${process.env.DISCORD_DISCRIMINATOR}!`);
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
  	console.log(`[DISCORD]	voiceStateUpdate on user ${newMember.user.username}#${newMember.user.discriminator}`);

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

  	console.log(`[DISCORD]		We care about this user; joining same voice channel '${newMember.voiceChannel.name}'`);

	newMember.voiceChannel.join()
  		.then(connection => {
  			console.log(`[DISCORD]		Joined - quick pause...`);
  			var waitTill = new Date(new Date().getTime() + 1000);
			while(waitTill > new Date()){}
  			console.log(`[DISCORD]		Requesting song...`);
  			client.channels.find("id", process.env.DISCORD_MUSICTEXTCHANNELID).send('!play https://www.youtube.com/watch?v=UhLJ0sFBS40')
	  			.then(connection => {
  					console.log(`[DISCORD]		Song requested`);
		  			var waitTill = new Date(new Date().getTime() + 2000);
					while(waitTill > new Date()){}
					console.log(`[DISCORD]		Leaving room again...`);
					newMember.voiceChannel.leave()
	  			});
		})
 		.catch(console.error);
});

client.login(process.env.DISCORD_WBL_BOT_TOKEN);

// Web helper
function tablefy(content)
{
	const keyWhitelist = {
		"DISCORD_USERNAME": true,
		"DISCORD_DISCRIMINATOR": true,
		"DISCORD_MUSICTEXTCHANNELID" : true,
		"DISCORD_WBL_BOT_TOKEN": false
	};

	let output = "";
	output += "<table>";
	for (key in content)
	{
		if (typeof keyWhitelist[key] == "undefined")
		{
			continue;
		}

		output += "<tr>";
		output += "<th>";
		output += key;
		output += "</th>";
		output += "<td>";
		output += keyWhitelist[key] ? content[key] : "<i>REDACTED</i>";
		output += "</td>";
		output += "</tr>";
	}
	output += "</table>";

	return output;
}

require('http').createServer((request, response) => {
	const { headers, method, url } = request;
	let body = [];

	request.on('error', (err) => {
		console.error(err);
	}).on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		console.log(`[WEB    ]	Handling web request...`);

		body = Buffer.concat(body).toString();

		response.on('error', (err) => {
		  console.error(err);
		});

		response.statusCode = 200;
		response.setHeader('Content-Type', 'text/html');

		response.write(tablefy(process.env));
		response.end();
	});
}).listen(process.env.PORT || 3000);

console.log(`[WEB    ]	Listening on port ${process.env.PORT || 3000}...`);

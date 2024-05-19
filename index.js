const { Client, GatewayIntentBits, Partials } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent, 
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers
    ],
    partials: [Partials.Message, Partials.Channel, Partials.Reaction]
});

const token = 'INSERT_YOUR_TOKEN_BOT';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return; 

    if (message.content.startsWith('+eerie')) {
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply('Please mention a valid member.');
        }

        const presence = member.presence;
        if (!presence) {
            return message.reply(`${member.user.tag} is currently offline or has disabled their presence.`);
        }

        let platform = "unknown";
        if (presence.clientStatus) {
            if (presence.clientStatus.desktop) {
                platform = "PC";
            } else if (presence.clientStatus.mobile) {
                platform = "Mobile";
            } else if (presence.clientStatus.web) {
                platform = "Web";
            }
        }

        // Determine online status
        let status = "unknown";
        switch (presence.status) {
            case 'online':
                status = "online";
                break;
            case 'idle':
                status = "idle";
                break;
            case 'dnd':
                status = "do not disturb";
                break;
            case 'offline':
                status = "offline";
                break;
        }

        message.reply(`${member.user.tag} is using Discord on ${platform} and is currently ${status}.`);
    }
});

client.login(token);

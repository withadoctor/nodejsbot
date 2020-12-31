const { Client, Collection, Intents } = require("discord.js");
const config = require("./config.json");
const bot = new Client({
    ws: {
        intents: new Intents(['GUILDS',
            'GUILD_MEMBERS',
            'GUILD_BANS',
            'GUILD_EMOJIS',
            'GUILD_INTEGRATIONS',
            'GUILD_WEBHOOKS',
            'GUILD_INVITES',
            'GUILD_VOICE_STATES',
            'GUILD_PRESENCES',
            'GUILD_MESSAGES',
            'GUILD_MESSAGE_REACTIONS',
            'GUILD_MESSAGE_TYPING',
            'DIRECT_MESSAGES',
            'DIRECT_MESSAGE_REACTIONS',
            'DIRECT_MESSAGE_TYPING'])
    }
});
require('./util/misc.js')
const yaml = require('js-yaml');
const fs = require('fs');

try {
    const doc = yaml.safeLoad(fs.readFileSync('./src/config.yml', 'utf8'));
    // console.log({doc});
    console.log(doc.commands.misc);
    console.log(doc.commands.mod);
    // console.log(doc['url path']);
    // console.log(doc['title']);
    // console.log(doc.title);
} catch (e) {
    console.log(e);
}

bot.authors = new Collection();
Object.values(config).forEach((x, i) => bot[Object.keys(config)[i]] = x);
["aliases", "commands"].forEach(x => bot[x] = new Collection());
["command", "event"].forEach(x => require(`./handlers/${x}`)(bot));

process.env.NODE_ENV = process.argv[2];
if (process.argv[2] == 'live') bot.token = config.live_token;
else if (process.argv[2] == 'qa') bot.token = config.qa_token;

bot.login(bot.token);
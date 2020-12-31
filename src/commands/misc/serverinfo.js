const { MessageEmbed, version } = require("discord.js")
const package_version = require("../../../package.json").version;
const moment = require("moment");
require("moment-duration-format");

module.exports = {
    config: {
        name: "serverinfo",
        aliases: ["si", "serverInfo", "서버 정보", "서버", "정보", "SI", "냐", "ㄴㅑ"],
        description: "서버 정보",
        usage: "si",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        var duration = moment.duration(bot.uptime).format(" D [일], H [시간], m [분], s [초]");
        var img = 'https://cdn.discordapp.com/icons/419671192857739264/6dccc22df4cb0051b50548627f36c09b.webp?size=256';
        let sEmbed = new MessageEmbed()
            .setColor('#186de6')
            .setAuthor('server info of 콜라곰 BOT', img)
            .setFooter(`콜라곰 BOT ❤️`)
            .addField('\u200b', '\u200b')
            .addField('RAM usage', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
            .addField('running time', `${duration}`, true)
            .addField('user', `${bot.users.cache.size.toLocaleString()}`, true)
            .addField('server', `${bot.guilds.cache.size.toLocaleString()}`, true)
            .addField('Discord.js', `v${version}`, true)
            .addField('Node', `${process.version}`, true)
            .addField('bot version', `${package_version}`, true)

        if (message.author.id == '250693463065100298') {
            let arr = bot.guilds.cache.array();
            let value = `\`\`\`css\n`;

            for (let i = 0; i < arr.length; i++) {
                value += `${arr[i].name}\n`
            }
            value += `\`\`\`\n`
            sEmbed.addField('list:', value)
        } else {
            sEmbed.addField('list:', `당신은 권한이 없습니다.`)
        }
        message.channel.send(sEmbed);
    }
}
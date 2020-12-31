const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags")

module.exports = {
    config: {
        name: "help",
        aliases: ["h", "commands", "ㅗ", "ㅗ디ㅔ", "도움", "도움말", "헬프"],
        usage: "h",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
        const embed = new MessageEmbed()
            .setAuthor('Help of 콜라곰 BOT', helpImg)
            .setColor('#186de6')
            .setFooter(`콜라곰 BOT ❤️`)

        if (!args[0]) {
            let own_desc = '';
            let normal_desc = '';
            bot.commands.filter(x => x.config.name != 'help').array().forEach(x => {
                if (x.config.accessableby == "Members") {
                    normal_desc += `• \`\`${helpTitle(`${bot.prefix + x.config.aliases[0]}`)}\`\` : **${x.config.description}**\n`;
                } else {
                    own_desc += `• \`\`${helpTitle(`${bot.prefix + x.config.aliases[0]}`)}\`\` : **${x.config.description}**\n`;
                }
            });

            if (message.author.id == '250693463065100298') {
                embed.addField(`Owner Categories :`, own_desc);
            }
            embed.addField(`Categories :`, normal_desc);

            return message.channel.send(embed)
        } else {
            let cmd = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if (!cmd) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${bot.prefix}help\` for the list of the commands.`))
            cmd = cmd.config

            embed.addField(cmd.description, stripIndents`
            **다른 명령어들:** ${cmd.aliases ? '\`' + cmd.aliases.join("\`, \`") + '\`' : ""}
            
            **설명:** ${cmd.description || "No Description provided."}
            
            **사용법:** ${cmd.usage ? `\`${bot.prefix}${cmd.usage}\`` : "No Usage"}
            
            **사용가능한 사람:** ${cmd.accessableby || "Members"}`
            )

            return message.channel.send(embed)
        }
    }
}

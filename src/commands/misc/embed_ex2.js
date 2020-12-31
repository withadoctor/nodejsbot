const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "embedex2",
        aliases: ["embedex2"],
        description: "embedex2",
        usage: "embedex2",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let helpImg = "https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png"
        let commandList = [
            { name: "ping", desc: "현재 핑 상태" },
            { name: "embed", desc: "embed 예제1" },
            { name: "embed2", desc: "embed 예제2 (help)" },
            { name: "!전체공지", desc: "dm으로 전체 공지 보내기" },
        ]
        let commandStr = ""
        let embed = new MessageEmbed().setAuthor("Help of 콜라곰 BOT", helpImg).setColor("#186de6").setFooter(`콜라곰 BOT ❤️`).setTimestamp()

        commandList.forEach((x) => {
            commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`
        })

        embed.addField("Commands: ", commandStr)

        message.channel.send(embed)
    }
}
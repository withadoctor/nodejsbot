const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
        name: "embedex",
        aliases: ["embedex"],
        description: "embedex",
        usage: "embedex",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let img = "https://cdn.discordapp.com/icons/419671192857739264/6dccc22df4cb0051b50548627f36c09b.webp?size=256"
        let embed = new MessageEmbed()
            .setTitle("타이틀")
            .setURL("http://www.naver.com")
            .setAuthor("나긋해", img, "http://www.naver.com")
            .setThumbnail(img)
            //.addBlankField()  < 해당 구문은 .addField('\u200b', '\u200b') 로 대체할 수 있습니다.
            .addField("Inline field title", "Some value here")
            .addField("Inline field title", "Some value here", true)
            .addField("Inline field title", "Some value here", true)
            .addField("Inline field title", "Some value here", true)
            .addField("Inline field title", "Some value here1\nSome value here2\nSome value here3\n")
            //.addBlankField()  < 해당 구문은 .addField('\u200b', '\u200b') 로 대체할 수 있습니다.
            .setTimestamp()
            .setFooter("나긋해가 만듬", img)

        message.channel.send(embed)
    }
}
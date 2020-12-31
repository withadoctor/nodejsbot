module.exports = {
    config: {
        name: "2048",
        aliases: ["2048"],
        description: "2048 게임 링크",
        usage: "2048",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        message.channel.send(`https://play2048.co/ 한판 ㄱㄱ`)
    }
}
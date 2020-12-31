module.exports = {
    config: {
        name: "typing",
        aliases: ["typing", "쇼ㅔㅑㅜㅎ", "타자"],
        description: "타자속도 링크",
        usage: "typing",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        message.channel.send(`https://typing.works/ 타자속도 테스트 ㄱㄱ`)
    }
}
module.exports = {
    config: {
        name: "emojirole",
        aliases: ["er", "emojirole"],
        description: "이모티콘으로 역할 추가",
        usage: "er message 쏼라쏼라, er add 쏼라쏼라",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        message.channel.send("그냥 ZIRA 쓰는게 어때? 링크 -> https://zira.gg/\n사용법은 https://m.blog.naver.com/alscks140/221580132814");
        // 고려사항이 너무 많다.
    }
}
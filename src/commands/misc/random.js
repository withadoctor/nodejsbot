module.exports = {
    config: {
        name: "random",
        aliases: ["r", "ㄱ", "random", "ㄱ무애ㅡ", "랜덤"],
        description: "랜덤 대답",
        usage: "r 피자 치킨 떡볶이",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        let min = 0;
        let max = args.length;
        let index = parseInt(Math.random() * (max - min) + min);
        return message.reply(`${args[index]}가 나왔습니다.`);
    }
}
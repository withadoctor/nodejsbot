// 출처: https://stackoverflow.com/questions/59312602/discord-js-purge-js-command-issue
module.exports = {
    config: {
        name: "clear",
        aliases: ["c", "ㅊ", "청소"],
        description: "청소",
        usage: "c <num>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("너는 권한이 없어.");
        const amount = parseInt(args[0]) || 1;
        message.channel.bulkDelete(amount + 1, true);
    }
}

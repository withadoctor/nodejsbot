module.exports = {
    config: {
        name: "unmute",
        aliases: ["um", "speak", "ㅕㅡ", "뮤트해제", "너의죄를사하노라"],
        description: "뮤트해제",
        usage: "um <@user> <이유>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        // check if the command caller has permission to use the command
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("너는 권한이 없어.");

        //define the reason and unmutee
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mutee) return message.channel.send("사용자를 입력하지 않았습니다.\n사용법 : " + module.exports.config.usage);

        // define mute role and if the mute role doesnt exist then send a message
        let muterole = message.guild.roles.cache.find(r => r.name == "Muted")
        if (!muterole) return message.channel.send(`Muted 역할이 존재하지 않아요.`)

        let isMuted = mutee._roles.find(x => x == muterole.id);
        if (!isMuted) return message.channel.send(`${mutee.user}님은 뮤트를 먹지 않았어요.`)

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "해방을 축하해" // "No reason given"

        // remove role to the mentioned user and also send the user a dm explaing where and why they were unmuted
        mutee.roles.remove(muterole.id).then(() => {
            message.channel.send(`${mutee.user}님 해방 되었어요!`)
        }).catch(e => {
            message.reply(`${mutee.user}을(를) 해방 시키지 못 했어요. (오류)\n${e}`)
        })
    }
}
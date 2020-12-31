const { BitField } = require("discord.js")

module.exports = {
    config: {
        name: "mute",
        aliases: ["m", "nospeak", "ㅡ", "ㅡㅕㅅㄷ", "뮤트", "닥쳐", "닥처", "아닥"],
        description: "뮤트",
        usage: "m <@username> <reason>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        // check if the command caller has permission to use the command
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("너는 권한이 없어.");

        //define the reason and mutee
        let mutee = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!mutee) return message.channel.send("사용자를 입력하지 않았습니다.\n사용법 : " + module.exports.config.usage);

        let reason = args.slice(1).join(" ");
        if (!reason) reason = "No reason given"

        // define mute role and if the mute role doesnt exist then create one
        let muterole = message.channel.guild.roles.cache.find(r => r.name == "Muted")
        if (!muterole) {
            try {
                muterole = await message.guild.roles.create({
                    data: {
                        name: "Muted",
                        color: bot.colours.red_dark,
                    },
                    reason: reason,
                })
                muterole.setPermissions(new BitField(0)); // 어떤 권한도 없는 상태
                message.guild.channels.cache.forEach(async (channel, id) => { // 채널에서 muted 권한에게 아무 것도 안 주게 함.
                    await channel.createOverwrite(muterole, {
                        SEND_MESSAGES: false,
                        ADD_REACTIONS: false,
                        SEND_TTS_MESSAGES: false,
                        ATTACH_FILES: false,
                        SPEAK: false,
                    })
                })
            } catch (e) {
                console.log(e.stack);
            }
        }

        // add role to the mentioned user and also send the user a dm explaing where and why they were muted
        mutee.roles.add(muterole.id).then(() => {
            message.channel.send(`${mutee.user} 닥쳐라. 이 새끼야.`)
        }).catch(e => {
            message.reply(`${mutee.user}을(를) 닥치게 못 했어요. 미안해요. (오류)`)
        })
    }
}
const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "ban",
        aliases: ["b", "banish", "remove", "ㅠ", "ㅠ무", "밴"],
        description: "특정유저 밴",
        usage: "ban <@username>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to perform this command!")

        let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
        if(!banMember) return message.channel.send("Please provide a user to ban!")

        let reason = args.slice(1).join(" ");
        if(!reason) reason = "그냥 강퇴다 임마."

        if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command")

        banMember.send(`안녕! 넌 \`\`${message.guild.name}\`\`에서 강퇴당했어!\n이유 -> \`\`${reason}\`\``).then(() => 
        banMember.ban({ days: 0, reason: reason })).catch(err => console.log(err))
        // message.guild.members.cache.ban(banMember, { days: 0, reason: reason})).catch(err => console.log(err))

        message.channel.send(`**${banMember.user.tag}** has been banned`) // .then(m => m.delete(5000))

        let embed = new MessageEmbed()
        .setColor(bot.colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "ban")
        .addField("Mutee:", banMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .addField("Date:", message.createdAt.toLocaleString())

        try {
            let sChannel = message.guild.channels.cache.find(c => c.name == bot.warningCh)
            sChannel.send(embed)
        } catch (error) {
            console.log(bot.warningCh+"채널이 없어서 메세지를 못 보냅니다.");
            message.channel.send(embed)
        }
    }
}
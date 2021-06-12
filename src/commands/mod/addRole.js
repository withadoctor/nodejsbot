const { MessageEmbed } = require("discord.js")

module.exports = {
    config: {
        name: "addrole",
        aliases: ["ar", "ㅁㄱ", "addrole", "역할추가"],
        description: "유저에게 역할 추가",
        usage: "addrole <@username>",
        accessableby: "Administrators",
    },
    run: async (bot, message, args) => {
        if(!message.member.permissions.has(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("You dont have permission to perform this command!")

        let rMember = message.mentions.members.first() || message.guild.members.cache.find(m => m.user.tag == args[0]) || message.guild.members.cache.get(args[0])
        if(!rMember) return message.channel.send("Please provide a user to add a role too.")
        let role = message.guild.roles.cache.find(r => r.name == args[1]) || message.guild.roles.cache.find(r => r.id == args[1]) || message.mentions.roles.first()
        if(!role) return message.channel.send("Please provide a role to add to said user.") 
        let reason = args.slice(2).join(" ")
        if(!reason) reason = "No reason given"

        if(!message.guild.me.permissions.has(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.")

        await rMember.roles.add(role).catch(e => {
            console.log(e.message)
            return message.channel.send(`${rMember.displayName}, already has the role!`)
        })

        let embed = new MessageEmbed()
        .setColor(bot.colours.redlight)
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
        .addField("Moderation:", "addrole")
        .addField("Username:", rMember.user.username)
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
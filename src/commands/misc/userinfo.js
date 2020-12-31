const { MessageEmbed } = require("discord.js")
const moment = require('moment-timezone');

module.exports = {
	config: {
		name: "userinfo",
		aliases: ["i", "ui", "ㅕㅑ", "ㅑ", "내정보"],
		description: "내정보 보기",
		usage: "i <@username>",
		accessableby: "Members",
	},
	run: async (bot, message, args) => {
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
		const roles = member.roles.cache
			.sort((a, b) => b.position - a.position)
			.map(role => role.toString())
			.slice(0, -1);

		const isChatMaster = member.roles.cache.find(x => x.name == '채팅창지박령');
		const isDonator = member.roles.cache.find(x => x.name == '후원자');
		const isAdmin = member.roles.cache.find(x => x.name == '관리자');

		let common = [
			{
				name: 'User',
				value: [
					`**❯ Username:** ${member.user.username}`,
					`**❯ Discriminator:** ${member.user.discriminator}`,
					`**❯ ID:** ${member.id}`,
					`**❯ Avatar:** [Link to avatar](${member.user.displayAvatarURL()})`,
					`**❯ Time Created:** ${moment(member.user.createdTimestamp).locale('ko').format('ll dddd LTS')} , ${moment(member.user.createdTimestamp).locale('ko').fromNow()}`,
					`\u200b`
				],
			},
			{
				name: 'Member',
				value: [
					`**❯ Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
					`**❯ Server Join Date:** ${moment(member.joinedAt).locale('ko').format('LL LTS')}`,
					`**❯ Hoist Role:** ${member.roles.cache.hoist ? member.roles.cache.hoist.name : 'None'}`,
					`**❯ Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
				],
			},
		]
		let mute = {
			name: 'Mute Free',
			value: [
				`❯ 뮤트로부터 자유로운자`,
				`(단, 관리자가 직접 뮤트를 줄 때는 먹어야함..)`,
			],
		}

		const embed = new MessageEmbed()
			.setThumbnail(member.user.displayAvatarURL())
			.setColor(member.displayHexColor || 'BLUE')

		if ((isChatMaster && isDonator) || isAdmin) {
			for (let item of common) {
				if (item.name == 'Member') item.value.push(`\u200b`);
				embed.addField(item.name, item.value);
			}
			embed.addField(mute.name, mute.value);
		} else {
			for (let item of common) {
				embed.addField(item.name, item.value);
			}
		}
		return message.channel.send(embed);
	}
}

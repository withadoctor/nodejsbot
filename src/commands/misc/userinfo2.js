const { Canvas } = require('canvas-constructor');
const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

const imageUrlRegex = /\?size=2048$/g;
const placeholder = new Map();

const moment = require('moment-timezone');


let font_path = `./src/assets/fonts/GmarketSansTTFMedium.ttf`;
Canvas.registerFont(font_path, 'GmarketSans')

async function profile(message, data) {
	const key = `${message.guild.id}-${data.member.id}`;
	const member = data.member;
	// const { level, points } = placeholder.get(key);

	try {
		const result = await fetch(member.user.displayAvatarURL().replace('webp', 'png'));
		if (!result.ok) throw new Error('Failed to get the avatar!');
		const avatar = await result.buffer();

		const name = member.displayName.length > 30 ? member.displayName.substring(0, 17) + '...'
			: member.displayName;

		// return new Canvas(400, 180)
		// 	.setColor('#7289DA')
		// 	.addRect(84, 0, 316, 180)
		// 	.setColor("#2C2F33")
		// 	.addRect(0, 0, 84, 180)
		// 	.addRect(169, 26, 231, 46)
		// 	.addRect(224, 108, 176, 46)
		// 	.setShadowColor('rgba(22, 22, 22, 1)')
		// 	.setShadowOffsetY(5)
		// 	.setShadowBlur(10)
		// 	.addCircle(84, 90, 62)
		// 	.addCircularImage(avatar, 85, 90, 64)
		// 	.save()
		// 	.createBeveledClip(20, 138, 128, 32, 5)
		// 	.setColor('#23272A')
		// 	.fill()
		// 	.restore()
		// 	.setTextAlign('center')
		// 	.setTextFont('18pt Klavika Regular')
		// 	// .setTextFont('18pt GmarketSans')
		// 	.setColor('#FFFFFF')
		// 	.addText(name, 285, 54)
		// 	.addText(`Level: ${level.toLocaleString()}`, 84, 159)
		// 	.setTextAlign('left')
		// 	.addText(`Score: ${points.toLocaleString()}`, 241, 136)
		// 	.toBuffer();
		let canvas = {
			width: 900,
			height: 270,
		}
		let wrapper = {
			dx: 24,
			dy: 34,
			width: canvas.width - 24 - 24,
			height: canvas.height - 34 - 34,
		}
		let user = {
			dx: (270 / 2) - 10,
			dy: (270 / 2),
			size: 80,
			status_back: {
				dx: (270 / 2) - 10 + 85 - 24,
				dy: (270 / 2) + 85 - (24 + 10),
				size: 24,
			},
			status: {
				dx: (270 / 2) - 10 + 85 - 20 - 4,
				dy: (270 / 2) + 85 - (20 + 10) - 4,
				size: 20,
				color: '#44B37F',
			},
		}

		if (data.status == 'online') {
			user.status.color = '#44B37F';
		} else if (data.status == 'idle') {
			user.status.color = '#faa61a';
		} else if (data.status == 'dnd') {
			user.status.color = '#f04747';
		} else if (data.status == 'offline') {
			user.status.color = '#747f8d';
		}
		let roles = data.roles.sort((a, b) => b.position - a.position).map(x => x.name).join(', ');
		let HighestRole = data.roles.find(x => x.name == data.HighestRole) || { hexColor: "#2C2F33" }

		if (roles == '') {
			roles = 'None'
		}
		// if(roles.length / 10 > 1) {
		// 	let lines = parseInt(roles.length / 10);
		// 	console.log({lines});
		// 	console.log(roles.substr(0, 10))
		// 	console.log(roles.substr(10, 20))
		// 	console.log(roles.substr(20, 30))
		// }


		return new Canvas(canvas.width, canvas.height) // 배경 크기
			//.setColor("#2C2F33").addRect(0,0,canvas.width,canvas.height) // 배경
			.setColor(HighestRole.hexColor).addRect(0,0,canvas.width,canvas.height) // 배경
			.setColor("#000000").addRect(wrapper.dx,wrapper.dy,wrapper.width,wrapper.height) // wrapper // 
								.addCircle(user.dx, user.dy, user.size).addCircularImage(avatar, user.dx, user.dy, user.size) // 유저 이미지
			.setColor('#000000').addCircle(user.status_back.dx, user.status_back.dy, user.status_back.size) // 유저 상태 이미지 배경
			.setColor(user.status.color).addCircle(user.status.dx, user.status.dy, user.status.size) // 유저 상태 이미지
			.setColor('#ffffff').setTextFont('25pt GmarketSans').addText(`닉네임: ${name}`, 230, 70)
								.setTextFont('18pt GmarketSans').addText(`HighestRole: ${data.HighestRole}`, 230, 70 + 50 + 10)
																.addText(`Roles: ${roles}`, 230, 70 + 50 + 50 + 5)
																.addText(`서버가입일자: ${data.ServerJoinDate}`, 230, 70 + 50 + 50 + 50)
			.toBuffer();

		// data.roles.forEach((x, i) => {
		// 	ret.setColor(x.hexColor).addText(x.name, 230, 70 + 50 + 50 + 100)
		// })
		// ret.addText(`ServerJoinDate: ${data.ServerJoinDate}`, 230, 70 + 50 + 50+ 50)
		// return ret.toBuffer();
	} catch (error) {
		console.log(error);
		await message.channel.send(`An error occurred: **${error.message}**`);
	}
}

let aa = -1;
var covid_notice_channel;

module.exports = {
	config: {
		name: "userinfo2",
		aliases: ["i2", "ui2", "ㅕㅑ2", "ㅑ2", "내정보2"],
		description: "내정보 보기2",
		usage: "i2 <@username>",

		accessableby: "Members",
	},
	core: async (bot, message, args) => {
		const key = `${message.guild.id}-${message.author.id}`;
		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

		let HighestRole = `${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`;
		let ServerJoinDate = `${moment(member.joinedAt).locale('ko').format('LL LTS')}`;
		let roles = [];
		member.roles.cache.forEach(x => {
			if (x.name != '@everyone') {
				roles.push({
					name: x.name,
					hexColor: x.hexColor,
					id: x.id,
				})
			}
		});

		try {
			placeholder.set(key, {
				member,
				user: member.user.id,
				guild: message.guild.id,
				roles: roles,
				status: member.presence.status, // 'online' | 'idle' | 'dnd'
				HighestRole,
				ServerJoinDate,
			});

			const buffer = await profile(message, placeholder.get(key));
			const filename = `profile-${message.author.id}.png`;
			const attachment = new MessageAttachment(buffer, filename);
			// const attachment = new MessageAttachment(svg, filename);
			await message.channel.send(attachment);

		} catch (error) {
			console.log(error);
			// client.logger.error(error.stack);
			return message.channel.send(`An error ocurred: **${error.message}**`);
		}
	},
	run: async (bot, message, args) => {
		await module.exports.core(bot, message, args)
	}
}

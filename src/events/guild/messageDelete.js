const { MessageAttachment } = require('discord.js');
const fetch = require('node-fetch');

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    if(message.attachments.array().length > 0) {
        try {
            const result = await fetch(message.attachments.array()[0].proxyURL);
            if (!result.ok) throw new Error('Failed to get the avatar!');
            const avatar = await result.buffer();

            const attachment = new MessageAttachment(avatar, message.attachments.array()[0].name);
            if(message.content.length == 0) {
                message.channel.send(`${message.author}님이 삭제하셨습니다.`);
            } else {
                message.channel.send(`${message.author}님이 \`\`${message.content}\`\`를 삭제하셨습니다.`);
            }
            return message.channel.send(attachment);
        } catch (e) {
            console.log(e);
            return message.channel.send(`An error occurred: **${e.message}**`);
        }
    }
    message.channel.send(`${message.author}님이 \`\`${message.content}\`\`를 삭제하셨습니다.`);
}
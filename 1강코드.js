const Discord = require('discord.js');
const client = new Discord.Client();
const token = 'NzA1OTgzNTM1NjU1MTU3Nzgx.Xqzocw.LfhDSjulK1Q4tcRzA_KnIyuBAyI';

client.on('ready', () => {
  console.log('켰다.');
});

client.on('message', (message) => {
  if(message.content === 'ping') {
    message.reply('pong');
  }
});

client.login(token);
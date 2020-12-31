// const byeChannelName = "안녕히가세욜" // 퇴장 시 메시지를 전송 할 채널의 이름을 입력하세요.
const byeChannelName = 794119306291052564 // 퇴장 시 메시지를 전송 할 채널의 이름을 입력하세요.
const byeChannelComment = "안녕히가세요." // 퇴장 시 전송할 메시지의 내용을 입력하세요.

module.exports = async (bot, member) => {
    const guild = member.guild
    const deleteUser = member.user
    // const byeChannel = guild.channels.cache.find((channel) => channel.name == byeChannelName)
    const byeChannel = guild.channels.cache.find((channel) => channel.id == byeChannelName)
  
    byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`) // 올바른 채널명을 기입하지 않았다면, Cannot read property 'send' of undefined; 오류가 발생합니다.

   
    // let banAlertChannel;
    // if(process.env.NODE_ENV == 'live') {
    //     banAlertChannel = bot.guilds.cache.find(x => x.name == '나긋해_유튜브_채널').channels.cache.find(x => x.name == '경고');
    // }
    // else if(process.env.NODE_ENV == 'qa') {
    //     banAlertChannel = bot.guilds.cache.find(x => x.name == '__youtube_test').channels.cache.find(x => x.name == '일반');
    // }
    // let muterole = member.guild.roles.cache.find(r => r.name == "Muted");
    // let isMuted = member._roles.find(x => x == muterole.id);
    // if(isMuted) {
    //     member.ban('뮤트 먹고 나가서 밴')
    //     banAlertChannel.send(`${member.user}님이 ${muterole}먹은 상태에서 퇴장하여 밴먹었습니다.`);
    // }
}
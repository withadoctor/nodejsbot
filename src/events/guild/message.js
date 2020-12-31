const moment = require('moment-timezone');
const forbiddenWord = require('../../util/forbiddenWord.json');

function checkContinuousChatting(bot, message) {
    // console.log(message.guild.roles.map(x => `${x.name}   ${x.id}`)); // 역할 리스트

    let sponsor = '727837608972910664'; // 후원자
    let best_Talker = '727735851232133121'; // 채팅창지박령
    // let sponsor = '706088309738307585'; // 봇
    // let best_Talker = '741901425663279145'; // 관리자
    let apology_channel_msg = '<#728946542408499211> 가서 사죄하세요.'; // 사죄하는 곳
    let onmute_leave_channel_msg = '뮤트먹은 상태로 나가면 밴 됩니다.'; // 

    let member = message.guild.members.cache.find(x => x.user.id == message.author.id );
    let isSponsor = member._roles.find(x => x == sponsor);
    let isBest_Talker = member._roles.find(x => x == best_Talker);

    // 후원자 이면서 채팅창지박령이면 뮤트 먹지 않음.
    if(isSponsor && isBest_Talker) return;

    // 관리자는 도배 걸리지 않음.
    if(message.member.hasPermission('ADMINISTRATOR')) return;

    // 시간, 뮤트 롤
    let messageTime = moment().tz('Asia/Seoul').locale('ko').valueOf()
    let time = bot.authors.get(message.author.id);
    let forbiddenWordTime = bot.authors.get(message.author.id) || messageTime;
    let muterole = message.channel.guild.roles.cache.find(r => r.name == "Muted")

    // 욕설 체크
    let msgs = [
        message.content.replace('\n', ''),
        message.content.replace('\n', '').replace(/[^ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g, ''),
        message.content.replace('\n', '').replace(/[^a-z|A-Z]/g, ''),
    ]
    for(fw of forbiddenWord) {
        if(msgs[0].indexOf(bot.prefix+fw) != -1) { // ㅗ 같이. 명령어와 섞일 수 있기 때문에 추가한 부분
            continue;
        }
        for(msg of msgs) {
            if(msg.indexOf(fw) != -1) {
                message.guild.members.cache.find(x => x.id == message.author.id).roles.add(muterole.id)
                if(messageTime == forbiddenWordTime) {
                    message.reply(`첫 채팅이 욕이냐. 이 개새끼야. Mute 먹어라.\n\`\`사용한 욕: ${fw}\`\`   \`\`전 채팅과의 간격 ${messageTime - forbiddenWordTime}ms\`\`\n\n${apology_channel_msg}\n${onmute_leave_channel_msg}`);
                } else {
                    message.reply(`욕 하지마라 이 개새끼야. 씨발. 님 Mute 드셈.\n\`\`사용한 욕: ${fw}\`\`   \`\`전 채팅과의 간격 ${messageTime - forbiddenWordTime}ms\`\`\n\n${apology_channel_msg}\n${onmute_leave_channel_msg}`);
                }
                bot.authors.set(message.author.id, messageTime);
                return true;
            }
        }
    }

    // 도배성 채팅 체크
    if(message.content == '.' || message.content == '?') {
        message.guild.members.cache.find(x => x.id == message.author.id).roles.add(muterole.id)
        message.reply(`\`\`.\`\` \`\`?\`\` 하나만 치지마세요. Mute 드셈.\n\n${apology_channel_msg}\n${onmute_leave_channel_msg}`);
        bot.authors.set(message.author.id, messageTime);
        return true;
    } else if(!time) {
        bot.authors.set(message.author.id, messageTime);
        return false;
    } else if(messageTime - time <= 3000) {
        message.guild.members.cache.find(x => x.id == message.author.id).roles.add(muterole.id)
        message.reply(`단타 도배하지마세요. 씨발 님 Mute 드셈.\n \`\`전 채팅과의 간격 ${messageTime - time}ms\`\`\n\n${apology_channel_msg}\n${onmute_leave_channel_msg}`);
        bot.authors.set(message.author.id, messageTime);
        return true;
    }

    bot.authors.set(message.author.id, messageTime);
    return false;
}

const adminUserId = 417998410495557632;

module.exports = async (bot, message) => {
    if(message.author.bot) return;
    if(message.channel.type == "dm") {
        // if(message.author.id == adminUserId) return;

        let msg = `${message.author}이(가) 메세지를 보냈습니다.\n${message.content}`;
        bot.users.cache.find(x => x.id == adminUserId).send(msg)

        return;
    }
    if(checkContinuousChatting(bot, message)) return;

    let args = message.content.slice(bot.prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();

    if (!message.content.startsWith(bot.prefix)) return;
    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if (commandfile) {
        commandfile.run(bot, message, args)
    }
}

module.exports = bot => {
    let activities = [
        `${bot.guilds.cache.size} servers!`,
        `${bot.channels.cache.size} channels!`,
        `${bot.users.cache.size} users!`
    ];
    let i = 0;
    setInterval(() => bot.user.setActivity(`${bot.prefix}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000)

    log(`${redChalk(bot.user.username)} ${greenChalk('is online')}`);
};

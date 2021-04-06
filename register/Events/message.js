module.exports = async(message) => {
    if (message.author.bot || message.channel.type === 'dm') return;
    if(!message.content.startsWith(bot.config.login.prefix)) return;
    const args = message.content.slice(bot.config.login.prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    const cmd = bot.commands.get(command) || bot.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) {
        cmd.execute(bot, message, args , function(err) {
          if(err) console.error(err)
        })
    };
};
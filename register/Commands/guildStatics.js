const {MessageEmbed} = require("discord.js")
module.exports = {
    name: 'say',
    aliases: ['statics'],
    async execute(client, message , args) {
     if(!message.member.isAuthorized() && !message.member.isAdministrator()) return message.sent("yeterli yetkin yok.")
     message.guild.Statics(message);
     await message.react(bot.config.onaylandı)
    }
};
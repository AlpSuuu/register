const {MessageEmbed} = require("discord.js")
module.exports = {
    name: 'badges',
    aliases: ['rozetler'],
    async execute(client, message , args) {
     if(!message.member.isAuthorized() && message.member.isAdministrator()) return message.sent("Kayıt yapmak için yeterli yetkin yok.")
     let kişi = message.mentions.members.first() || message.guild.members.cache.get(args[0] ? args[0] : message.author.id)   
     let mention = message.guild.members.cache.get(kişi.id)
     if(!mention) return message.sent("Belirttiğiniz Kişiyi bulamıyorum")
     mention.badges(message)
     await message.react(bot.config.onaylandı)
    }
};
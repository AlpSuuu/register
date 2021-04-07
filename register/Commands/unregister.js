const {MessageEmbed} = require("discord.js")
module.exports = {
    name: 'unregister',
    aliases: ['kayıtsız'],
    async execute(client, message , args) {
     if(!message.member.isAuthorized() && !message.member.isAdministrator()) return message.sent("yeterli yetkin yok.")
     let kişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])   
     if(!args[0] || !kişi) return message.sent("Lütfen unregistere atılacak kişiyi belirtiniz.")
     let mention = message.guild.members.cache.get(kişi.id)
     if(!mention) return message.sent("Belirttiğiniz Kişiyi bulamıyorum")
     mention.unregister()
     await message.react(bot.config.onaylandı)
    }
};

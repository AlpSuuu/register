const {MessageEmbed} = require("discord.js")
module.exports = {
    name: 'yasaklı-tag',
    aliases: ['yasaklıtag' , 'bannedtag'],
    async execute(client, message , args) {
     if(!message.member.isAuthorized() && message.member.isAdministrator()) return message.sent("yeterli yetkin yok.")
     let kişi = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
     if(!membe.isBannedTagges()) return message.sent("Bu kişi yasaklı taglarımıza sahip deil.")  
     let mention = message.guild.members.cache.get(kişi.id)
     if(!args[0] || !kişi) return message.sent("Lütfen yasaklı taga atılacak kişiyi belirtiniz.")
     if(!mention) return message.sent("Belirttiğiniz Kişiyi bulamıyorum")
     mention.bannedTag()
     await message.react(bot.config.onaylandı)
    }
};
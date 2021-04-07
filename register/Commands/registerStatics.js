const {MessageEmbed} = require("discord.js")
module.exports = {
    name: 'kayıt-istatistik',
    aliases: ['bilgi'],
    async execute(client, message , args) {
     if(!message.member.isAuthorized() && !message.member.isAdministrator()) return message.sent("yeterli yetkin yok.")
     let kişi = message.mentions.members.first() || message.guild.members.cache.get(args[0] || message.author.id)   
     if(!kişi) return message.sent("Lütfen istatistiklerine bakılacak kişiyi belirtiniz.")
     let mention = message.guild.members.cache.get(kişi.id)
     if(!mention) return message.sent("Belirttiğiniz Kişiyi bulamıyorum")
     mention.registerStatics(message);
     await message.react(bot.config.onaylandı)
    }
};

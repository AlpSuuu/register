module.exports = {
    name: 'erkek',
    aliases: ['e' , 'erkek' , 'man'],
    async execute(client, message , args) {
     if(!message.member.isAuthorized() && !message.member.isAdministrator()) return message.sent(`Kayıt yapmak için <@${bot.config.yetkili}> rolüne sahip olmalısın.`)
     let kişi = message.mentions.members.first() || message.guild.members.cache.get(args[0])   
     if(!args[0] || !kişi) return message.sent("Lütfen kayıt edilecek kişiyi belirtiniz.")
     let mention = message.guild.members.cache.get(kişi.id)
     if(!mention) return message.sent("Belirttiğiniz Kişiyi bulamıyorum")
     if(!args[1]) return message.sent("Lütfen bir isim giriniz.")
     if(!args[2]) return message.sent("Lütfen bir yaş giriniz.")
     if(isNaN(args[2])) return message.sent("Yaş bir sayı olmalı.")
     if(!isNaN(args[1])) return message.sent("İsim bir sayı olamaz.")
     mention.man(mention.isTagges() ? bot.config.tagınız : bot.config.tagsız ,  args[1] , args[2] , message)
     await message.react(bot.config.onaylandı)
    }
};

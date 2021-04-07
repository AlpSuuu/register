const {MessageEmbed} = require("discord.js");
module.exports = {
    name: 'register-info',
    aliases: ['kayıt-bilgi' , 'kayıt-bilgi'],
    async execute(client, message , args) {
     if(!message.member.isAuthorized() && !message.member.isAdministrator()) return message.sent("yeterli yetkin yok.")
     let number = args[0];
     if(!args[0]) return message.sent("Lütfen bakmak istediğin kayıdın İD'sini giriniz");
     if(isNaN(args[0])) return message.sent("ID bir sayı olmalı.")
     if(Number(args[0]) > Number(Database.fetchRegisterNumber(message.guild.id))) return message.sent("Belirttiğiniz ID mevcut ID'den büyük olamaz.")
     client.registerİnformation(message , args[0]);
     await message.react(bot.config.onaylandı)
    }
};

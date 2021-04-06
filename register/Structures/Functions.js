const { Message  , Guild  , MessageEmbed} = require("discord.js") 

    Number.prototype.withEmoji = function() {
        var yazı = []
        const emojiler = bot.emotes
        this.toString().split('').forEach(x => yazı.push(x.replace(x, emojiler[x])));
        return yazı.join("")
    }
    
    Message.prototype.gönder = function(content) {
        return this.channel.send(content)
    }

    Array.prototype.random = function() {
        let sayı = Math.floor(Math.random() * this.length)
        return this[sayı];
    }

    String.prototype.replaceAll = function(neyi , neye) {
        return this.toString().replace(new RegExp(neyi , 'g'), neye); 
    }

    Guild.prototype.isTaglıAlim = function() {
        return bot.config.tagliAlim
    } 

    Guild.prototype.Statics = function(message) {
        if(!message) return new TypeError("message event is not defined.")
        let toplam = this.memberCount,
        online = this.members.cache.filter(u => u.presence.status !== "offline").size,
        taglı = this.roles.cache.get(bot.config.ekipRolü).members.size,
        booster = this.roles.cache.get(bot.config.booster).members.size,
        sesli = this.members.cache.filter(x => x.voice.channelID).size,
        isim = this.name,
        avatar = this.iconURL({dynamic : true})
 
        return (
            message.channel.send(new MessageEmbed().setColor("RANDOM")
            .setDescription(`Toplam Üye : ${toplam.withEmoji()}\n\nOnline Üye : ${Number(online).withEmoji()}\n\nTaglı Üye : ${Number(taglı).withEmoji()}\n\nBooster Üye : ${Number(booster).withEmoji()}\n\nSeslideki Üye : ${Number(sesli).withEmoji()}`)
            .setAuthor(`${isim} Sunucu İstatistikleri` , avatar)
            .setFooter(`${message.author.tag} Tarafından İstendi...` , message.author.avatarURL({dynamic : true})))
        )  
    } 

    Guild.prototype.this = function() {
        let guild = {...this , ...{}}
        return guild;
    }

module.exports = this
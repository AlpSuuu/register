const { Structures , MessageEmbed} = require("discord.js")


Structures.extend("Message", (msg) => {
    class Message extends msg {
        constructor(...args) {
            super(...args)
            this.nowMs = new Date().getTime()
            this.booster = bot.config.booster
            this.tag = bot.config.tagınız
            this.untagged = bot.config.tagsız
            this.admin = bot.config.yetkili
            this.bannedTags = bot.config.yasaklıtaglar
            this.family = bot.config.ekipRolü
        }
    
         gönder(content) {
            if(!this || !this.channel) new RangeError("Kanal Bulunamadı")
            if(!content) return new TypeError("Ne Yazmam gerekiyor!")
            this.channel.send(content).catch(function(err) { throw new Error("Hata Var İşlemi Gerçekleştiremiyorum" , err) })
        }
        sent(content) {
            if(!this || !this.channel) new RangeError("Kanal Bulunamadı")
            if(!content) return new TypeError("Ne Yazmam gerekiyor!")
             
            this.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(this.author.tag , this.author.avatarURL({dynamic : true})).setDescription(content).setFooter(bot.config.footer)).catch(function(err) { throw new Error("Hata Var İşlemi Gerçekleştiremiyorum" , err) })
        }
    }
    return Message;
});

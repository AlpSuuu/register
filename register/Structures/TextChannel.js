const { Structures,MessageEmbed} = require("discord.js");

   
Structures.extend("TextChannel" , (channel) => {
    class ChannelClass extends channel {
        constructor(...args) {
            super(...args)
            this.serverAd = this.guild.name
            this.server = this.guild,
            this.nowMs = new Date().getTime()
            this.booster = bot.config.booster
            this.tag = bot.config.tagınız
            this.untagged = bot.config.tagsız
            this.admin = bot.config.yetkili
            this.bannedTags = bot.config.yasaklıtaglar
            this.family = bot.config.ekipRolü
        }

     async sendNormal(content) {
         if(!content) return new RangeError("Pls enter a valid text.")
         this.send(content).catch(function(err) { new Error("I encountered an error..." , err) })
     }
   
     async sendWithEmbed(content) {
        if(!content) return new RangeError("Pls enter a valid text.")
        this.send(new MessageEmbed().setColor("RANDOM").setDescription(content)).catch(function(err) { new Error("I encountered an error..." , err) })
     }
    }

    return ChannelClass;
})
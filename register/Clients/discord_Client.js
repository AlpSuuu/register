const {Collection , Client  , MessageEmbed} = require("discord.js");
const fs = require('fs');
let sayi  = 0;
const moment = require("moment");
const message = require("../Events/message");
require("moment-duration-format");

class AlpSu_Client_options extends Client {
   constructor(seçenekler) {
       super(seçenekler)
       this.commands = new Collection(),
       this.aliases = new Collection(),
       this.config = require('../Start/config');
       this.emotes = this.config.emojis;
       this.filters = this.config.filters;
       this.events = fs.readdirSync('./Events').filter(file => file.endsWith('.js'));
       this.komutlar = fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
       this.token = this.config.login.token,
       this.server = this.config.serverID
       this.taglıAlim = this.config.tagliAlim
   }
   async _send(Message , content) {
     Message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(Message.author.tag , Message.author.avatarURL({dynamic : true})).setDescription(content).setFooter(this.isim , this.foti))
   }
   async CommandLoadFunctions() {
        for (const file of this.komutlar) {
            sayi++
            const command = require(`../Commands/${file}`);
            console.log(`${sayi}-) Yüklenen Komut "${file.split('.js')[0]}"`);
            this.commands.set(command.name.toLowerCase(), command);
          };
   }
    async EventLoadFunctions() {
    for (const file of this.events) {
        sayi++
        console.log(`${sayi}-) Yüklenen Event "${file.split('.js')[0]}"`);
        const event = require(`../Events/${file}`);
        this.on(file.split(".")[0], event);
      };
   }
    async Start() { console.log("Başlatıldı!") }
    async Enter_a_bot(asValidToken) {
        if(!asValidToken) return
        this.login(asValidToken)
        .then(() => console.log("Giriş Yaptım Aşko."))
        .catch(async(err) => console.error(`Bota Giriş Yaparken bir hata ile karşılaştım... ${err.message}`))
    }
       
    async embed2(message , content) {
             message.channel.send(
             new MessageEmbed()
             .setColor("RANDOM")
             .setDescription(content)
             .setFooter(`${this.user.tag}` , this.user.avatarURL())
             )
    }

     nowDate() {
      let a = moment(Date.now()+10800000).format("MM"),
          b = moment(Date.now()+10800000).format("DD"),
          c = moment(Date.now()+10800000).format("HH:mm:ss"),
          d = `${b} ${a
          .replace(/01/, 'Ocak')
          .replace(/02/, 'Şubat')
          .replace(/03/, 'Mart')
          .replace(/04/, 'Nisan')
          .replace(/05/, 'Mayıs')
          .replace(/06/, 'Haziran')
          .replace(/07/, 'Temmuz')
          .replace(/08/, 'Ağustos')
          .replace(/09/, 'Eylül')
          .replace(/10/, 'Ekim')
          .replace(/11/, 'Kasım')
          .replace(/12/, 'Aralık')
          } ${c}`
       
          return String(d);
    }

    async registerİnformation(message , registerID) {
      if(!registerID) return new Error("Pls enter a valid register ID.")
      let data = Database.kayıtBilgi(registerID) || {}
   
      message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(message.guild.name , message.guild.iconURL({dynamic : true})).setDescription(`${message.guild.name} Suncusunda yapılan **#${registerID}** ID'li kayıt bilgileri...`)
      .addField("Kayıt Türü", '```fix\n'+(data.type ? data.type.replace(/woman/ , "Kadın Kayıt!").replace(/man/ , "Erkek Kayıt!") : "Bulunamadı.")+'\n```', false)
      .addField("Kayıt Eden", `[(${message.guild.member(data.admin.userID) ? `<@${data.admin.userID}>` : `${data.admin.nickname}`})-(\`\`${data.admin.userID || "00000000000000"}\`\`)]`, true)
      .addField("Kayıt Edilen", `[(${message.guild.member(data.mention.id) ? `<@${data.mention.id}>` : `${data.mention.tag}`})-(\`\`${data.mention.id || "00000000000000"}\`\`)]`, true) 
      .addField("Kayıt Edilme Tarihi", `\`\`\`js\n${data.date || "Bulunamadı."}\`\`\``,false)
      .addField("Kayıt Edilen İsim", '```fix\n'+(data.nick ? `${data.nick.charAt(0).toUpperCase() + data.nick.slice(1).toLowerCase()}` : "Bulunamadı.")+'\n```', true)
      .addField("Kayıt Edilen Yaş", '```js\n'+(data.age || "Bulunamadı.")+'\n```', true)
      )
    }

    async UserCheckSystem() {
      
      this.guilds.cache.get(this.server).members.cache.filter(member => !member.user.bot && !member.üstte() && member.manageable && member.roles.cache.size === 1 && !member.hasPermission('ADMINISTRATOR')).array().forEach((member, index) => {
      setTimeout(async() => { 
      await member.roleset(bot.config.unreg_rolleri).catch(console.error); 
      }, index*5000)
    });

      this.guilds.cache.get(this.server).members.cache.filter(member => !member.isVip() && !member.user.bot && !member.üstte() && member.manageable && !member.isTagges() && !member.isBooster() && !member.hasPermission('ADMINISTRATOR')).array().forEach((member, index) => {
      setTimeout(async() => {
      if(this.taglıAlim) await member.unregister()
      else {
        member.setnickk(member.displayName.replace(this.config.tagsız, this.config.tagınız));
        member.roleremove(this.config.ekipRolü)
      }
      }, index*5000)
    })
    this.guilds.cache.get(this.server).members.cache.filter(member => !member.user.bot && !member.üstte() && member.manageable && member.isTagges()).array().forEach((member, index) => {
      setTimeout(async() => {
        member.setnickk(member.displayName.replace(this.config.tagınız, this.config.tagsız));
        member.roleadd(this.config.ekipRolü)
      }, index*5000)
    })

    this.guilds.cache.get(this.server).members.cache.filter(member => !member.isVip() && !member.user.bot && !member.üstte() && member.manageable && member.isBannedTagges() && !member.isBooster() && !member.hasPermission('ADMINISTRATOR')).array().forEach((member, index) => {
      setTimeout(async() => {
      await member.setnickk("Yasaklı Tag!");
      await member.bannedTag()
      }, index*5000)
    })
    console.log("check is completed.")
  }
}

module.exports = AlpSu_Client_options;
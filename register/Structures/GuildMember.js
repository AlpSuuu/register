const { Structures , MessageEmbed , splitMessage} = require("discord.js");


const moment = require("moment");
const message = require("../Events/message");
require("moment-duration-format")


Structures.extend('GuildMember' , (member) => { 
    class Member extends member {
        constructor(...args) {
            super(...args)
            this.serverAd = this.guild.name
            this.server = this.guild,
            this._welcomePhoto = bot.config.hg_foto
            this._welcomeChannel = bot.config.register_kanal
            this.nowMs = new Date().getTime()
            this.booster = bot.config.booster
            this.tag = bot.config.tagınız
            this.untagged = bot.config.tagsız
            this.admin = bot.config.yetkili
            this.bannedTags = bot.config.yasaklıtaglar
            this.family = bot.config.ekipRolü
            this.womanroles = bot.config.kız_rolleri
            this.manroles = bot.config.erkek_rolleri
            this.unregistered = bot.config.unreg_rolleri
        }
        async Statics() {
            return this;
        }
        async sendEmbed(sa) {
            if(!sa) return new TypeError("Gönderilecek Mesaj Belirtmelisin")
            this.send(new MessageEmbed().setColor("RANDOM").setDescription(sa)).catch(console.error)
        }
         roller() { return this.roles.cache.array() }
         üstte() {
           return this.roles.highest.position > this.guild.members.cache.get(bot.user.id).roles.highest.position ? true : false
         }
    
         roleadd(RoleID) {
            return this.roles.add(RoleID).catch(console.error)
        }
        roleremove(RoleID) {
            return this.roles.remove(RoleID).catch(console.error)
        }
        roleset(roller) {
            if(typeof roller !== "object") roller = new Array(roller)
            let roles;
            if(this.roles.cache.has(this.booster)) roles = roller.concat(this.booster)
            else roles = roller
    
            return this.roles.set(roles).catch(console.error)
        }
    
        setnick(tag , nick , age) {
            if(!tag) return new TypeError("Pls enter tag")
            if(!nick) return new TypeError("Pls enter nickname")
            if(!age) return new TypeError("Pls enter age")
    
            if(!isNaN(nick)) return new Error("Pls enter a valid nickname")
            if(isNaN(age)) return new Error("Pls enter a valid age")
            let nickk = nick.charAt(0).replace("i", "İ").toUpperCase() + nick.slice(1).toLowerCase()
            let tagg = this.user.tag.includes(this.tag) ? this.tag : this.untagged
            let Nick = `${tagg} ${nickk} | ${age}`
            this.setNickname(Nick).catch(console.error)
        }
    
        setnickk(name) { 
            if(!name) return new TypeError("Pls enter nickname")
            this.setNickname(name).catch(console.error)
        }
    
        isAuthorized() {
            return this.roles.cache.get(this.admin) ? true : false
        }

        isAdministrator() {
             return this.hasPermission("ADMINISTRATOR")
        }

        isTagges() {
            return this.user.username.includes(bot.config.tagınız) ? true : false
        }
    
        isVip() {
            return this.roles.cache.get(bot.config.vip) ? true : false
        }

        isBannedTagges() {
            return this.bannedTags.some(x => this.user.username.includes(x)) ? true : false
        }
        isBooster() {
            return this.roles.cache.get(this.booster) ? true : false
        }
     
        fetchBannedTags() {
          let array = this.bannedTags,
           push = [],
           obje = {...[array]},
           values = Object.values(obje),
           yasaklılar = values.toString().split(",")

          for(var banned of yasaklılar) this.user.tag.toString().includes(banned) && !push.includes(banned) ? push.push(banned) : ""
          
          if(!push || push.length === 0) return "not defined."
          return push.map(x => x).join(" , ")
        }
    
        bannedTag() {
            this.send(`Sunucumuzda Yasaklı taglar arasında bulunan tagı isminde tespit ettik ne yazıkki tagı çıkarmadan içeriye giremezsin.\nİsminde bulunup sunucumuzda yasaklı olan tag(lar) ==> ${this.fetchBannedTags()}`).catch(console.error)
            this.roleset(bot.config.yasaklı_tag_rol)
        }
    
        welcome() {
            if(this.isTagges()) this.roleadd(this.family) 
            if(this.isBannedTagges()) return this.bannedTag()
            this.setnickk(`${this.untagged} İsim | Yaş ?`);
            this.unregistered.forEach(x => this.roleadd(x));
            let channel = this.guild.channels.cache.get(this._welcomeChannel);
            let zaman = this.nowMs - this.createdAt
            const gecen = moment.duration(zaman).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 
            /* Kullanabilirsiniz Ben Kullanmadım :) */
            if(!channel) return new RangeError("Register channel is not defined.") 
            this.guild.channels.cache.get(this._welcomeChannel).send(
            `
            \`>\`  <@!${this.id}>(**${zaman > 2592000001 ? "Güvenli" : "Şüpheli"}**) ${this.serverAd}'a Hoş Geldin
    
                      \`>\`   Seninle Birlikte Sunucumuzda **${Number(this.server.memberCount).withEmoji()}** Kişi Var!
    
                      \`>\`   Kayıdını Tamamlamak İçin Register Odalarına Girmen Yeterlidir.
    
            \`>\`   Sizinle <@&${this.admin}> Yetkisinde Olan Kişiler İlgilenecektir.
            ` , {
                files: [this._welcomePhoto]
              }).catch(console.error) 
        }
    
        woman(tag , nick , age , message) {
            if(!tag) return new TypeError("Pls enter tag")
            if(!nick) return new TypeError("Pls enter nickname")
            if(!age) return new TypeError("Pls enter age")

            if(!message) return new TypeError("Message event is not defined")

            if(this.guild.isTaglıAlim() && !this.isTagges() && !message.member.hasPermission("ADMINISTRATOR") && !member.isVip()) return message.channel.sendWithEmbed("Ne yazık ki şuanda taglı alımdayız bundan dolayı kayıt işlemlerini gerçekleştiremiyorum lütfen üst yetkili birine ulaşın.");
            let register_number = Number(Database.getir(`register.number.${this.guild.id}`) || 0) + Number(1)
            Database.ekle(`register.number.${this.guild.id}` , 1)

            message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(this.user.tag , this.user.avatarURL({dynamic : true})).setDescription(`Kayıt İşlemi başarılı... Kayıt Numarası(\`#${register_number}\`)\n<@!${this.id}> Kişisini ${this.womanroles.map(x => `<@&${x}>`).join(",")} Rolerini Vererek Kayıt Ettim.`).setFooter(`${message.author.tag} Yetkilisi Tarafından İstendi.` , message.author.avatarURL())).catch(function(err) { new Error("I encountered an error..." , err) })
            this.setnick(tag , nick , age)
            this.unregistered.forEach(x => this.roleremove(x))
            this.womanroles.forEach(x => this.roleadd(x))

            Database.sırala(`member.statics.${message.member.id}` , { type : "woman" , date : this.nowMs , _ID : this.id})
            Database.sırala(`registered.names.${this.id}` , { type : "woman" , nick : this.displayName , admin : message.member , date : bot.nowDate() , number : register_number })
            Database.kaydet(`registered.number.${register_number}` , { type : "woman" , nick : nick , age : age , admin : message.member , mention : this.user , date : bot.nowDate() })
        }
 
        registerStatics(message) {
           let data = Database.istatistikler(this.id)
           let dailyStat = Object.keys(data).filter(_key => (this.nowMs - data[_key].date) <= 1000 * 60 * 60 * 24).length
           let weeklyStat = Object.keys(data).filter(_key => (this.nowMs - data[_key].date) <= 1000 * 60 * 60 * 24 * 7).length
           let monthlyStat = Object.keys(data).filter(_key => (this.nowMs - data[_key].date) <= 1000 * 60 * 60 * 24 * 30).length
           let generalStat =  {
                   _woman : Object.values(data).filter(x => x.type === "woman").length,
                   _man : Object.values(data).filter(x => x.type === "man").length,
                   _tagges : Object.values(data).filter(x => this.guild.members.cache.get(x._ID) && this.guild.members.cache.get(x._ID).isTagges()).length,
                   _leaved : Object.values(data).filter(x => !this.guild.members.cache.get(x._ID) ).length,
                   _total : Object.values(data).length,
               };

           message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(`${this.user.tag} Kişisinin Kayıt İstatistikleri` , this.user.avatarURL({dynamic : true})).setDescription(`
           [Toplam : **\`${generalStat._total}\`**-(Erkek : \`${generalStat._man}\`)-(Kız : \`${generalStat._woman}\`)-(Taglı : \`${generalStat._tagges}\`)-(Ayrılan : \`${generalStat._leaved}\`)]
           `).addField('> Günlük','```js\n'+dailyStat+'\n```',true).addField('> Haftalık','```js\n'+weeklyStat+'\n```',true).addField('> Aylık','```js\n'+monthlyStat+'\n```',true).setFooter(bot.config.footer))
        
        }

        badges(message) {
            if(!bot.config.rozetler) return new TypeError("client badges is not idented")
            let totalRegister = Database.istatistikler(this.id).length;
            let unLockedBadges = bot.config.rozetler.filter(x => Number(x.sayı) > Number(totalRegister));
            let currentBadge = unLockedBadges[0]
            let nexBadge = unLockedBadges[1]
            let allBadges = bot.config.rozetler;
            let dolular = [
                {_colorCode : "#78b159"  , emoji : "🟩"}, 
                {_colorCode : "#f4900c"  , emoji : "🟧"},
                {_colorCode : "#fdcb58"  , emoji : "🟨"},
                {_colorCode : "#c1694f"  , emoji : "🟫"},
                {_colorCode : "#aa8ed6"  , emoji : "🟪"},
                {_colorCode : "#dd2e44"  , emoji : "🟥"},
                {_colorCode : "#dd2e44"  , emoji : "🟥"},
                {_colorCode : "#dd2e44"  , emoji : "🟥"},
                {_colorCode : "#dd2e44"  , emoji : "🟥"},
                {_colorCode : "#55acee"  , emoji : "🟦"},
            ].random()

            if(currentBadge && nexBadge) var info = `
            > Şuanda <@&${currentBadge.rol}>  rozetinde sahipsiniz.
            > Bir sonra rozet[<@&${nexBadge.rol}>] için ${Number(nexBadge.sayı - totalRegister).withEmoji()} 
            kayıt daha yapman gerekiyor.`

            if(currentBadge && !nexBadge) var info = `
            > Şuanda <@&${currentBadge.rol}>  rozetinde sahipsiniz. 
            > Bu rozetten sonra tüm rozetleri kazanmış olacaksınız :).`

            if(!currentBadge) var info = ` 
           > Tüm rozetleri kazandınız tebrikler. :tada:`

            let embed = new MessageEmbed().setColor(dolular._colorCode).setAuthor(this.user.tag , this.user.avatarURL({dynamic : true})).setDescription(`<@!${this.id}> kişisinin rozet bilgileri aşağıda belirtildiği gibidir.
           ${info}
           `)
                
            for(var O_o of allBadges) {
                let bar = O_o.sayı > totalRegister ? createBar(totalRegister , O_o.sayı , 15) : "``Rozet İlerlemesi Tamamlandı!``"
                let moreThan = O_o.sayı > totalRegister ? `Rozet henüz kazanılmadı rozeti kazanmak için ${O_o.sayı - totalRegister} kayıt daha yapaman gerekiyor` : "``Rozet Başarıyla Kazanıldı!``"
                let role = O_o.rol

                embed.addField("** **" , `
                ⮞ Rozet = [<@&${role}>]
                ⮞ ${moreThan}
                ⮞ İlerlemen ; ${bar}
                `)
            }
            
             message.channel.send(embed.setFooter(bot.config.footer))
            
                function createBar(current, max, uzunluk){
                    const _total = Math.floor((current/max)*uzunluk);
                    let string = '';
                    for(let i = 0; i < uzunluk; i++){
                        string += i < _total ? `${dolular.emoji}` : `⬜`
                    }
                     return string;
                 }
            }

        registers(message) {
            let embed = new MessageEmbed().setColor("RANDOM")
            let data = Database.kayıtlar(this.id) || {}
            let _dataKey = Object.keys(data).map(_prop => {
                return {
                    _type : data[_prop].type,
                    _nick : data[_prop].nick,
                    _admin : data[_prop].admin,
                    _date : data[_prop].date,
                    _number : data[_prop].number 
                }
            }).map((x , index) => `\`${index+1}-)\` [**#${x._number}**] | \`${x._nick}\` | ${x._type.replace(/nick/ , `**İsim Değiştirme!**`).replace(/woman/ , `<@&${this.womanroles[0]}>`).replace(/man/ , `<@&${this.manroles[0]}>`)} | ${this.guild.members.cache.get(x._admin.userID) ? `<@!${x._admin.userID}>` : x._admin.displayName} | **${x._date}**`)
            const splited = splitMessage(_dataKey, { maxLength: 1900 , char: "\n" });
            let info = `**[Kayıt ID]-[Kayıt İsim]-[Kayıt Tip]-[Kayıt Yetkili]-[Kayıt Tarih]**\n\n`
            splited.forEach((x , index) => {
                 if(splited.length === 1) return message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(`${info}${x}`).setAuthor(`${this.user.tag} adlı kişinin geçmiş kayıtları` , this.user.avatarURL({dynamic : true})).setFooter(bot.config.footer))
                 if(index === 0) return message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(`${info}${x}`).setAuthor(`${this.user.tag} adlı kişinin geçmiş kayıtları` , this.user.avatarURL({dynamic : true})))
                 if(index === splited.length) return message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(x).setFooter(bot.config.footer))
                 if(index !== splited.length && index !== 0) message.channel.send(new MessageEmbed().setColor("RANDOM").setDescription(x))
            })
        }

        man(tag , nick , age , message) {
            if(!tag) return new TypeError("Pls enter tag")
            if(!nick) return new TypeError("Pls enter nickname")
            if(!age) return new TypeError("Pls enter age")

            if(!message) return new TypeError("Message event is not defined")

            if(this.guild.isTaglıAlim() && !this.isTagges() && !message.member.hasPermission("ADMINISTRATOR") && !member.isVip()) return message.channel.sendWithEmbed("Ne yazık ki şuanda taglı alımdayız bundan dolayı kayıt işlemlerini gerçekleştiremiyorum lütfen üst yetkili birine ulaşın.");

            let register_number = Number(Database.getir(`register.number.${this.guild.id}`) || 0) + Number(1)
            Database.ekle(`register.number.${this.guild.id}` , 1)

            message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(this.user.tag , this.user.avatarURL({dunamic : true})).setDescription(`Kayıt İşlemi başarılı...ayıt Numarası(\`#${register_number}\`)\n<@!${this.id}> Kişisini ${this.manroles.map(x => `<@&${x}>`).join(",")} Rolerini Vererek Kayıt Ettim.`).setFooter(`${message.author.tag} Yetkilisi Tarafından İstendi.` , message.author.avatarURL())).catch(function(err) { new Error("I encountered an error..." , err) })
            this.setnick(tag , nick , age)
            this.unregistered.forEach(x => this.roleremove(x))
            this.manroles.forEach(x => this.roleadd(x))

            Database.sırala(`member.statics.${message.member.id}` , { type : "man" , date : this.nowMs , _ID : this.id})
            Database.sırala(`registered.names.${this.id}` , { type : "man" , nick : this.displayName , admin : message.member , date : bot.nowDate() , number : register_number })
            Database.kaydet(`registered.number.${register_number}` , { type : "man" , nick : nick , age : age , admin : message.member , mention : this.user , date : bot.nowDate() })
        
        }

        unregister() {
            this.setnickk(`${this.untagged} İsim | Yaş ?`)
            this.roleset(this.unregistered).catch(function(err) { new RangeError("I encountered an error..." , err) })
        }
    }
    return Member;
    });

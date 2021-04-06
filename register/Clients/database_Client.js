const { JsonDatabase } = require("wio.db");

class AlpSu_Database extends JsonDatabase {
   constructor(...seçenekler) {
       super(...seçenekler)
   }

   kaydet(name , value) {
      if(!name) return new TypeError("Pls enter a valid data name.")
      if(!value) return new TypeError("Pls enter a valid data value.")
      return this.set(name , value)
   }

   getir(name) {
      if(!name) return new TypeError("Pls enter a valid data name.")
      return this.get(name)
   }

   sırala(name , value) {
      if(!name) return new TypeError("Pls enter a valid data name.")
      if(!value) return new TypeError("Pls enter a valid data value.")
      return this.push(name , value)
   }

   ekle(name , number) {
      if(!name) return new TypeError("Pls enter a valid data name.")
      if(!number) return new TypeError("Pls enter a valid data value.")
      return this.add(name , number)
   }

   kayıtlar(mention_ID) {
      if(!mention_ID) return new RangeError("pls enter a UserID.")
      return this.getir(`registered.names.${mention_ID}`)
   }

   istatistikler(mention_ID) {
      if(!mention_ID) return new RangeError("pls enter a UserID.")
      return this.getir(`member.statics.${mention_ID}`)
   }

   kayıtBilgi(registerNumber) {
      if(!registerNumber) return new RangeError("pls enter a register ID")
      return this.getir(`registered.number.${registerNumber}`)
   }
   fetchRegisterNumber(guild_ID) {
      return this.getir(`register.number.${guild_ID}`)
   }
}

module.exports = AlpSu_Database;

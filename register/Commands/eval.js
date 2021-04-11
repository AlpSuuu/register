module.exports = {
      name: "eval",
      aliases: null,
      execute (client ,message , args) {
      if(!["721391768255594577"].includes(message.author.id)) return
      try{
      let codein = args.join(" ");
      if (args.includes("token")) return message.reply(`ayb`)
      let code = eval(codein);
      if (codein.length < 1) return message.reply(`deneyebilmek için bir kod girmelisin!`)
      if (typeof code !== 'string')
      code = require('util').inspect(code, { depth: 0 });
      message.channel.send(code.replaceAll(bot.config.login.token , "sansür") , {code : 'js' , split : true})
      } catch(e) {
      message.channel.send(e , {code : 'js' , split : true});
    } 
  }
}

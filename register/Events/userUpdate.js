module.exports = async(old , nev) => {
    if(!old || !nev) return; 
    const guild = bot.guilds.cache.get(bot.config.serverID),
    log = guild.channels.cache.get(bot.config.taglog),
    newMember = nev.user.guild.members.cache.get(nev.user.id)
    oldMember = old.user.guild.members.cache.get(old.user.id)
    
    if (!oldMember.isBannedTagges() && newMember.isBannedTagges()) {
    await newMember.bannedTag()
    }
    
    if (oldMember.isBannedTagges() && !newMember.isBannedTagges()) {
    await newMember.unregister()
    log.sendWithEmbed(`${newMember} adlı kişi yasaklı taglarımızdan birini isminden çıkardığı için jailden çıkarıldı`)
    }
    
    if (!oldMember.isTagges() && newUser.isTagges()) {
    newMember.roleadd(bot.config.ekipRolü);
    newMember.setnickk(newMember.displayName.replace(bot.config.tagsız, bot.config.tag))
    log.sendWithEmbed(`${newMember} adlı kişi tagımızı aldığı için family rolü verildi`)
    }
    
    if (oldMember.isTagges() && !newUser.isTagges()) {
    newMember.roleremove(bot.config.ekipRolü);
    newMember.setnickk(newMember.displayName.replace(bot.config.tag, bot.config.tagsız))
    log.sendWithEmbed(`${newMember} adlı kişi tagımızı çıkardığı için family rolü alındı`)
    }
};
  

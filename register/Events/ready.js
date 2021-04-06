module.exports = async () => {
  bot.user.setPresence({ activity: { name: String(bot.config.login.oynuyor) }, status: "idle" });
  let seskanali = bot.channels.cache.get(bot.config.voiceChannel);
  if(seskanali) seskanali._join().catch(function(err) { console.error(err) });

  setInterval(async() => {
      bot.UserCheckSystem();
  } , 10000);
};

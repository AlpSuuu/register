const { Structures } = require("discord.js");

Structures.extend("VoiceChannel" , (state) => {
    class ChannelClass extends state {
        constructor(...args) {
            super(...args)
            this.kişiler = this.members.cache,
            this._ID = this.id,
            this.Activity = new Object(),
            this.server = this.guild
            this.state = this.guild.members.cache.get(bot.user.id)
        }
        static async _mute() { 
            return this.state.voice.setMute(true).catch(function(err) { new RangeError("I encountered an error..." , err) })
        }
        static async _deaf() { 
            return this.state.voice.setDeaf(true).catch(function(err) { new RangeError("I encountered an error..." , err) })
        }
          async _join() {
           let channelvisit = bot.channels.cache.get(this._ID)
           if(channelvisit) channelvisit.join().then((VoiceConntection) => {
           let VoiceState = VoiceConntection.voice;
           VoiceState.setMute(true).then(() => {
           VoiceState.setDeaf(true)
           })
           })
           .catch(new TypeError("I encountered an error..."))
        }
    }

    return ChannelClass;
})
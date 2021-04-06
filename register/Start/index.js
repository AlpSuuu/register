const Database = require("../Clients/database_Client");
const Client = require("../Clients/discord_Client"),
     bot = global.bot = new Client(
    {
        fetchAllMembers : true
    }
), 
    db = global.Database = new Database("AlpSu_Database" , {})
     
    Server = global.Server = bot.guilds.cache.get(bot.config.serverID)
     /*Functions :)*/
     Functions = require("../Structures/Functions"),
     /*Errors :)*/
     Errors = global.Error = global.TypeError = global.RangeError = require("../Clients/error_Client"),
     /*Structures :)*/
     GuildMemberr = require("../Structures/GuildMember"),
     Message = require("../Structures/Message"),
     TextChannel = require("../Structures/TextChannel"),
     VoiceChannel = require("../Structures/VoiceChannel")
     /*Client :)*/


bot.CommandLoadFunctions(this);
bot.EventLoadFunctions(this);
bot.Start(this);
bot.Enter_a_bot(bot.token);



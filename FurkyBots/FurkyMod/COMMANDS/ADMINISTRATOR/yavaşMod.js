const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");
var request = require('request');
require("discord-reply");

exports.run = async (client, message, args) => {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const limit = args[0] ? args[0] : 0;
  
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  if (message.channel.type !== "text") return;
  
  if(!limit) return message.lineReply(furkyEmbed.setDescription(`Lütfen bir yavaş mod **süresi belirtin**!`)).then(m => m.delete(({ timeout: 15000 })));
  if(limit > 120) return message.lineReply(furkyEmbed.setDescription(`Lütfen **120'den düşük** bir yavaş mod süresi belirtin!`)).then(m => m.delete(({ timeout: 15000 })));

  request({
    url: `https://discordapp.com/api/v7/channels/${message.channel.id}`,
    method: "PATCH",
    json: { 
      rate_limit_per_user: limit
    },
    headers: { 
      "Authorization": `Bot ${client.token}` 
    }
  });

  await message.react(config.GuildSettings.Emojis.okeyEmoji);
  await message.lineReply(furkyEmbed.setDescription(`Yavaş mod süresi başarıyla **${limit}** saniye olarak ayarlandı!`)).then(m => m.delete(({ timeout: 30000 })));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yavaş-mod", "slowmode", "slow-mode", "yavasmod", "yavas-mod"],
  permLevel: 0
};

exports.help = {
  name: 'yavaşmod'
};
const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../../ayarlar.json');
const config = require("../../config.json");
require("discord-reply");

exports.run = async(client, message, args) => {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const boosterRol = await db.fetch(`boosterRol.${message.guild.id}`);
  const name = args.splice(0).join(" ");
  
  if(!message.member.roles.cache.has(boosterRol))
  return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  if(!name) return message.channel.send(furkyEmbed.setDescription(`Lütfen kendinize bir **isim belirtin**!`)).then(m => m.delete(({ timeout: 5000 })));
  if(message.guild.me.roles.highest.position <= message.member.roles.highest.position) return message.channel.send(furkyEmbed.setDescription(`Yetkiniz benden yüksek, sizin üzerinizde işlem uygulayamadım!`)).then(m => m.delete(({ timeout: 10000 })));
  
  await message.member.setNickname(`${name}`);
  
  message.channel.send(furkyEmbed.setDescription(`İsmin \`${name}\` olarak değiştirildi!`)).then(m => m.delete(({ timeout: 15000 })));
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["zengin", "rich", "boosterisim", "booster-isim", "b-isim", "booster"],
  permLevel: 0
};

exports.help = {
  name: 'bisim'
};
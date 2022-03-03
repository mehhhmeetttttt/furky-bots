const Discord = require("discord.js");
const data = require("quick.db");
const config = require("../../config.json");
const ayarlar = require("../../ayarlar.json");

exports.run = async (client, message, args) => {

const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
const transportYetkili = await data.fetch(`transportYetkili.${message.guild.id}`);
const kullanıcı = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
const member = message.guild.member(kullanıcı);
  
  if(![transportYetkili].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.react(config.GuildSettings.Emojis.crossEmoji);
  
if (!message.member.voice.channel) {
  return message.channel.send(furkyEmbed.setDescription(`Lütfen bir sesli kanala **giriş yapın**`)).then(m => m.delete(({ timeout: 5000 })));
};

if (!kullanıcı) {
  return message.channel.send(furkyEmbed.setDescription(`Lütfen yanına gitmek istediğiniz bir **kullanıcı etiketleyin!**`)).then(m => m.delete(({ timeout: 5000 })));
};
  
if (!member.voice.channel) {
  return message.channel.send(furkyEmbed.setDescription(`Etiketlediğiniz ${kullanıcı} kullanıcısı herhangi bir **sesli kanalda bulunmuyor!**`)).then(m => m.delete(({ timeout: 5000 })));
};
  
await message.member.voice.setChannel(kullanıcı.voice.channel.id);
await message.react(config.GuildSettings.Emojis.okeyEmoji);
await message.channel.send(furkyEmbed.setDescription(`Başarıyla ${kullanıcı} kullanıcısının odasına **taşındınız!**`)).then(m => m.delete(({ timeout: 10000 })));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'git'
};
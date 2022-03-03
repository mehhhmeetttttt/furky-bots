const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const data = require('quick.db');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");
const moment = require('moment');

exports.run = async (client, message, args) => {

const kayıtsızRol1 = await data.fetch(`kayıtsızRol1.${message.guild.id}`);
const kayıtLog = await data.fetch(`kayıtLog.${message.guild.id}`);
const furky = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
moment.locale("tr");
  
  if(!message.member.roles.cache.has("909837356431966208") && (!message.member.hasPermission("ADMINISTRATOR")))
  return message.react(config.GuildSettings.Emojis.crossEmoji);

  if(furky.roles.cache.has(kayıtsızRol1)) return message.lineReply(furkyEmbed.setDescription(`Kullanıcı zaten **sunucumuzda kayıtsız**!`)).then(m => m.delete(({ timeout: 10000 })));
  if(furky.roles.cache.has(config.Tag.tagRol)) return message.lineReply(furkyEmbed.setDescription(`Taglı kullanıcılar **kayıtsıza gönderilemez**!`)).then(m => m.delete(({ timeout: 10000 })));
  if (!furky) return message.channel.send(furkyEmbed.setDescription("Lütfen bir **kullanıcı etiketleyin**!")).then(m => m.delete(({ timeout: 5000 })));
  if(message.member.roles.highest.position <= furky.roles.highest.position) return message.channel.send(furkyEmbed.setDescription("Etiketlediğiniz kullanıcının rolü **sizinkinden yüksek** yada **sizinkiyle aynı**!")).then(m => m.delete(({ timeout: 5000 })));
  if(furky.id === message.author.id) return message.channel.send(furkyEmbed.setDescription("Kendini **kayıtsıza gönderemezsin**!")).then(m => m.delete(({ timeout: 5000 })));
  if(furky.id === client.user.id) return message.channel.send(furkyEmbed.setDescription("Bir botu **kayıtsıza gönderemezsin**!")).then(m => m.delete(({ timeout: 5000 })));

  await furky.roles.set([kayıtsızRol1]);
  await furky.setNickname(null);
  await message.react(config.GuildSettings.Emojis.okeyEmoji);

  message.channel.send(furkyEmbed.setDescription(`${furky} kullanıcısı ${message.author} tarafından başarıyla kayıtsıza gönderildi!`)).then(m => m.delete(({ timeout: 10000})));
  
client.channels.cache.get(kayıtLog).send(furkyEmbed.setDescription(`
${furky} kullanıcısı ${message.author} tarafından kayıtsıza gönderildi!

**─────────────────**

**Kayıtsıza gönderilen:** ${furky}
**Kayıtsıza gönderen:** ${message.author}
**Kayıtsıza gönderme tarihi:** \`${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}\`
`));
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayitsiz"],
  permLevel: 0
};

exports.help = {
  name: 'kayıtsız'
};
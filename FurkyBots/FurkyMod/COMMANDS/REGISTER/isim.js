const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const data = require('quick.db');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");
const moment = require('moment');

exports.run = async (client, message, args) => {

const kayıtYetkili = await data.fetch(`kayıtYetkili.${message.guild.id}`);
const kayıtLog = await data.fetch(`kayıtLog.${message.guild.id}`);
const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
moment.locale("tr");
  
if(!message.member.roles.cache.has(kayıtYetkili) && (!message.member.hasPermission("ADMINISTRATOR")))
return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  const furky = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
  if (!furky) return message.channel.send(furkyEmbed.setDescription("Lütfen bir **kullanıcı etiketleyin**!")).then(m => m.delete(({ timeout: 5000 })));
  if(!args[1]) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir **isim girin**!`)).then(m => m.delete(({ timeout: 5000 })));
  
  const name = args[1].charAt(0).replace("i", "İ").toUpperCase() + args[1].slice(1).toLowerCase();
  const age = args[2];
  
  if(message.member.roles.highest.position <= furky.roles.highest.position) return message.channel.send(furkyEmbed.setDescription("Etiketlediğiniz kullanıcının rolü **sizinkinden yüksek** veya **sizinkiyle aynı**!")).then(m => m.delete(({ timeout: 5000 })));
  if(furky.id === client.user.id) return message.channel.send(furkyEmbed.setDescription("Bir botun **ismini değiştiremezsiniz**!")).then(m => m.delete(({ timeout: 5000 })));
  if (!name) return message.channel.send(furkyEmbed.setDescription("Lütfen bir **isim girin**!")).then(m => m.delete(({ timeout: 5000 })));
  if(args[1] >= 12) return message.channel.send(furkyEmbed.setDescription(`Lütfen **12 harften** küçük bir isim girin!`)).then(m => m.delete(({ timeout: 5000 })));
  if(!age) return message.channel.send(furkyEmbed.setDescription("Lütfen bir **yaş girin**!")).then(m => m.delete(({ timeout: 5000 })));
  if(isNaN(age)) return message.channel.send(furkyEmbed.setDescription("Lütfen yaş girerken **sadece sayı girin!**")).then(m => m.delete(({ timeout: 5000 })));
  if (age < 12) return message.channel.send(furkyEmbed.setDescription("Lütfen **12**'den büyük bir yaş girin!'")).then(m => m.delete(({ timeout: 5000 })));

  if (furky.user.tag.includes(config.Tag.tag)) {
    await furky.setNickname(`• ${name} | ${age}`)
  } else {
    await furky.setNickname(`• ${name} | ${age}`)
  };

await message.react(config.GuildSettings.Emojis.okeyEmoji);
await message.channel.send(furkyEmbed.setDescription(`${furky} kullanıcısının ismi ${message.author} tarafından başarıyla \`${name} | ${age}\` olarak değiştirildi!`)).then(m => m.delete(({ timeout: 10000})));
  
  
client.channels.cache.get(kayıtLog).send(furkyEmbed.setDescription(`
${furky} kullanıcısının ismi ${message.author} tarafından değiştirildi!

**─────────────────**

**Yeni İsim / Yaş:** \`${name} / ${age}\`
**İsmi değiştirilen:** ${furky}
**İsmi değiştiren:** ${message.author}

**İsim değiştirme tarihi:** \`${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}\`
`));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'isim'
};
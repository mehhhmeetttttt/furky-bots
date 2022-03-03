const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const data = require('quick.db');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");
const moment = require('moment');

exports.run = async (client, message, args) => {

const kayıtYetkili = await data.fetch(`kayıtYetkili.${message.guild.id}`);
const vipRol = await data.fetch(`vipRol.${message.guild.id}`);
const kayıtLog = await data.fetch(`kayıtLog.${message.guild.id}`);
const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
moment.locale("tr");
  
let vip = message.guild.roles.cache.get(vipRol);
let regLog = message.guild.channels.cache.get(kayıtLog);
  
if(!message.member.roles.cache.has(kayıtYetkili) && (!message.member.hasPermission("ADMINISTRATOR")))
return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  let furky = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let name = args[1]
  let age = args[2]
  
  if (!furky) return message.channel.send(furkyEmbed.setDescription("Lütfen VIP verilecek bir kullanıcı etiketle!"))
  .then(m => m.delete(({ timeout: 5000})));
  
  if(message.member.roles.highest.position <= furky.roles.highest.position) return message.channel.send(furkyEmbed.setDescription("VIP vermeye çalıştığınız kullanıcının rolü sizinkinden daha yüksek yada sizinki ile aynı!"))
  .then(m => m.delete(({ timeout: 5000})));
  
  if(furky.id === message.author.id) return message.channel.send(furkyEmbed.setDescription("Kendine VIP veremezsin!"))
  .then(m => m.delete(({ timeout: 5000})));
  
  if(furky.id === client.user.id) return message.channel.send(furkyEmbed.setDescription("Bir bota VIP veremezsin!"))
  .then(m => m.delete(({ timeout: 5000})));

await furky.roles.add(vipRol);
await data.add(`vipVerme.${message.author.id}.${message.guild.id}`, 1);
await message.react(config.GuildSettings.Emojis.okeyEmoji);

message.channel.send(furkyEmbed.setDescription(`${furky} kullanıcısına ${message.author} tarafından VIP verildi!`))
.then(m => m.delete(({ timeout: 10000})));

regLog.send(furkyEmbed.setDescription(`
${furky} kullanıcısına ${message.author} tarafından VIP verildi!

**─────────────────**

**İşlem bilgileri**

**VIP verilen:** ${furky} - (\`${furky.user.id} - ${furky.user.tag}\`)
**VIP veren:** ${message.author} - (\`${message.author.id} - ${message.author.tag}\`)

**VIP verme tarihi:** \`${moment(Date.now()).format("HH:mm:ss DD MMMM YYYY")}\`
`));
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'vip'
};
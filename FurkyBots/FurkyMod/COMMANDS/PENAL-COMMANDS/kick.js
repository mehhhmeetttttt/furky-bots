const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const data = require('quick.db');
const moment = require('moment');
const db = require("quick.db");
const jdb = new data.table("cezalar");
const kdb = new data.table("kullanici");
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
  
  const kickYetkili = await data.fetch(`kickYetkili.${message.guild.id}`);
  const kickLog = await data.fetch(`kickLog.${message.guild.id}`);
  const sıra = await db.fetch('case');
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  const sebep = args.splice(1).join(" ");
  moment.locale("tr");
  
  if(![kickYetkili].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  let tumaylar = {
  "01": "Ocak",  
  "02": "Şubat", 
  "03": "Mart",  
  "04": "Nisan",  
  "05": "Mayıs", 
  "06": "Haziran", 
  "07": "Temmuz",
  "08": "Ağustos", 
  "09": "Eylül", 
  "10": "Ekim", 
  "11": "Kasım", 
  "12": "Aralık", 
  }
  let aylar = tumaylar;
  
  if(!kullanici) return message.channel.send(furkyEmbed.setDescription(`Lütfen sunucudan atılacak bir **kullanıcı etiketleyin!** \n .kick @Furky/ID <Sebep>`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));
  
  if(!sebep) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir **atma sebep belirtin!** \n .kick @Furky/ID <Sebep>`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));
  
  if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(furkyEmbed.setDescription(`Sunucudan atmaya çalıştığınız kullanıcının yetkisi **sizden yüksek** veya **sizle aynı**!`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));
  
  if(!kullanici.bannable) return message.channel.send(furkyEmbed.setDescription(`Etiketlenen kullanıcı **sunucudan atılamaz!**`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

  if(kullanici.id === message.author.id) return message.channel.send(furkyEmbed.setDescription(`Kendini **sunucudan atamazsın!**`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));
  
  if(kullanici.id === client.user.id) return message.channel.send(furkyEmbed.setDescription(`Bir bot **sunucudan atılamaz!**`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));
  
  if(kullanici.id === message.guild.OwnerID) return message.channel.send(furkyEmbed.setDescription(`Sunucu sahibi **sunucudan atılamaz!**`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));
  
let muteler = jdb.get(`tempmute`) || [];
if (!muteler.some(j => j.id == kullanici.id)) {
  await kdb.add(`kullanici.${message.author.id}.mute`, 1);
  await kdb.push(`kullanici.${kullanici.id}.sicil`, {
    Yetkili: message.author.id,
    Sebep: sebep,
    Ceza: "KICK",
    Süre: "Kalıcı",
    Tarih: `${moment(Date.now()).format("HH:mm:ss DD MMMM YYYY")}`
  });
};
  
  await kullanici.kick({ reason: `${message.author.tag} tarafından ${sebep} sebebiyle` });
  await db.add('case', 1);
  await db.add(`ceza.${kullanici.id}`, 7);
  await message.react(config.GuildSettings.Emojis.okeyEmoji);

  message.channel.send(furkyEmbed.setDescription(`${kullanici} kullanıcısı ${message.author} tarafından \`${sebep}\` sebebiyle **sunucudan atıldı**!`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 10000})));
  
client.channels.cache.get(kickLog).send(new MessageEmbed()
.setColor('RED')
.setTitle("Bir kullanıcı sunucudan atıldı!")
.setDescription(`
**Atılan kullanıcı**: ${kullanici} 
(\`${kullanici.user.id} - ${kullanici.user.tag}\`)

**Atan kullanıcı**: ${message.author} 
(\`${message.author.id} - ${message.author.tag}\`)

**───────────────**

**Atılma sebebi:**: \`${sebep}\`
**Atılma tarihi**: \`${moment(Date.now()).format("HH:mm:ss DD MMMM YYYY")}\`
**İşlem numarası:** \`#${sıra || "1"}\``));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["at", "kullanıcı-at", "kullanıcat"],
  permLevel: 0,
};

exports.help = {
  name: 'kick'
};
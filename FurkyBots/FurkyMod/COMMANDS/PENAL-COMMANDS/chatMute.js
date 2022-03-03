const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const qdb = require("quick.db");
const data = require("quick.db");
const db = new qdb.table("ayarlar");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");
const ms = require('ms');
const moment = require("moment");
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
  
  const muteYetkili = await data.fetch(`cMuteYetkili.${message.guild.id}`);
  const muteLog = await data.fetch(`chatMuteLog.${message.guild.id}`);
  const mutedRol = await data.fetch(`chatMutedRol.${message.guild.id}`);
  const sıra = await db.fetch('case');
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const kullanici = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  const sure = args[1];
  const sebep = args.splice(2).join(" ");
  moment.locale("tr");
    
  if(![muteYetkili].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.react(config.GuildSettings.Emojis.crossEmoji);

let aylartoplam = {
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
"12": "Aralık"
};
  
let aylar = aylartoplam;

if(!kullanici) return message.channel.send(furkyEmbed.setDescription(`Lütfen metin kanallarında susturulacak bir **kullanıcı etiketleyin!** \n .cmute @Furky/ID <Süre> <Sebep>`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(furkyEmbed.setDescription(`Metin kanallarında susturmaya çalıştığınız kullanıcının yetkisi **sizden yüksek** veya **sizle aynı**!`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(kullanici.id === message.author.id) return message.channel.send(furkyEmbed.setDescription(`Kendini **susturamazsın!**`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(kullanici.id === client.user.id) return message.channel.send(furkyEmbed.setDescription(`Bir botu **susturamazsın!**`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(kullanici.id === message.guild.OwnerID) return message.channel.send(furkyEmbed.setDescription(`Sunucu sahibi **susturamazsın!**`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(!sure) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir susturma **süresi belirtin!** \n .cmute @Furky/ID <Süre> <Sebep>`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(!sebep) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir susturma **sebebi girin!** \n .cmute @Furky/ID <Süre> <Sebep>`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

let zaman1 = args[1]
.replace("sn", "s")
.replace("dk", "m")
.replace("sa", "h")
.replace("gün", "d");

var vakit = zaman1
.replace("m", " dakika")
.replace("s", " saniye")
.replace("h", " saat")
.replace("d", " d");

await data.set(`muteli_${kullanici.guild.id + kullanici.id}`, 'muteli')
await data.set(`süre_${kullanici.id + kullanici.guild.id}`, vakit)

let muteler = jdb.get(`voicemute`) || [];
if (!muteler.some(j => j.id == kullanici.id)) {
  await kdb.add(`kullanici.${message.author.id}.mute`, 1);
  await kdb.push(`kullanici.${kullanici.id}.sicil`, {
    Yetkili: message.author.id,
    Sebep: sebep,
    Ceza: "CMUTE",
    Süre: sure,
    Tarih: `${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}`
  });
  
await kullanici.roles.add(mutedRol);
await db.add('case', 1);
await db.add(`ceza.${kullanici.id}`, 3);
await message.react(config.GuildSettings.Emojis.okeyEmoji);

message.channel.send(furkyEmbed.setDescription(`${kullanici} kullanıcısı ${message.author} tarafından \`${sebep}\` sebebiyle **${zaman1}** boyunca **metin kanallarda susturuldu!**`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 10000})));

client.channels.cache.get(muteLog).send(new MessageEmbed()
.setColor('RED')
.setTitle("Bir kullanıcı metin kanallarında susturuldu!")
.setDescription(`
**Susturulan kullanıcı:** ${kullanici} (\`${kullanici.user.id}\`)

**Susturan kullanıcı:** ${message.author} (\`${message.author.id}\`)

**───────────────**

**Susturma sebebi:** \`${sebep}\`
**Susturma süresi:** \`${zaman1}\`
**Susturma tarihi:** \`${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}\`
**İşlem numarası:** \`#${sıra || "1"}\`
`));
}

setTimeout(async function() {
  await kullanici.roles.remove(mutedRol).catch(x => console.log(`Mute hatası: ${x}`));

client.channels.cache.get(muteLog).send(new MessageEmbed()
.setColor('RED')
.setTitle("Bir kullanıcı metin kanallarındaki susturması sona erdi!")
.setDescription(`
**Susturulan kullanıcı:** ${kullanici} (\`${kullanici.user.id}\`)

**Susturan kullanıcı:** ${message.author} (\`${message.author.id}\`)

**───────────────**

**Susturma sebebi:** \`${sebep}\`
**Susturma süresi:** \`${zaman1}\`
**Susturma tarihi:** \`${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}\`
**İşlem numarası: #${sıra || "1"}**
`));
}, ms(zaman1));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["chat-mute", "c-mute", "chatmute"],
  permLevel: 0,
};

exports.help = {
  name: 'cmute'
};
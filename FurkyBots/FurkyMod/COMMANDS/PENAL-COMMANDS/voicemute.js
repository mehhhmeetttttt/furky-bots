const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const data = require("quick.db");
const qdb = require("quick.db");
const db = new qdb.table("ayarlar");
const jdb = new qdb.table("cezalar");
const kdb = new qdb.table("kullanici");
const ms = require('ms');
const moment = require("moment");
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
    
  const muteYetkili = await data.fetch(`vMuteYetkili.${message.guild.id}`);
  const muteLog = await data.fetch(`vmuteLog.${message.guild.id}`);
  const sıra = await db.fetch('case');
  const kullanici = message.mentions.members.first()  || message.guild.members.cache.get(args[0]);
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
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
"12": "Aralık"};
let aylar = aylartoplam;

if(!kullanici) return message.channel.send(furkyEmbed.setDescription(`Lütfen sesli kanallarda susturulacak bir **kullanıcı etiketleyin!** \n .vmute @Furky/ID <Süre> <Sebep>`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(furkyEmbed.setDescription(`Sesli kanallarda susturmaya çalıştığınız kullanıcının yetkisi **sizden yüksek** veya **sizle aynı** rolde!`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(kullanici.id === message.author.id) return message.channel.send(furkyEmbed.setDescription(`Kendini **susturamazsın!**`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(kullanici.id === client.user.id) return message.channel.send(furkyEmbed.setDescription(`Bir botu **susturamazsın!**`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(kullanici.id === message.guild.OwnerID) return message.channel.send(furkyEmbed.setDescription(`Sunucu sahibi **susturamazsın!**`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(!sure) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir susturma **süresi belirtin!** \n .vmute @Furky/ID <Süre> <Sebep>`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(!sebep) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir susturma **sebebi girin!** \n .vmute @Furky/ID <Süre> <Sebep>`))
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

let muteler = jdb.get(`voicemute`) || [];
if (!muteler.some(j => j.id == kullanici.id)) {
  kdb.add(`kullanici.${message.author.id}.mute`, 1);
  kdb.push(`kullanici.${kullanici.id}.sicil`, {
    Yetkili: message.author.id,
    Sebep: sebep,
    Ceza: "VMUTE",
    Süre: sure,
    Tarih: `${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}`
  });

if(kullanici.voice.channel) await kullanici.voice.setMute(true);
await db.add('case', 1);
await db.add(`ceza.${kullanici.id}`, 3);
await db.set(`seslide2.${kullanici.user.id}.${message.guild.id}`, vakit)
await message.react(config.GuildSettings.Emojis.okeyEmoji);
  
message.channel.send(
furkyEmbed.setDescription(`${kullanici} kullanıcısı ${message.author} tarafından **${sebep}** sebebiyle **${zaman1}** boyunca **sesli kanallarda susturuldu!**`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 10000})));

client.channels.cache.get(muteLog).send(new MessageEmbed()
.setColor('RED')
.setTitle("Bir kullanıcı sesli kanallarda susturuldu!")
.setDescription(`
**───────────────**

**Susturulan kullanıcı**: ${kullanici} 
\`${kullanici.user.id} - ${kullanici.user.tag}\`)

**Susturuan kullanıcı**: ${message.author} 
(\`${message.author.id} - ${message.author.tag}\`)

**───────────────**

**Susturma süresi:** \`${zaman1}\`
**Susturma sebebi:** \`${sebep}\`
**Susturma tarihi:** \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\`
**İşlem numarası:** \`#${sıra || "1"}\`

**───────────────**
`));

setTimeout(async function() {
  
await kullanici.voice.setMute(false);  

client.channels.cache.get(muteLog).send(new MessageEmbed()
.setColor('RED')
.setTitle("Bir kullanıcının sesli susturması sona erdi!")
.setDescription(`
**───────────────**

**Susturulan kullanıcı**: ${kullanici} (\`${kullanici.user.id} - ${kullanici.user.tag}\`)
**Susturuan kullanıcı**: ${message.author} (\`${message.author.id} - ${message.author.tag}\`)

**───────────────**

**Susturma süresi:** \`${zaman1}\`
**Susturma sebebi:** \`${sebep}\`
**Susturma tarihi:** \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\`
**İşlem numarası:** \`#${sıra || "1"}\`

**───────────────**
`));
  }, ms(zaman1));
}

}; 
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sesmute", "ses-mute", "voicemute", "v-mute", "voice-mute", "sestemutele", "seste-mutele", "seste-mute", "sestemute"],
  permLevel: 0,
};

exports.help = {
  name: 'vmute'
};
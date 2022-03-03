const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const data = require("quick.db");
const jdb = new db.table("cezalar");
const kdb = new db.table("kullanici");
const moment = require("moment");
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
  
  const jailYetkili = await data.fetch(`jailYetkili.${message.guild.id}`);
  const jailLog = await data.fetch(`jailLog.${message.guild.id}`);
  const jailRol = await data.fetch(`jailRol.${message.guild.id}`);
  const kayıtsız1 = await data.fetch(`kayıtsızRol1.${message.guild.id}`);
  const kayıtsız2 = await data.fetch(`kayıtsızRol2.${message.guild.id}`);
  const sıra = await db.fetch('case');
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  const zaman = args[1]
  const sebep = args.splice(2).join(" ");
  moment.locale("tr");

if(![jailYetkili].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.react(config.GuildSettings.Emojis.crossEmoji);

if(!kullanici) return message.channel.send(furkyEmbed.setDescription(`Lütfen jaile gönderilecek bir **kullanıcı etiketleyin!** \n .jail @Furky/ID <Süre> <Sebep>`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(!args[1]) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir jail **süresi belirtin!** \n .jail @Furky/ID <Süre> <Sebep>`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));
  
if(!sebep) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir jail **sebebi girin!** \n .jail @Furky/ID <Süre> <Sebep>`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));
  
if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(furkyEmbed.setDescription(`Jaile göndermeye çalıştığınız kullanıcının yetkisi **sizden yüksek** veya **sizle aynı**!`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));
  
if(kullanici.id === message.author.id) return message.channel.send(furkyEmbed.setDescription(`Kendini **jaile gönderemezsin!**`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(kullanici.id === client.user.id) return message.channel.send(furkyEmbed.setDescription(`Bir botu **jaile gönderemezsin!**`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(kullanici.id === message.guild.OwnerID) return message.channel.send(furkyEmbed.setDescription(`Sunucu sahibi **jaile gönderemezsin!**`))
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

await db.set(`cezali_${message.guild.id + kullanici.id}`, "cezali");
await db.set(`süreJail_${message.mentions.users.first().id + message.guild.id}`, zaman1);

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
  "12": "Aralık"
};

let aylar = tumaylar;
  
let muteler = jdb.get(`tempmute`) || [];
if (!muteler.some(j => j.id == kullanici.id)) {
  await kdb.add(`kullanici.${message.author.id}.mute`, 1);
  await kdb.push(`kullanici.${kullanici.id}.sicil`, {
    Yetkili: message.author.id,
    Sebep: sebep,
    Ceza: "JAIL",
    Süre: vakit,
    Tarih: `${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}`
  });
};

await message.react(config.GuildSettings.Emojis.okeyEmoji);
await db.add('case', 1);
await db.add(`ceza.${kullanici.id}`, 6);
await kullanici.roles.set([jailRol]);
  
message.channel.send(furkyEmbed.setDescription(`${kullanici} kullanıcısı ${message.author} tarafından \`${sebep}\` sebebiyle **${zaman1}** boyunca **jail'e gönderildi**!`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 10000})));

client.channels.cache.get(jailLog).send(new MessageEmbed()
.setColor('RED')
.setTitle("Bir kullanıcı jaile gönderildi!")
.setDescription(`
**Cezalandırılan kullanıcı:** ${kullanici} 
(\`${kullanici.user.id} - ${kullanici.user.tag}\`)

**Cezalandıran kullanıcı:** ${message.author} 
(\`${message.author.id} - ${message.author.tag}\`)

**───────────────**

**Ceza süresi:** \`${zaman1}\`
**Ceza sebebi:** \`${sebep}\`
**Ceza tarihi:** \`${moment(Date.now()).format("HH:mm:ss DD MMMM YYYY")}\`
**İşlem numarası:** \`#${sıra || "1"}\``));

  
setTimeout(async function() {

await kullanici.roles.add(kayıtsız1);
await kullanici.roles.add(kayıtsız2);
await kullanici.roles.remove(jailRol);

client.channels.cache.get(jailLog).send(new MessageEmbed()
.setColor('RED')
.setTitle("Bir kullanıcı jail süresi sona erdi!")
.setDescription(`
**Cezalandırılan kullanıcı**: ${kullanici} 
(\`${kullanici.user.id} - ${kullanici.user.tag}\`)

**Cezalandıran kullanıcı**: ${message.author} 
(\`${message.author.id} - ${message.author.tag}\`)

**───────────────**

**Ceza süresi:** \`${zaman1}\`
**Ceza sebebi:** \`${sebep}\`
**Ceza tarihi:** \`${moment(Date.now()).format("HH:mm:ss DD MMMM YYYY")}\`
**İşlem numarası:** \`#${sıra || "1"}\``));
}, ms(zaman1));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["cezalı"],
  permLevel: 0,
};

exports.help = {
  name: 'jail'
};
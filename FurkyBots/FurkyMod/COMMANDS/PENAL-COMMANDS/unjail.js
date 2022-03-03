const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const datab = require('quick.db');
const data = require('quick.db');
const db = require('quick.db');
const moment = require('moment');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
   
  const jailYetkili = await data.fetch(`jailYetkili.${message.guild.id}`);
  const unjailLog = await data.fetch(`unjailLog.${message.guild.id}`);
  const jailRol = await data.fetch(`jailRol.${message.guild.id}`);
  const kayıtsız1 = await data.fetch(`kayıtsızRol1.${message.guild.id}`);
  const kayıtsız2 = await data.fetch(`kayıtsızRol2.${message.guild.id}`);
  const sıra = await db.fetch('case');
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  moment.locale("tr");

if(![jailYetkili].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.react(config.GuildSettings.Emojis.crossEmoji);

if(!kullanici) return message.channel.send(furkyEmbed.setDescription(`Lütfen jailden çıkartılacak bir **kullanıcı etiketleyin!** \n .unjail @Furky/ID`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(furkyEmbed.setDescription(`Jaile göndermeye çalıştığınız kullanıcının yetkisi **sizden yüksek** veya **sizle aynı** rolde!`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(!kullanici.bannable) return message.channel.send(furkyEmbed.setDescription(`Etiketlenen kullanıcı **bu komut kullanılamaz!**`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(kullanici.id === message.author.id) return message.channel.send(furkyEmbed.setDescription(`Kendini **jailden çıkartamazsın!**`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));
  
if(kullanici.id === client.user.id) return message.channel.send(furkyEmbed.setDescription(`Bir botu **jailden çıkartamazsın!**`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

if(kullanici.id === message.guild.OwnerID) return message.channel.send(furkyEmbed.setDescription(`Sunucu sahibini **jailden çıkartamazsın!**`))
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
  
datab.delete(`cezali_${message.guild.id + kullanici.id}`, 'cezali')
datab.delete(`süreJail_${message.mentions.users.first().id + message.guild.id}`, zaman1)

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


await kullanici.roles.add(kayıtsız1);
await kullanici.roles.add(kayıtsız2);
await kullanici.roles.remove(jailRol);
await db.add('case', 1);
await message.react(config.GuildSettings.Emojis.okeyEmoji);
  
message.channel.send(furkyEmbed.setDescription(`${kullanici} kullanıcısı ${message.author} tarafından jailden çıkartıldı!`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 10000})));
  
client.channels.cache.get(unjailLog).send(new MessageEmbed()
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setColor('RED')
.setTitle("Bir kullanıcı jailden çıkartıldı!")
.setDescription(`
**───────────────**

**Susturması kaldırılan kullanıcı:** ${kullanici} 
(\`${kullanici.user.id} - ${kullanici.user.tag}\`)

**Susturmayı kaldıran kullanıcı:** ${message.author} 
(\`${message.author.id} - ${message.author.tag}\`)

**───────────────**

**Susturma tarihi:** \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\`
**İşlem numarası:** \`#${sıra || "1"}\`

**───────────────**
`));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'unjail'
};
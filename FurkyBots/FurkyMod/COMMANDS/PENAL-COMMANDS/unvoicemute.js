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
  const muteLog = await data.fetch(`unvmuteLog.${message.guild.id}`);
  const sıra = await db.fetch('case');
  const kullanici = message.mentions.members.first()  || message.guild.members.cache.get(args[0]);
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  moment.locale("tr");
  
  if(![muteYetkili].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.react(config.GuildSettings.Emojis.crossEmoji);

  if(!kullanici) return message.channel.send(furkyEmbed.setDescription(`Lütfen susturması kaldırılacak bir **kullanıcı etiketleyin!** \n .unvmute @Furky/ID`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));
  
  if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(furkyEmbed.setDescription(`Susturmasını kaldırmaya çalıştığınız kullanıcının yetkisi **sizden yüksek** veya **sizle aynı** rolde!`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

await kullanici.voice.setMute(false);
await db.add('case', 1)
await message.react(config.GuildSettings.Emojis.okeyEmoji);
  
  message.channel.send(furkyEmbed.setDescription(`${kullanici} kullanıcısının sesli kanallardaki susturması ${message.author} tarafından **kaldırıldı!**`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 10000})));

client.channels.cache.get(muteLog).send(new MessageEmbed()
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setColor('RED')
.setTitle("Bir kullanıcı sesli kanallardaki susturması kaldırıldı!")
.setDescription(`
**───────────────**

**Susturması kaldırılan kullanıcı**: ${kullanici} 
(\`${kullanici.user.id} - ${kullanici.user.tag}\`)

**Susturmayı kaldıran kullanıcı**: ${message.author} 
(\`${message.author.id} - ${message.author.tag}\`)

**───────────────**

**Susturma kaldırma tarihi:** \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\`
**İşlem numarası:** \`#${sıra || "1"}\`

**───────────────**
`));
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unvoicemute", "un-voicemute", "un-vmute", "unvoice-mute", "sesmutekaldır", "sesmutekaldir", "ses-mute-kaldır", "sesmute-kaldir"],
  permLevel: 0
};

exports.help = {
  name: 'unvmute'
};
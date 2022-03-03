const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const data = require('quick.db');
const db = require('quick.db');
const ms = require('ms');
const moment = require('moment');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
  
  const muteYetkili = await data.fetch(`cMuteYetkili.${message.guild.id}`);
  const muteLog = await data.fetch(`chatMuteLog.${message.guild.id}`);
  const mutedRol = await data.fetch(`chatMutedRol.${message.guild.id}`);
  const sıra = await db.fetch('case');
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  moment.locale("tr");
  
  if(![muteYetkili].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  if(!member) return message.channel.send(furkyEmbed.setDescription(`Lütfen metin kanallarındaki susturması kaldırılacak **bir kullanıcı etiketleyin!** \n .uncmute @Furky/ID`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 10000 })));

  if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(furkyEmbed.setDescription(`Susturmasını açmaya çalıştığınız kullanıcının yetkisi **sizden yüksek** veya **sizle aynı** rolde!`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 10000 })));

  await member.roles.remove(mutedRol);
  await db.add('case', 1);
  await message.react(config.GuildSettings.Emojis.okeyEmoji) ;

  message.channel.send(furkyEmbed.setDescription(`${member} kullanıcısının **metin kanallarındaki susturması** ${message.author} tarafından **kaldırıldı!**`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 15000 })));

  client.channels.cache.get(muteLog).send(new MessageEmbed()
  .setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
  .setColor('RANDOM')
  .setTitle("Bir kullanıcının metin kanallarındaki susturması kaldırıldı!")
.setDescription(`
**Susturması kaldırılan kullanıcı:** ${member} (\`${member.user.id}\`)

**Susturmayı kaldıran kullanıcı:** ${message.author} (\`${message.author.id}\`)

**───────────────**

**Susturma tarihi:** \`${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}\`
**İşlem numarası:** \`#${sıra || "1"}\`

**───────────────**
`));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["unchatmute","un-chatmute","unchat-mute","unc-mute","un-cmute"],
  permLevel: 0,
};

exports.help = {
  name: 'uncmute'
};
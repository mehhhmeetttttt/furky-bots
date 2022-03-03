const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const moment = require("moment");
const config = require("../../config.json");
const ayarlar = require("../../ayarlar.json");
require('moment-duration-format');

exports.run = async (client, message, args) => {
  
const botCommandYetkili = await db.fetch(`botCommandYetkili.${message.guild.id}`);

if(![botCommandYetkili].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.react(config.GuildSettings.Emojis.crossEmoji);
  
    let furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  
    let data = await db.get(`snipe.${message.guild.id}`);
    if(!data) return message.channel.send(furkyEmbed.setDescription(`Yakın zamanda silinen bir mesaj gözükmüyor!`));
  
    message.channel.send(furkyEmbed
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setDescription(`
\`Yazan kullanıcı:\` <@${data.mesajyazan}>
\`Yazılan kanal:\` <#${data.kanal}>

**─────────────────**

\`Yazılma tarihi:\` Mesaj, ${moment.duration(Date.now() - data.ytarihi).format("D [gün], H [saat], m [dakika], s [saniye]")} önce yazılmış.
\`Silinme tarihi:\` Mesaj, ${moment.duration(Date.now() - data.starihi).format("D [gün], H [saat], m [dakika], s [saniye]")} önce silinmiş.

**─────────────────**

\`Silinen mesaj\` 
**${data.mesaj}**
`));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sonsilinen", "sonsilinenmesaj", "silinensonmesaj", "son-silinen", "son-silinen-mesaj", "silinen-son-mesaj", "silinen-sonmesaj", "silinenson-mesaj"],
  permLevel: 0
};

exports.help = {
  name: "snipe"
};
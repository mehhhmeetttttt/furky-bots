const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {

  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const member = message.mentions.members.first();
  const voiceChannel = member.voice.channel;
  
  if(!member) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir kullanıcı etiketleyin!`)).then(x => x.delete({ timeout: 10000 }));
  if(!voiceChannel) return message.channel.send(furkyEmbed.setDescription(`Belirttiğin kullanıcı herhangi bir sesli kanalda bulunmuyor!`)).then(x => x.delete({ timeout: 10000 }));

  const microphone = member.voice.selfMute ? "Kapalı" : "Açık";
  const headphones = member.voice.selfDeaf ? "Kapalı" : "Açık";
  const stream = member.voice.streaming ? "Açık" : "Kapalı";
  const camera = member.voice.selfVideo ? "Açık" : "Kapalı";
  const limit = member.voice.channel.userLimit || "Limitsiz";
  const sestekiler = message.guild.channels.cache.get(voiceChannel.id).members.map(x => `${x.user} - \`${x.user.id}\``).join("\n")
  const voiceT = db.get(`voiceTime_${member.id}_${message.guild.id}`) 
  const time = client.tarihHesapla(voiceT) 

  voiceChannel.createInvite().then(invite =>
    message.channel.send(furkyEmbed
    .setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
    .setThumbnail(message.guild.iconURL({ dynamic: true }))
    .setDescription(`
${member} kullanıcısı \`${time}\` önce <#${voiceChannel.id}> \`(${voiceChannel.id})\` kanalına girmiş.

**Kulaklığı / Mikrofonu:** \`${microphone} / ${headphones}\`
**Yayını / Kamerası:** \`${stream} / ${camera}\`
**Kanaldaki: Kişi Sayısı / Limit:** \`${voiceChannel.members.size} / ${limit}\`

Kanalda bulunanlar:
${sestekiler}
`)));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["seskontrol","ses-kontrol","sesbilgi"],
  permLevel: 0
};

exports.help = {
  name: "ses-bilgi"
};
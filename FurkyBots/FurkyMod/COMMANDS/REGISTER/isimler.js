const Discord = require("discord.js");
const { MessageEmbed, Message, Client } = require("discord.js");
const db = require("quick.db");
const data = require("quick.db");
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");
const moment = require("moment");

exports.run = async (client, message, args) => {

const kayıtYetkili = await data.fetch(`kayıtYetkili.${message.guild.id}`);
const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
const furky = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  
if(!message.member.roles.cache.has(kayıtYetkili) && (!message.member.hasPermission("ADMINISTRATOR")))
return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  if (!furky) return message.channel.send(furkyEmbed.setDescription("Lütfen bir **kullanıcı etiketleyin**!")).then(m => m.delete(({ timeout: 5000 })));

  const isimlerVeri = await data.fetch(`isimler.${furky.id}`);
  let isimler = isimlerVeri ? isimlerVeri.map((value, index) => `**${index + 1}.** \`${value.Name} | ${value.Age}\` (<@&${value.Rol}> - **${value.Tarih}**)`).join(`\n`) : "Kullanıcının geçmişe ait kayıt verisi bulunamadı!";

// **${index + 1}.** \`${value.Name} | ${value.Age}\` (<@&${value.Rol}> - **${value.Tarih}**)
// ${value.Tarih} tarihinde ${value.Registerer} tarafından <@&${value.Rol}> cinsiyetiyle \`${value.Name} | ${value.Age}\` şeklinde 

message.channel.send(furkyEmbed.setDescription(`
${furky} kullanıcısının geçmiş isimleri:

${isimler}
`))
.then(m => m.delete(({ timeout: 30000})));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'isimler'
};
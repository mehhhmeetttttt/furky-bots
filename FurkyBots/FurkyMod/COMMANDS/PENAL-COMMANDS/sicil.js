const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const data = require("quick.db");
const qdb = require("quick.db");
const kdb = new qdb.table("kullanici");
const moment = require("moment");
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");
require("moment-duration-format");

exports.run = async (client, message, args) => {
  
const botCommandYetkili = await data.fetch(`botCommandYetkili.${message.guild.id}`);

if(![botCommandYetkili].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
return message.react(config.GuildSettings.Emojis.crossEmoji);

let kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
let uye = message.guild.member(kullanici);
let furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
moment.locale("tr");
  
if(!kullanici) return message.channel.send(furkyEmbed.setDescription(`Lütfen siciline bakılacak bir **kullanıcı etiketleyin!** \n .sicil @Furky/ID`))
.then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));

let sicil = await kdb.get(`kullanici.${uye.id}.sicil`) || [];

sicil = sicil.reverse();

let sicilPanel = sicil.length > 0 ? sicil.map((value, index) => 
`\`${index + 1}-\` İşlem türü: \`${value.Ceza}\`
Kullanıcı **${value.Tarih}** tarihinde **${value.Sebep}** sebebiyle ${message.guild.members.cache.has(value.Yetkili) ? message.guild.members.cache.get(value.Yetkili) : value.Yetkili} kullanıcısı tarafından **${value.Süre}** boyunca cezalandırılmış!`).join("\n\n **───────────────** \n\n") : "Kullanıcı, daha önceden sunucuda ceza-i işlem alacak herhangi bir işlem yapmamış.";

// await message.react(config.GuildSettings.Emojis.okeyEmoji);
  
message.channel.send(furkyEmbed
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setDescription(`
Siciline bakılan kullanıcı: <@!${uye.id}>
\`(${uye.user.id} - ${uye.user.tag})\`

Kullanıcı hesabını **${moment(uye.user.createdAt).format("DD MMMM YYYY dddd")}** tarihinde oluşturmuş.

**Kullanıcı sicili**

**───────────────**

${sicilPanel}

**───────────────**
`));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["cezageçmişi", "cezagecmisi", "ceza-geçmişi", "ceza-gecmisi"],
  permLevel: 0,
};

exports.help = {
  name: 'sicil'
};
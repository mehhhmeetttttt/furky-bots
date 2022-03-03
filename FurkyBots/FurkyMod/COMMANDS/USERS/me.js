const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");
const moment = require("moment");
moment.locale("tr");

exports.run = async (client, message, args) => {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const sunucuyaKatılım = await db.fetch(`sunucuyaKatılım.${message.author.id}`);
  const katılımTarih = await db.fetch(`katılımTarih.${message.author.id}`);
  var date1 = message.member.joinedAt
  var date = new Date(date1)
  var dateStr = ("00" + date.getDate()).slice(-2) + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2);
  
  /*message.guild.fetchInvites().then(invites => {
    const userInvites = invites.array().filter(o => o.inviter.id === message.author.id);
    var userInviteCount = 0;
    for(var i=0; i < userInvites.length; i++) {
      var invite = userInvites[i];
      userInviteCount += invite['uses'];
    }
  });*/
  
  message.channel.send(furkyEmbed
.setThumbnail(message.author.displayAvatarURL({ dynamic:true }))
.setDescription(`
**ID:** \`${message.author.id}\`
**Kullanıcı adı:** \`${message.author.username}\`
**Hesap oluşturulma tarihi:** \`${moment(message.author.createdAt).format("DD MMMM YYYY dddd")}\`

**─────────────────**

**Sunucuya katılım sırası:** \`${sunucuyaKatılım || "Bulunamadı!"}\`
**Sunucuya katılım tarihi:** \`${dateStr || `Bulunamadı!`}\`

**─────────────────**

**Roller:** ${message.member.roles.cache.size >= 5 ? "Çok fazla rolünüz var, rolleriniz sıralanamadı!" : message.member.roles.cache.map(role => role.toString())}
`)).then(m => m.delete(({ timeout: 30000 })));
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["profil", "profilim"],
  permLevel: 0
};

exports.help = {
  name: "me"
};
const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");
const moment = require("moment");
moment.locale("tr");

exports.run = async (client, message, args) => {

let furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);

if (message.member.displayName.startsWith("[AFK]")) return;
  
  const furkyMember = message.guild.members.cache.get(message.author.id);
  const afkSebep = args.join(' ') || "Sebep belirtilmemiş!";
  const afkKullaniciAd = furkyMember.displayName;
  
  await db.set(`afkUserReason_${message.author.id}_${message.guild.id}`, afkSebep);
  await db.set(`afkKullanici_${message.author.id}_${message.guild.id}`, message.author.id);
  await db.set(`afkSuresi_${message.guild.id}`, moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY"));
  await db.set(`afkKullaniciAdi_${message.author.id}_${message.guild.id}`, afkKullaniciAd);
  
  let afkReason = db.fetch(`afkUserReason_${message.author.id}_${message.guild.id}`);
  
  message.member.setNickname(`[AFK] ` + afkKullaniciAd).catch(x => message.channel.send(furkyEmbed.setDescription(`${message.author}, başarıyla **${afkReason}** sebebinden dolayı AFK moduna giriş yaptın ancak adını [AFK] olarak düzeltemedim!`)))
  message.channel.send(furkyEmbed.setDescription(`${message.author}, başarıyla **${afkReason}** sebebinden dolayı AFK moduna giriş yaptın!`)).then(m => m.delete(({ timeout: 10000 })));

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
  name: "afk"
};
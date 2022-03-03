const Discord = require('discord.js');
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  if(!args[0]) return message.lineReply(furkyEmbed.setDescription(`Lütfen silinecek **mesaj miktarını girin!**`)).then(m => m.delete(({ timeout: 10000 })));
  if(args[0] < 1) return message.lineReply(furkyEmbed.setDescription(`Lütfen **1** veya daha yüksek bir mesaj miktarı girin!`)).then(m => m.delete(({ timeout: 10000 })));
  if(args[0] > 100) return message.lineReply(furkyEmbed.setDescription(`Lütfen **100** veya daha az bir mesaj miktarı girin!`)).then(m => m.delete(({ timeout: 10000 })));
  
  await message.delete();
  await message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(furkyEmbed.setDescription(`**${args}** adet mesaj başarıyla ${message.channel} kanalından kaldırıldı!`)).then(m => m.delete(({ timeout: 15000 })));
  });

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sil", "clear"],
  permLevel: 0
};

exports.help = {
  name: 'temizle'
};
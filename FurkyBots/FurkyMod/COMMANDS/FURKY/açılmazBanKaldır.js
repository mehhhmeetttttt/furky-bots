const Discord = require('discord.js');
const db = require("quick.db");
const config = require("../../config.json");
const ayarlar = require("../../ayarlar.json");

exports.run = async(client, message, args) => {

  
  if(message.author.id !== ayarlar.sahip) return;
  
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const kullanici = args[0];
  const banLog = await db.fetch(`banLog.${message.guild.id}`);
  const açılmazBan = await db.fetch(`açılmazBan.${kullanici}`);
  
  if(!kullanici) return message.channel.send(furkyEmbed.setDescription(`Lütfen sunucudaki kalıcı yasağı kaldırılacak **kullanıcının ID'sini giriniz!**`)).then(m => m.delete(({ timeout: 10000 })));
  if(açılmazBan !== `True`) return message.channel.send(furkyEmbed.setDescription(`Kullanıcı zaten sunucuda **kalıcı olarak yasaklı değil!**`)).then(m => m.delete(({ timeout: 10000 })));
  
  await db.delete(`açılmazBan.${kullanici}`);
  await message.guild.members.unban(kullanici);
  await client.channels.cache.get(banLog).send(furkyEmbed.setDescription(`**${kullanici}** ID'li kullanıcının açılmaz banı ${message.author} tarafından **kaldırıldı!**`));
  await message.react(config.GuildSettings.Emojis.okeyEmoji);
  await message.channel.send(furkyEmbed.setDescription(`**${kullanici}** ID'li kullanıcısının açılmaz banı ${message.author} tarafından **kaldırıldı!**`)).then(m => m.delete(({ timeout: 30000 })));
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["acilmazbankaldir", "açılmaz-ban-kaldır", "acilmaz-ban-kaldir"],
  permLevel: 4
};

exports.help = {
  name: 'açılmazbankaldır'
};
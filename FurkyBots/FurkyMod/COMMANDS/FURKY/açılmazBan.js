const Discord = require('discord.js');
const db = require("quick.db");
const config = require("../../config.json");
const ayarlar = require("../../ayarlar.json");

exports.run = async(client, message, args) => {

  
  if(message.author.id !== ayarlar.sahip) return;
  
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  const banLog = await db.fetch(`banLog.${message.guild.id}`);
  
  if(!kullanici) return message.channel.send(furkyEmbed.setDescription(`Lütfen sunucudan kalıcı olarak banlanacak kullanıcıyı etiketleyin!`)).then(m => m.delete(({ timeout: 10000 })));
  
  await db.set(`açılmazBan.${kullanici.id}`, `True`);
  await kullanici.ban({ reason: "Açılmaz ban ile banlandı!" });
  await db.add(`ceza.${kullanici.id}`, 30);
  await client.channels.cache.get(banLog).send(furkyEmbed.setDescription(`${kullanici.user.tag} kullanıcısı ${message.author} tarafından **kalıcı olarak* sunucudan yasaklandı!`));
  await message.react(config.GuildSettings.Emojis.okeyEmoji);
  await message.channel.send(furkyEmbed.setDescription(`${kullanici.user.tag} kullanıcısı ${message.author} tarafından **kalıcı olarak** sunucudan yasaklandı!`)).then(m => m.delete(({ timeout: 30000 })));
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["acilmazban", "açılmaz-ban", "acilmaz-ban"],
  permLevel: 4
};

exports.help = {
  name: 'açılmazban'
};
const Discord = require("discord.js")
const backup = require("discord-backup");
const db = require("quick.db");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {

  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(`${message.author.tag} tarafından kullanıldı!`, message.author.displayAvatarURL({ dynamic:true }))
  const guild = client.guilds.cache.get(ayarlar.Settings.guildID);
  
  if (message.member.id !== message.guild.ownerID && message.member.id !== ayarlar.sahip) return message.react(ayarlar.Settings.crossEmoji);

  backup.setStorageFolder("../backups/");
  backup.create(guild, {

    maxMessagesPerChannel: 0,
    jsonSave: true,
    jsonBeautify: true,
    doNotBackup: [ "emojis", "bans" ],
    saveImages: "base64"
    
  }).then((backupData) => {
    
    db.delete(`sonYedek.${guild}`);
    db.set(`sonYedek.${guild}`, backupData.id)
    
    message.channel.send(furkyEmbed.setDescription(`Kanal yedekleri başarıyla alındı!`)).then(m => m.delete(({ timeout: 30000 })));
    
    client.channels.cache.get(ayarlar.Settings.logChannel).send(furkyEmbed.setDescription(`
[MANUEL] 

Kanal yedekleri başarıyla alındı!

**Yedek kurulumu için:** \`${ayarlar.prefix}kurulum ${backupData.id}\`
**Yedek hakkında daha fazla bilgi için:** \`${ayarlar.prefix}bilgi ${backupData.id}\`
`))}).catch(() => {
  return message.channel.send('Bir hata meydana geldi! Lütfen bota "**Yönetici**" yetkisi verin!');
});

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yedekal", "manuel-yedek", "manuel-yedek-al", "yedek-al"],
  permLevel: 0
};

exports.help = {
  name: "manuel"
};
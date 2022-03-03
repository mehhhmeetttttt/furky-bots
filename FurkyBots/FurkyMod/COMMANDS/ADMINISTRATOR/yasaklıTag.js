const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const db = require('quick.db');
const ayarlar = require('../../ayarlar.json');
const config = require("../../config.json");

exports.run = async(client, message, args) => {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const furkyYasakliTagData = await db.get(`yasaklitaglar.${message.guild.id}`) || []
  const furkyHedefTag = args[1]
  
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.react(config.GuildSettings.Emojis.crossEmoji);
    
  if(!args[0]) message.lineReply(furkyEmbed.setDescription(`Lütfen \`ekle\`, \`kaldır\` veya \`liste\` olacak şekilde bir **argüman belirtin!**`)).then(m => m.delete(({ timeout: 15000 })));
  
  if (args[0] === "ekle") {
        
    if (!furkyHedefTag) message.lineReply(furkyEmbed.setDescription(`Lütfen yasaklı taglar listesine eklenecek **tagı belirtin!**`)).then(m => m.delete(({ timeout: 15000 })));
    if (furkyYasakliTagData.includes(furkyHedefTag)) message.lineReply(furkyEmbed.setDescription(`Eklemeye çalıştığınız **${furkyHedefTag}** tagı zaten yasaklı taglar listesinde!`)).then(m => m.delete(({ timeout: 15000 })));
        
    await db.push(`yasaklitaglar.${message.guild.id}`, furkyHedefTag);
    message.lineReply(furkyEmbed.setDescription(`\`${furkyHedefTag}\` tagı başarıyla yasaklı taglar listesine eklendi!`)).then(m => m.delete(({ timeout: 30000 })));
  
  };
  
  if (args[0] === "kaldır") {
        
    if (!furkyHedefTag) return message.lineReply(furkyEmbed.setDescription(`Lütfen yasaklı taglar listesinden kaldırılacak bir **tagı belirtin**!`)).then(m => m.delete(({ timeout: 15000 })));
    if (!furkyYasakliTagData.includes(furkyHedefTag)) return message.lineReply(furkyEmbed.setDescription(`Kaldırmaya çalıştığınız **${furkyHedefTag}** tagı zaten yasaklı taglar listesinde değil!`)).then(m => m.delete(({ timeout: 15000 })));
      
    await db.set(`yasaklitaglar.${message.guild.id}`, furkyYasakliTagData.filter(x => x !== furkyHedefTag));
      
    message.lineReply(furkyEmbed.setDescription(`\`${furkyHedefTag}\` tagı başarıyla yasaklı taglar listesinden kaldırıldı!`)).then(m => m.delete(({ timeout: 30000 })));
  };
  
  if (args[0] === "liste") {
        
    message.lineReply(furkyEmbed.setDescription(`
**${message.guild.name} sunucusuna ait yasaklı tag listesi:**

\`${furkyYasakliTagData.join('\n') || 'Eklenmiş bir yasaklı tag yok!'}\`
`));
    
  };

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yasaklitag", "yasakli-tag", "yasaklı-tag"],
  permLevel: 0
};

exports.help = {
  name: 'yasaklıtag'
};
const Discord = require("discord.js");
const client = new Discord.Client()
const { MessageEmbed } = require('discord.js');
const db = require("quick.db")
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {

  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const everyone = message.guild.roles.cache.find(a => a.name === '@everyone');
  
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  if(!args[0]) return message.lineReply(furkyEmbed.setDescription(`Lütfen bir seçenek belirtin! \n\nKilitlemek için: \`.kanal kilit - .kanal kapat\` \nKilit kaldırmak için: \`.kanal kilitaç - .kanal aç\` `)).then(furkySilinecek => furkySilinecek.delete(({ timeout: 5000})));
  
  if(args[0] == "kilit") {
    
    await message.channel.updateOverwrite(everyone, { 'SEND_MESSAGES': false });
    await message.react(config.GuildSettings.Emojis.okeyEmoji);
    await message.lineReply(furkyEmbed.setDescription(`Kanal \`@everyone\` rolüne başarıyla kilitlendi! :lock:`)).then(m => m.delete(({ timeout: 20000 })));
    
  };
  
  if(args[0] == "kapat") {
    
    await message.channel.updateOverwrite(everyone, { 'SEND_MESSAGES': false });
    await message.react(config.GuildSettings.Emojis.okeyEmoji);
    await message.lineReply(furkyEmbed.setDescription(`Kanal \`@everyone\` rolüne başarıyla kilitlendi! :lock:`)).then(m => m.delete(({ timeout: 20000 })));
    
  };
  
  if(args[0] == "kilitaç") {
    
    await message.channel.updateOverwrite(everyone, { 'SEND_MESSAGES': true });
    await message.react(config.GuildSettings.Emojis.okeyEmoji);
    await message.lineReply(furkyEmbed.setDescription(`Kanal kilidi \`@everyone\` rolüne başarıyla açıldı! :unlock:`)).then(m => m.delete(({ timeout: 20000 })));
    
  };
  
  if(args[0] == "aç") {
    
    await message.channel.updateOverwrite(everyone, { 'SEND_MESSAGES': true });
    await message.react(config.GuildSettings.Emojis.okeyEmoji);
    await message.lineReply(furkyEmbed.setDescription(`Kanal kilidi \`@everyone\` rolüne başarıyla açıldı! :unlock:`)).then(m => m.delete(({ timeout: 20000 })));
    
  };

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["channel"],
  permLevel: 0
};
exports.help = {
  name: 'kanal'
};
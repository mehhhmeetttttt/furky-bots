const Discord = require("discord.js");
const db = require("quick.db")
const config = require("../../config.json");

exports.run = async (client, message, args) => {

  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const furkyChannel = message.guild.channels.cache.get(args[0]);
  const sıra = await db.fetch('case');
  
  if(!message.member.hasPermission("ADMINISTRATOR")) 
  return message.react(config.GuildSettings.Emojis.crossEmoji);

  if(!furkyChannel) message.lineReply(furkyEmbed.setDescription(`Lütfen herkesin susturmasının kaldırılacağı kanalın ID'sini giriniz!`)).then(m => m.delete(({ timeout: 10000 })));

  furkyChannel.members.filter(a => !a.hasPermission("ADMINISTRATOR")).array().forEach(async(furkyMembers) => {
    await furkyMembers.voice.setMute(false).catch(x => message.channel.send(`İşlem uygulanırken bir hata meydana geldi, lütfen Furky ile iletişime geçin!\n\n${x}`));
  });

  await db.add('case', 1);
  await message.react(config.GuildSettings.Emojis.okeyEmoji);
  
  message.lineReply(furkyEmbed.setDescription(`<#${furkyChannel}> (\`${furkyChannel.id}\`) kanalındaki toplam **${furkyChannel.members.size}** kullanıcının susturması ${message.author} tarafından toplu olarak kaldırıldı!`)).then(m => m.delete(({ timeout: 30000 })));
 
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["all-voice-un-mute","all-voiceunmute","allvoice-unmute"],
    permLevel: 0
};

exports.help = {
  name: "allvoiceunmute"
};
const Discord = require("discord.js");
const db = require("quick.db")
const config = require("../../config.json");

exports.run = async (client, message, args) => {

  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const furkyChannel = message.guild.channels.cache.get(args[0]);
  const sıra = await db.fetch('case');
  
  if(!message.member.hasPermission("ADMINISTRATOR")) 
  return message.react(config.GuildSettings.Emojis.crossEmoji);

  if(!furkyChannel) message.lineReply(furkyEmbed.setDescription(`Lütfen herkesin susturulacağı kanalın ID'sini giriniz!`)).then(m => m.delete(({ timeout: 10000 })));

  furkyChannel.members.filter(a => !a.hasPermission("ADMINISTRATOR")).array().forEach(async(furkyMembers) => {
    await furkyMembers.voice.setMute(true).catch(x => message.channel.send(`İşlem uygulanırken bir hata meydana geldi, lütfen Furky ile iletişime geçin!\n\n${x}`));
  });

  await db.add('case', 1);
  await message.react(config.GuildSettings.Emojis.okeyEmoji);
  
  message.lineReply(furkyEmbed.setDescription(`<#${furkyChannel}> (\`${furkyChannel.id}\`) kanalındaki toplam **${furkyChannel.members.size}** kullanıcı ${message.author} tarafından toplu olarak susturuldu!`)).then(m => m.delete(({ timeout: 30000 })));
 
};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["all-voice-mute","all-voicemute","allvoice-mute"],
    permLevel: 0
};

exports.help = {
  name: "allvoicemute"
};
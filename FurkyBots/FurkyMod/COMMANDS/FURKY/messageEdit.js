const Discord = require('discord.js');
const config = require("../../config.json");
const ayarlar = require("../../ayarlar.json");
require("discord-reply");

exports.run = async(client, message, args) => {
  
  if(message.author.id !== ayarlar.sahip) return;
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const düzenlenecek = args.splice(1).join(" ");
  
  if(!args[0]) return message.channel.send(furkyEmbed.setDescription("Lütfen bota ait bir mesaj ID'si girin!")).then(m => m.delete(({ timeout: 5000})));
  if(!düzenlenecek) return message.channel.send(furkyEmbed.setDescription("Lütfen bir mesaj girin!")).then(m => m.delete(({ timeout: 5000})));

  message.channel.messages.fetch(args[0]).then(furkyMessage => {
    if(furkyMessage.author.id !== client.user.id) return message.channel.send(furkyEmbed.setDescription(`**${args[0]}** ID'li mesaj bana ait değil!`)).then(m => m.delete(({ timeout: 5000})));
    furkyMessage.edit(düzenlenecek);
    message.channel.send(furkyEmbed.setDescription(`**${args[0]}** ID'li mesaj başarıyla \`${düzenlenecek}\` olarak düzenlendi!`));
  });

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mesajedit", "mesaj-edit", "messageedit", "message-edit"],
  permLevel: 4
};

exports.help = {
  name: 'edit'
};
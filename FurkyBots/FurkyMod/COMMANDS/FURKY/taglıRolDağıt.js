const Discord = require("discord.js");
const data = require("quick.db");
const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const ayarlar = require("../../ayarlar.json");

exports.run = async (client, message, args) => {
  
  if(message.author.id !== ayarlar.sahip) return;
  
  let furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  let rol = config.Tag.tagRol;
  let tag1 = config.Tag.tag1;
  let tag2 = config.Tag.tag2;
  let tag3 = config.Tag.tag3;
  let tag4 = config.Tag.tag4;
  let tag5 = config.Tag.tag5;
  let tag6 = config.Tag.tag6;
  let tag7 = config.Tag.tag7;
  let tag8 = config.Tag.tag8;
  let tag9 = config.Tag.tag9;
  let etiket = config.Tag.discrim;
  
  message.guild.members.cache.filter(s => s.user.username.includes(tag1) || s.user.username.includes(tag2) || s.user.username.includes(tag3) || s.user.username.includes(tag4) || s.user.username.includes(tag5) || s.user.username.includes(tag6) || s.user.username.includes(tag7) || s.user.username.includes(tag8) || s.user.username.includes(tag9) || s.user.discriminator === etiket && !s.roles.cache.has(rol)).forEach(async(m) => await m.roles.add(rol));
  message.channel.send(furkyEmbed.setDescription(`Kullanıcı adında \`${tag1}, ${tag2}, ${tag3}, ${tag4}, ${tag5}, ${tag6}, ${tag7}, #${etiket}\` taşıyan ancak <@&${rol}> rolü olmayan bütün kullanıcılara <@&${rol}> rolü dağıtılmaya başlanıyor...`));
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["taglıroldagit", "taglırolver", "taglirolver", "taglı-rol-dağıt", "tagli-rol-dagit", "taglı-rol-ver", "tagli-rol-ver"],
  permLevel: 4
};

exports.help = {
  name: 'taglıroldağıt'
};
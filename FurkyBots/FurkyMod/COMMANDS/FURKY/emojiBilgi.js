const Discord = require('discord.js');
const db = require("quick.db");
const config = require("../../config.json");
const ayarlar = require("../../ayarlar.json");

exports.run = async(client, message, args) => {

  
  if(message.author.id !== ayarlar.sahip) return;


  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  
  
  const furky0 = message.guild.emojis.cache.find(x => x.name === "furky_0");
  const furky1 = message.guild.emojis.cache.find(x => x.name === "furky_1");
  const furky2 = message.guild.emojis.cache.find(x => x.name === "furky_2");
  const furky3 = message.guild.emojis.cache.find(x => x.name === "furky_3");
  const furky4 = message.guild.emojis.cache.find(x => x.name === "furky_4");
  const furky5 = message.guild.emojis.cache.find(x => x.name === "furky_5");
  const furky6 = message.guild.emojis.cache.find(x => x.name === "furky_6");
  const furky7 = message.guild.emojis.cache.find(x => x.name === "furky_7");
  const furky8 = message.guild.emojis.cache.find(x => x.name === "furky_8");
  const furky9 = message.guild.emojis.cache.find(x => x.name === "furky_9");
  const furky_Tik = message.guild.emojis.cache.find(x => x.name === "furky_Tik");
  const furky_Carpi = message.guild.emojis.cache.find(x => x.name === "furky_Carpi");
  const furky_Coin = message.guild.emojis.cache.find(x => x.name === "furky_Coin");
  const furky_E = message.guild.emojis.cache.find(x => x.name === "furky_E");
  const furky_K = message.guild.emojis.cache.find(x => x.name === "furky_K");
  const furky_star = message.guild.emojis.cache.find(x => x.name === "furky_Star");
  
  message.channel.send(furkyEmbed.setDescription(`
${furky0} / **${furky0.name}** / \`<a:${furky0.name}:${furky0.id}>\`
${furky1} / **${furky1.name}** / \`<a:${furky1.name}:${furky1.id}>\`
${furky2} / **${furky2.name}** / \`<a:${furky2.name}:${furky2.id}>\`
${furky3} / **${furky3.name}** / \`<a:${furky3.name}:${furky3.id}>\`
${furky4} / **${furky4.name}** / \`<a:${furky4.name}:${furky4.id}>\`
${furky5} / **${furky5.name}** / \`<a:${furky5.name}:${furky5.id}>\`
${furky6} / **${furky6.name}** / \`<a:${furky6.name}:${furky6.id}>\`
${furky7} / **${furky7.name}** / \`<a:${furky7.name}:${furky7.id}>\`
${furky8} / **${furky8.name}** / \`<a:${furky8.name}:${furky8.id}>\`
${furky9} / **${furky9.name}** / \`<a:${furky9.name}:${furky9.id}>\`
${furky_Tik} / **${furky_Tik.name}** / \`<a:${furky_Tik.name}:${furky_Tik.id}>\`
${furky_Carpi} / **${furky_Carpi.name}** / \`<a:${furky_Carpi.name}:${furky_Carpi.id}>\`
${furky_Coin} / **${furky_Coin.name}** / \`<a:${furky_Coin.name}:${furky_Coin.id}>\`
${furky_E} / **${furky_E.name}** / \`<a:${furky_E.name}:${furky_E.id}>\`
${furky_K} / **${furky_K.name}** / \`<a:${furky_K.name}:${furky_K.id}>\`
${furky_star} / **${furky_star.name}** / \`<a:${furky_star.name}:${furky_star.id}>\`
  `));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'emojiler'
};
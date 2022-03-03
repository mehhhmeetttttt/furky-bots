const Discord = require('discord.js');
const db = require("quick.db");
const config = require("../../config.json");
const ayarlar = require("../../ayarlar.json");

exports.run = async(client, message, args) => {

  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const rolsuztanim = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
  const kayıtsızRol1 = await db.fetch(`kayıtsızRol1.${message.guild.id}`);
  
  if(message.author.id !== ayarlar.sahip) return;

  await message.channel.send(furkyEmbed.setDescription(`Rolsüz herkesin rolü dağıtılıyor...`));
  
  if(!args[0]) {
    rolsuztanim.forEach(async(r) => {
      await r.roles.add(kayıtsızRol1);
    });

  };


};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'rolsüz'
};
const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const datab = require('quick.db');
const data = require("quick.db");
const db = require('quick.db');
const moment = require('moment');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
    
  const banYetkili = await data.fetch(`banYetkili.${message.guild.id}`);
  const unbanLog = await data.fetch(`banLog.${message.guild.id}`);
  const sıra = await db.fetch('case');
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const kisi = args[0];
  moment.locale("tr");
  
  if(![banYetkili].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  if(!kisi) return message.channel.send(furkyEmbed.setDescription(`Lütfen sunucudan yasaklanmış bir kullanıcının **ID'sini girin!** \n .unban ID`)).then(m => m.delete(({ timeout: 5000})));

  message.guild.fetchBans().then(bannedUsers => {
    let bannedMember = bannedUsers.find(yasakli => yasakli.user.id == kisi)
    
    if(bannedUsers.size == 0) return message.channel.send(furkyEmbed.setDescription(`Sunucuda yasaklı bir kullanıcı bulunmuyor!`)).then(m => m.delete(({ timeout: 5000})));
    if(!bannedMember) return message.channel.send(furkyEmbed.setDescription(`${kisi} ID'li kullanıcı sunucuda yasaklı değil!`)).then(m => m.delete(({ timeout: 5000})));
  });

  await message.guild.members.unban(kisi);
  await db.add('case', 1);
  await message.react(config.GuildSettings.Emojis.okeyEmoji);

  message.channel.send(furkyEmbed.setDescription(`<@!${kisi}> kullanıcısının sunucu yasağı ${message.author} tarafından **kaldırıldı!**`))
  .then(furkySilinecek => furkySilinecek.delete(({ timeout: 10000})));
  
client.channels.cache.get(unbanLog).send(new MessageEmbed()
.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setColor('RANDOM')
.setTitle("Bir kullanıcının sunucu yasağı kaldırıldı!")
.setDescription(`
**───────────────**

**Yasağı kaldırılan kullanıcı ID**: \`${kisi.id}\`
**Yasağı kaldıran kullanıcı**: ${message.author} (\`${message.author.id}\`)

**───────────────**

**Yasak kaldırma tarihi**: \`${moment(Date.now()).add(10,"hours").format("HH:mm:ss DD MMMM YYYY")}\`
**İşlem numarası:** \`#${sıra || "1"}\`

**───────────────**
`));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yasakkaldır", "yasakkaldir", "yasak-kaldır", "yasak-kaldir"],
  permLevel: 0,
};

exports.help = {
  name: 'unban'
};
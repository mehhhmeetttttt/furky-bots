const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
  
if(!message.member.hasPermission("ADMINISTRATOR"))
return message.react(config.GuildSettings.Emojis.crossEmoji);
  
    let furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
    let publicKanallar = "934122798727708672";
    let publicDağıtılacak = message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.id === message.member.voice.channel.id).filter(x => x.voice.selfDeaf === false);
    let afkAtılacak = message.guild.members.cache.filter(s => s.voice.channel && s.voice.channel.id === message.member.voice.channel.id).filter(x => x.voice.selfDeaf === true);
    let kanallar = message.guild.channels.cache.filter(s => s.parentID === publicKanallar);
    let afkKanal = "934122849042595982";
  
    if (!message.member.voice.channel) {
      return message.channel.send(furkyEmbed.setDescription(`Lütfen herhangi bir sesli kanala giriş yapın!`));
    };

    afkAtılacak.array().forEach(async(member, index) => {
        setTimeout(() => {
            member.voice.setChannel(afkKanal)
        }, index * 2000)
    });

    publicDağıtılacak.array().forEach(async(member, index) => {
        setTimeout(() => {
            member.voice.setChannel(kanallar.random())
        }, index * 2000)
    });
  
    await message.channel.send(furkyEmbed.setDescription(`AFK olan toplam \`${afkAtılacak.size}\` kullanıcı AFK kanalına, geri kalan **\`${publicDağıtılacak.size}\`** aktif kullanıcı public kanallara dağıtıldı!`));

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["publicdağıt","public-dağıt","publicleredağıt","publiclere-dağıt"],
  permLevel: 0
};

exports.help = {
  name: 'dağıt'
};
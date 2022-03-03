const Discord = require("discord.js");
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {

  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const kullanıcı = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  
const filter = (reaction, user) => {
  return [`✅`, `❌`].includes(reaction.emoji.name) && user.id === kullanıcı.id;
};


if (!message.member.voice.channel) return message.reply(furkyEmbed.setDescription(`Lütfen öncelikle bir sesli kanala **giriş yapın!**`)).then(m => m.delete(({ timeout: 5000 })));
if (!kullanıcı) return message.channel.send(furkyEmbed.setDescription(`Lütfen yanınıza çekmek istediğiniz **kullanıcıyı etiketleyin!** \n .izinliçek @Furky/ID`)).then(m => m.delete(({ timeout: 5000 })));
if (!kullanıcı.voice.channel) return message.channel.send(furkyEmbed.setDescription(`Yanınıza çekmek istediğiniz kullanıcı **herhangi bir sesli kanalda bulunmuyor!**`)).then(m => m.delete(({ timeout: 5000 })));
if(message.member.voice.channel === kullanıcı.voice.channel) return message.channel.send(furkyEmbed.setDescription(`Zaten kullanıcı ile **aynı ses kanalında bulunuyorsunuz!**`)).then(m => m.delete(({ timeout: 5000 })));
  
let izinliSoru = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`${message.author} kullanıcısı sizi bulunduğu kanala çekmek istiyor, izin veriyor musunuz? \n**Bu işlem 60 saniye sonra iptal olacaktır!**`)
.setFooter(config.BotSettings.botFooter);

await message.channel.send(`${kullanıcı}`);
let mesaj = await message.channel.send(izinliSoru);
await mesaj.react("✅");
await mesaj.react("❌");

mesaj.awaitReactions(filter, {
  max: 1,
  time: 60000,
  errors: ['time']
}).then(async(collected) => {

const reaction = collected.first();
  if (reaction.emoji.name === "✅") {
    await kullanıcı.voice.setChannel(message.member.voice.channel.id);
    mesaj.edit(furkyEmbed.setDescription(`${kullanıcı} kullanıcısı odanıza çekme teklifinizi **kabul etti!**`)).then(m => m.delete(({ timeout: 10000 })));
  } else {
    await mesaj.edit(furkyEmbed.setDescription(`${kullanıcı} kullanıcısı odanıza çekme teklifinizi **reddetti!**`)).then(m => m.delete(({ timeout: 10000 })));
  }
});
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["izinli-git"],
  permLevel: 0
};

exports.help = {
  name: "izinligit"
};
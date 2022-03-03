const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const data = require('quick.db');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");
const moment = require('moment');

exports.run = async (client, message, args) => {

const furky = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  
if (!furky) return message.channel.send(furkyEmbed.setDescription("Lütfen bir **kullanıcı etiketleyin!**")).then(m => m.delete(({ timeout: 5000 })));
  
const name = args[1].charAt(0).replace("i", "İ").toUpperCase() + args[1].slice(1).toLowerCase();
const age = args[2];
const kadınRol1 = await data.fetch(`kadınRol1.${message.guild.id}`);
const kayıtYetkili = await data.fetch(`kayıtYetkili.${message.guild.id}`);
const kayıtsızRol1 = await data.fetch(`kayıtsızRol1.${message.guild.id}`);
const kayıtLog = await data.fetch(`kayıtLog.${message.guild.id}`);
const chat = await data.fetch(`chatKanal.${message.guild.id}`);
const kayıtOlma = await data.fetch(`kayıtOlma.${furky.id}.${message.guild.id}`);
const cezaNo = await data.fetch(`ceza.${furky.id}`);
const vipRol = await data.fetch(`vipRol.${message.guild.id}`);
const boosterRol = await data.fetch(`boosterRol.${message.guild.id}`);
moment.locale("tr");

const isimlerVeri = await data.fetch(`isimler.${furky.id}`);
let isimler = isimlerVeri ? isimlerVeri.map((value, index) => `**${index + 1}.** \`${value.Name} | ${value.Age}\` (<@&${value.Rol}> - **${value.Tarih}**)`).join(`\n`) : "Kullanıcının geçmişe ait kayıt verisi bulunamadı!";

// **${index + 1}.** \`${value.Name} | ${value.Age}\` (<@&${value.Rol}> - **${value.Tarih}**)
// ${value.Tarih} tarihinde ${value.Registerer} tarafından <@&${value.Rol}> cinsiyetiyle \`${value.Name} | ${value.Age}\` şeklinde 

if(!message.member.roles.cache.has(kayıtYetkili) && (!message.member.hasPermission("ADMINISTRATOR")))
return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  if(furky.roles.cache.has(kadınRol1)) return message.lineReply(furkyEmbed.setDescription(`Kullanıcı zaten sunucumuzda kayıtlı!`)).then(m => m.delete(({ timeout: 10000 })));
  if(!furky.roles.cache.has(config.Tag.tagRol) && !furky.roles.cache.has(vipRol) && !furky.roles.cache.has(boosterRol)) return message.lineReply(furkyEmbed.setDescription(`Tagsız kullanıcılar **kayıt edilemez**! Tagsız bir kullanıcının kayıt edilebilmesi için **boost basması** veya **VIP** olması gerekmektedir!`)).then(m => m.delete(({ timeout: 10000 })));
  if(message.member.roles.highest.position <= furky.roles.highest.position) return message.channel.send(furkyEmbed.setDescription("Etiketlediğiniz kullanıcının rolü **sizinkinden yüksek** veya **sizinkiyle aynı**!")).then(m => m.delete(({ timeout: 5000 })));
  if(furky.id === message.author.id) return message.channel.send(furkyEmbed.setDescription("Kendini **kayıt edemezsin**!")).then(m => m.delete(({ timeout: 5000 })));
  if(furky.id === client.user.id) return message.channel.send(furkyEmbed.setDescription("Bir botu **kayıt edemezsin**!")).then(m => m.delete(({ timeout: 5000 })));
  if(!name) return message.channel.send(furkyEmbed.setDescription("Lütfen bir **isim girin**!")).then(m => m.delete(({ timeout: 5000 })));
  if(name > 12) return message.channel.send(furkyEmbed.setDescription(`Lütfen **12 harften** küçük bir isim girin!`)).then(m => m.delete(({ timeout: 5000 })));
  if(!age) return message.channel.send(furkyEmbed.setDescription("Lütfen bir **yaş girin**!")).then(m => m.delete(({ timeout: 5000 })));
  if(isNaN(age)) return message.channel.send(furkyEmbed.setDescription("Lütfen yaş girerken **sadece sayı girin!**")).then(m => m.delete(({ timeout: 5000 })));
  if(age < 12) return message.channel.send(furkyEmbed.setDescription("Lütfen **12**'den büyük bir yaş girin!'")).then(m => m.delete(({ timeout: 5000 })));
  if(cezaNo > 20) return message.channel.send(furkyEmbed.setDescription(`${furky} kullanıcısı sunucuda **20 puandan fazla** fazla ceza-i işlem almış! Sunucumuza zarar veren kullanıcılar kayıt edilemez!`)).then(m => m.delete(({ timeout: 5000 })));
  
  if (furky.user.tag.includes(config.Tag.tag)) {
    await furky.setNickname(`• ${name} | ${age}`)
  } else {
    await furky.setNickname(`• ${name} | ${age}`)
  };

await furky.roles.add(kadınRol1);
await furky.roles.remove(kayıtsızRol1);

await data.push(`isimler.${furky.id}`, {
  Registerer: message.author.id,
  Name: name,
  Age: age,
  Rol: kadınRol1,
  Tarih: moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")
});

await data.add(`erkekKayıt.${message.author.id}.${message.guild.id}`, 1);
await data.add(`toplamKayıt.${message.author.id}.${message.guild.id}`, 1);
await message.react(config.GuildSettings.Emojis.okeyEmoji);

message.channel.send(furkyEmbed.setDescription(`
${furky} kullanıcısı ${message.author} tarafından başarıyla \`${name} | ${age}\` olarak kayıt edildi!

Kullanıcı, daha önce sunucumuzda **${kayıtOlma || "0"}** kere kayıt olmuş!
Kullanıcının geçmiş isimleri:

${isimler || "Kullanıcının geçmişe ait kayıt verisi bulunamadı!"}`)).then(m => m.delete(({ timeout: 30000})));
  
client.channels.cache.get(kayıtLog).send(furkyEmbed.setDescription(`
${furky} kullanıcısı ${message.author} tarafından kayıt edildi!

**─────────────────**

**İsim / Yaş:** \`${name} / ${age}\`
**Kayıt edilen:** ${furky}
**Kayıt eden:** ${message.author}

**Kayıt tarihi:** \`${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}\`
**Kayıt Türü:** \`Kadın\`
`));

await data.add(`kayıtOlma.${furky.id}.${message.guild.id}`, 1);
await data.set(`kayıtTürü.${furky.id}`, `Kadın`);
await data.set(`kayıtİsmi.${furky.id}`, `${name}`);
await data.set(`kayıtYaşı.${furky.id}`, `${age}`);
  
client.channels.cache.get(chat).send(`${config.GuildSettings.Emojis.tagEmoji} ${furky} aramıza katıldı! Haydi, herkes ona hoşgeldin desin!`).then(m => m.delete(({ timeout: 30000})));
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["k"],
  permLevel: 0
};

exports.help = {
  name: 'kadın'
};
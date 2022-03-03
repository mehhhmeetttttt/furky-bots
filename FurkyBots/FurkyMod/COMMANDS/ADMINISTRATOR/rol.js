const Discord = require('discord.js');
const db = require("quick.db");
const moment = require('moment');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");
moment.locale("tr");

exports.run = async (client, message, args) => {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  
  if(!message.member.roles.cache.has("934122727789449246") && (!message.member.hasPermission("ADMINISTRATOR")))
  return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  if(!args[0]) return message.lineReply(furkyEmbed.setDescription(`Lütfen \`ver\` veya \`al\` olacak şekilde bir argüman belirtiniz!`)).then(m => m.delete(({ timeout: 15000 })));

  if(args[0] === `ver` || args[0] === `Ver`) {
    
    let kullanıcı = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[1]));
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
    
    if(!kullanıcı) return message.lineReply(furkyEmbed.setDescription(`Lütfen rol verilecek **kullanıcıyı etiketleyin** veya **ID girin**!`)).then(m => m.delete(({ timeout: 10000 })));
    if(!rol) return message.lineReply(furkyEmbed.setDescription(`Lütfen verilecek bir **rol etiketleyin** veya **ID girin**!`)).then(m => m.delete(({ timeout: 10000 })));
    if(rol.position >= message.member.roles.highest.position) return message.lineReply(furkyEmbed.setDescription(`Kullanıcıya vermeye çalıştığınız rol **sizinkinden daha yüksek**!`)).then(m => m.delete(({ timeout: 10000 })));
    if(message.guild.me.roles.highest.position <= rol.position) return message.lineReply(furkyEmbed.setDescription(`Kullanıcıya vermeye çalıştığınız rol **benimkinden daha yüksek**!`)).then(m => m.delete(({ timeout: 10000 })));
    if(kullanıcı.roles.cache.has(rol.id)) return message.lineReply(furkyEmbed.setDescription(`Kullanıcı zaten ${rol} rolüne sahip!`)).then(m => m.delete(({ timeout: 10000 })));

    await kullanıcı.roles.add(rol);
    await db.push(`rolLog.${kullanıcı.id}`, `${config.GuildSettings.Emojis.okeyEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** - ${message.author} tarafından ${rol}`);
    await db.add(`rolSayı.${kullanıcı.id}`, 1);
    await message.react(config.GuildSettings.Emojis.okeyEmoji);
    await message.lineReply(furkyEmbed.setDescription(`${kullanıcı} kullanıcısına başarıyla ${rol} **rolü verildi!**`)).then(m => m.delete(({ timeout: 30000 })));
    
  };
  
  if(args[0] === `al` || args[0] === `Al`) {
    
    let kullanıcı = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[1]));
    let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[2])
    
    if(!kullanıcı) return message.lineReply(furkyEmbed.setDescription(`Lütfen rol alınacak **kullanıcıyı etiketleyin** veya **ID girin**!`)).then(m => m.delete(({ timeout: 10000 })));
    if(!rol) return message.lineReply(furkyEmbed.setDescription(`Lütfen alınacak bir **rol etiketleyin** veya **ID girin**!`)).then(m => m.delete(({ timeout: 10000 })));
    if(message.member.roles.highest.position <= rol.position) return message.lineReply(furkyEmbed.setDescription(`Kullanıcıdan almaya çalıştığınız rol **sizinkinden daha yüksek**!`)).then(m => m.delete(({ timeout: 10000 })));
    if(message.guild.me.roles.highest.position <= rol.position) return message.lineReply(furkyEmbed.setDescription(`Kullanıcıdan almaya çalıştığınız rol **benimkinden daha yüksek**!`)).then(m => m.delete(({ timeout: 10000 })));
    if(!kullanıcı.roles.cache.has(rol.id)) return message.lineReply(furkyEmbed.setDescription(`Kullanıcıda zaten ${rol} rolü yok!`)).then(m => m.delete(({ timeout: 10000 })));
    
    await kullanıcı.roles.remove(rol);
    await db.push(`rolLog.${kullanıcı.id}`, `${config.GuildSettings.Emojis.crossEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** - ${message.author} tarafından ${rol}`);
    await db.add(`rolSayı.${kullanıcı.id}`, 1);
    await message.react(config.GuildSettings.Emojis.okeyEmoji);
    await message.lineReply(furkyEmbed.setDescription(`${kullanıcı} kullanıcısından başarıyla ${rol} **rolü alındı!**`))
    
  };
  
  if(args[0] === `log` || args[0] === `Log`) {
    
    const kullanıcı = message.mentions.members.first();
    if(!kullanıcı) return message.lineReply(furkyEmbed.setDescription(`Lütfen rol bilgilerine bakılacak **kullanıcıyı etiketleyin**!`)).then(m => m.delete(({ timeout: 10000 })));
    
    const rolLog = await db.get(`rolLog.${kullanıcı.id}`) || `Rol bilgisi bulunamadı!`;
    const rolSayı = await db.fetch(`rolSayı.${kullanıcı.id}`)  || `0`;
    
    if(!rolLog || !rolSayı || rolLog === `null` || rolLog === `Null` || rolSayı === `0`) return message.channel.send(furkyEmbed.setDescription(`Kullanıcıya ait bir rol verisi bulunamadı!`)).then(m => m.delete(({ timeout: 10000 })));
    
    await message.react(config.GuildSettings.Emojis.okeyEmoji);
    await message.lineReply(furkyEmbed.setDescription(`
${kullanıcı} kullanıcısının toplam **${rolSayı || 0}** rol bilgisi bulundu!

**───────────────**
${rolLog.join(`\n**───────────────**\n`) || `Rol bilgisi bulunamadı!`}
**───────────────**
`));
    
  };
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["r", "role"],
  permLevel: 0
};

exports.help = {
  name: "rol"
};
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const ms = require("ms");
const db = require("quick.db");
const data = require("quick.db");
const jdb = new db.table("cezalar");
const kdb = new db.table("kullanici");
const moment = require("moment");
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
  
  const banYetkili = await data.fetch(`banYetkili.${message.guild.id}`);
  const banLog = await data.fetch(`banLog.${message.guild.id}`);
  const sıra = await db.fetch('case');
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const kullanici = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
  moment.locale("tr");
  
  if(![banYetkili].some(role => message.member.roles.cache.get(role)) && (!message.member.hasPermission("ADMINISTRATOR"))) 
  return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  const filter = (reaction, user) => {
    return ["1️⃣", "2️⃣", "3️⃣"].includes(reaction.emoji.name) && user.id === message.author.id;
  };
  
  if(!kullanici) return message.channel.send(furkyEmbed.setDescription(`Lütfen sunucudan yasaklanacak bir **kullanıcı etiketleyin** veya **ID girin**! \n .ban @Furky/ID`)).then(m => m.delete(({ timeout: 5000})));
  if(message.member.roles.highest.position <= kullanici.roles.highest.position) return message.channel.send(furkyEmbed.setDescription(`Yasaklamaya çalıştığınız kullanıcının yetkisi **sizden yüksek** veya **sizle aynı**!`)).then(m => m.delete(({ timeout: 5000})));
  if(kullanici.id === message.author.id) return message.channel.send(furkyEmbed.setDescription(`Kendini **yasaklayamazsın!**`)).then(m => m.delete(({ timeout: 5000})));
  if(kullanici.id === client.user.id) return message.channel.send(furkyEmbed.setDescription(`Bir botu **yasaklayamazsınız!**`)).then(m => m.delete(({ timeout: 5000})));
  if(kullanici.id === message.guild.OwnerID) return message.channel.send(furkyEmbed.setDescription(`Sunucu sahibini **yasaklayamazsınız!**`)).then(m => m.delete(({ timeout: 5000})));
  if(!kullanici.bannable) return message.channel.send(furkyEmbed.setDescription(`Etiketlenen kullanıcı **sunucudan yasaklanamaz!**`)).then(m => m.delete(({ timeout: 5000 })));
  if(args[1]) return message.channel.send(furkyEmbed.setDescription(`Bir kullanıcıyı yasaklarken **sebep giremezsiniz,** lütfen listeden çıkacak olan **sebeplerden birini seçiniz!**\n\n**Doğru kullanım: .ban** ${kullanici}`)).then(m => m.delete(({ timeout: 5000 })));
  
const banMesaj = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription(`
${kullanici} kullanıcısı birazdan sunucudan yasaklanacak, **lütfen bir yasak sebebi belirtin.**
Yasak sebebini belirtmek için aşağıdaki rakama tekabül eden **tepkiye tıklayın.**

1️⃣ => İfşa veya Taciz
2️⃣ => Özelden veya açık şekilde reklam
3️⃣ => Din, millet ve ırk değerlerine küfür

**Not: 60 saniye içerisinde bir yanıt verilmediği süre işlem iptal edilecektir.**
`)
.setFooter(config.BotSettings.botFooter);
  
let mesaj = await message.channel.send(banMesaj)
await mesaj.react("1️⃣");
await mesaj.react("2️⃣");
await mesaj.react("3️⃣");
  
mesaj.awaitReactions(filter, {
  max: 1,
  time: 60000,
  errors: ['time']
}).then(collected => {
const reaction = collected.first();
  
  if (reaction.emoji.name === "1️⃣") {
    
    mesaj.reactions.removeAll();
    let muteler = jdb.get(`tempmute`) || [];
    if (!muteler.some(j => j.id == kullanici.id)) {
       kdb.add(`kullanici.${message.author.id}.mute`, 1);
       kdb.push(`kullanici.${kullanici.id}.sicil`, {
        Yetkili: message.author.id,
        Sebep: "İfşa, Taciz",
        Ceza: "BAN",
        Süre: "Kalıcı",
        Tarih: `${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}`
    });
  };

    kullanici.ban({ reason: `${message.author.tag} tarafından, ifşa veya taciz sebebiyle` });
    db.add('case', 1);
    db.add(`ceza.${kullanici.id}`, 8);
    message.react(config.GuildSettings.Emojis.okeyEmoji);
    mesaj.edit(furkyEmbed.setDescription(`${kullanici} kullanıcısı **İfşa, Taciz** sebebiyle ${message.author} tarafından sunucudan yasaklandı!`));
  
    client.channels.cache.get(banLog).send(new MessageEmbed().setColor('RED').setTitle("Bir kullanıcı sunucudan yasaklandı!")
.setDescription(`
**Yasaklanan kullanıcı:** ${kullanici.user.tag} (\`${kullanici.user.id}\`)
**Yasaklayan kullanıcı:** ${message.author} (\`${message.author.id}\`)

**───────────────**

**Yasaklama sebebi:** \`İfşa, Taciz\`
**Yasaklama tarihi:** \`${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}\`
**İşlem numarası:** \`#${sıra || "1"}\`
`))

  };
  
  if (reaction.emoji.name === "2️⃣") {
    
    mesaj.reactions.removeAll();
    let muteler = jdb.get(`tempmute`) || [];
    if (!muteler.some(j => j.id == kullanici.id)) {
       kdb.add(`kullanici.${message.author.id}.mute`, 1);
       kdb.push(`kullanici.${kullanici.id}.sicil`, {
        Yetkili: message.author.id,
        Sebep: "Özelden veya açık şekilde reklam",
        Ceza: "BAN",
        Süre: "Kalıcı",
        Tarih: `${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}`
    });
  };

    kullanici.ban({ reason: `${message.author.tag} tarafından, özelden veya açık şekilde reklam sebebiyle` });
    db.add('case', 1);
    db.add(`ceza.${kullanici.id}`, 8);
    message.react(config.GuildSettings.Emojis.okeyEmoji);
    mesaj.edit(furkyEmbed.setDescription(`${kullanici} kullanıcısı **Özelden veya açık şekilde reklam** sebebiyle ${message.author} tarafından sunucudan yasaklandı!`));
  
    client.channels.cache.get(banLog).send(new MessageEmbed().setColor('RED').setTitle("Bir kullanıcı sunucudan yasaklandı!")
.setDescription(`
**Yasaklanan kullanıcı:** ${kullanici.user.tag} (\`${kullanici.user.id}\`)
**Yasaklayan kullanıcı:** ${message.author} (\`${message.author.id}\`)

**───────────────**

**Yasaklama sebebi:** \`Özelden veya açık şekilde reklam\`
**Yasaklama tarihi:** \`${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}\`
**İşlem numarası:** \`#${sıra || "1"}\`
`))
    
  };
  
  if (reaction.emoji.name === "3️⃣") {
    
    mesaj.reactions.removeAll();
    let muteler = jdb.get(`tempmute`) || [];
    if (!muteler.some(j => j.id == kullanici.id)) {
       kdb.add(`kullanici.${message.author.id}.mute`, 1);
       kdb.push(`kullanici.${kullanici.id}.sicil`, {
        Yetkili: message.author.id,
        Sebep: "Din, millet ve ırk değerlerine küfür",
        Ceza: "BAN",
        Süre: "Kalıcı",
        Tarih: `${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}`
    });
  };

    kullanici.ban({ reason: `${message.author.tag} tarafından, din, millet ve ırk değerlerine küfür sebebiyle` });
    db.add('case', 1);
    db.add(`ceza.${kullanici.id}`, 8);
    message.react(config.GuildSettings.Emojis.okeyEmoji);
    mesaj.edit(furkyEmbed.setDescription(`${kullanici} kullanıcısı **Din, millet ve ırk değerlerine küfür** sebebiyle ${message.author} tarafından sunucudan yasaklandı!`));
  
    client.channels.cache.get(banLog).send(new MessageEmbed().setColor('RED').setTitle("Bir kullanıcı sunucudan yasaklandı!")
.setDescription(`
**Yasaklanan kullanıcı:** ${kullanici.user.tag} (\`${kullanici.user.id}\`)
**Yasaklayan kullanıcı:** ${message.author} (\`${message.author.id}\`)

**───────────────**

**Yasaklama sebebi:** \`Din, millet ve ırk değerlerine küfür\`
**Yasaklama tarihi:** \`${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}\`
**İşlem numarası:** \`#${sıra || "1"}\`
`))
    
  };
  
});

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yargı", "yasak", "yasakla"],
  permLevel: 0
};

exports.help = {
  name: "ban"
};
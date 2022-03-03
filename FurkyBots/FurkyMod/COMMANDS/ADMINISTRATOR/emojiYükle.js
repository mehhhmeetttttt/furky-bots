const Discord = require('discord.js');
const config = require("../../config.json");
const ayarlar = require("../../ayarlar.json");

exports.run = async (client, message, args) => {
  
  if(!message.member.roles.cache.has("934122727789449246") && (!message.member.hasPermission("ADMINISTRATOR")))
  return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  const filter = response => {
    return response.author.id === message.author.id;
  };

  message.channel.send(`Lütfen sunucuya eklenecek olan emojinin adını gir.`);

  let first;
  let two;

  message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
  .then(collected => {
    first = collected.first().content
    message.channel.send(`Lütfen emojiyi, emoji bağlantısını veya dosyayı gönderin veya yükleyin.`);
message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
.then(collected => {
  
  if(collected.first().attachments.size > 0) {
    two = collected.first().attachments.first().url;
  } else {
    const s = collected.first().content.split(' ').filter(x => x.includes('<') && x.includes('>'))[0];
    if(s) {
      two = `https://cdn.discordapp.com/emojis/${s.split(':')[2].split('>')[0]}${s.split('<')[0].split('')[1] === 'a' ? '.gif' : '.png'}?v=1`
    } else {
      two = collected.first().content;
    };

    };
  try {
    
  message.guild.emojis.create(two, first).then(emoji => {
  message.channel.send(`Emoji başarıyla yüklendi! ${message.guild.emojis.cache.get(emoji.id)}`);

  }).catch(error => message.channel.send(`Bir hata meydana geldi! Lütfen:
- Sunucuda emoji için yer olduğundan, 
- Dosyanını fotoğraf veya gif olduğundan, 
- 256KB'den küçük olduğundan,
emin ol ve tekrar dene.`))
  } catch(error) {
    console.log(error);
    return message.channel.send(`Bir hata meydana geldi! Lütfen:
- Sunucuda emoji için yer olduğundan, 
- Dosyanını fotoğraf veya gif olduğundan, 
- 256KB'den küçük olduğundan,
emin ol ve tekrar dene.`); 
  };
})
.catch(collected => {
  console.log(collected);
  return message.channel.send(`Bir hata meydana geldi! Lütfen:
- Sunucuda emoji için yer olduğundan, 
- Dosyanını fotoğraf veya gif olduğundan, 
- 256KB'den küçük olduğundan,
emin ol ve tekrar dene.`);  
});
  })
  .catch(collected => {
    console.log(collected);
    return message.channel.send(`Bir hata meydana geldi! Lütfen:
- Sunucuda emoji için yer olduğundan, 
- Dosyanını fotoğraf veya gif olduğundan, 
- 256KB'den küçük olduğundan,
emin ol ve tekrar dene.`);  
  });
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'emojiyükle'
};
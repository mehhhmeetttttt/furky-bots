const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
const config = require("../config.json");
const db = require('quick.db');
const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);

module.exports = message => {
  
  if (!message.guild) return;
  let prefix = ayarlar.prefix;
  let karaliste = db.fetch(`karbay.karaliste_${message.author.id}`);
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(ayarlar.prefix)) return;
  let command = message.content.split(' ')[0].slice(ayarlar.prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
 
  if (!client.commands.has(command)) {
    if (client.aliases.has(command)) {
      cmd = client.commands.get(client.aliases.get(command));
      } else {
    }
  }
  
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    if(karaliste) return message.channel.send(furkyEmbed
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setColor("BLACK")
.setDescription(`
${message.author} karalistede bulunuyorsun. Karalistede bulunduğun süre zarfı içerisinde bot komutlarını kullanamazsın.

**Neden karalisteye alındım?**
\`1- Bot sahibi tarafından engellenmiş olabilirsin!\`
\`2- Komut spamı yapmış olabilirsin!\`

Eğer karalisteden kaldırılmak istersen Furky ile iletişime geçebilirsin.
`));
    cmd.run(client, message, params, perms);
  }
};
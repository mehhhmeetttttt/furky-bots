const Discord = require('discord.js');
const backup = require('discord-backup');

exports.run = async (client, message, args) => {
  
  backup.list().then((backups) => {
    message.channel.send(backups)
  });

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yedeklerim"],
  permLevel: 0
};

exports.help = {
  name: "yedekler"
};
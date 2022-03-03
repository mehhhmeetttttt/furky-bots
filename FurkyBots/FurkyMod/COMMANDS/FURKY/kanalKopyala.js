const Discord = require('discord.js');
const config = require("../../config.json");
const ayarlar = require("../../ayarlar.json");

exports.run = async (client, message, args) => {
  
if(message.author.id !== ayarlar.sahip) return;

await message.channel.clone().then(async(furkyChannel) => {
  let furkyChannelPosition = message.channel.position;
  await furkyChannel.setPosition(furkyChannelPosition);
});

await message.channel.delete();

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'nuke'
};
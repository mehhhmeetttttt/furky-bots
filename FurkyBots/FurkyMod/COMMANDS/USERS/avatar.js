const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {

var user;
var avatar_embed_1;
var avatar_embed_2;
var id = args[0];
if(isNaN(args[0]) || args[0].length < 18 || args[0].length > 18) id = message.author.id 

try {

user = message.mentions.users.first() || await client.users.fetch(id) || message.author

const furkyAv1 = new Discord.MessageEmbed()
.addField('Linkler:',`[PNG](${user.displayAvatarURL({ format: 'png',size: 1024 })})  -  [JPG](${user.displayAvatarURL({ format: 'jpg',size: 1024 })})  -  [WEBP](${user.displayAvatarURL({ format: 'webp',size: 1024 })})`)
.setColor('RANDOM')
.setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
message.channel.send(furkyAv1);

} catch (error) {

user = message.author;
console.log(error);
  
const furkyAv2 = new Discord.MessageEmbed()
.addField('Linkler:',`[PNG](${user.displayAvatarURL({ format: 'png',size: 1024 })})  -  [JPG](${user.displayAvatarURL({ format: 'jpg',size: 1024 })})  -  [WEBP](${user.displayAvatarURL({ format: 'webp',size: 1024 })})`)
.setColor('RANDOM')
.setImage(user.displayAvatarURL({dynamic: true, size: 1024}))
message.channel.send(furkyAv2)
}

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["av"],
    permLevel: 0
};

exports.help = {
  name: "avatar"
};
const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../../ayarlar.json');
const config = require("../../config.json");

exports.run = async (client, message, args) => {

if(message.author.id !== ayarlar.sahip) return;

let furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);

  if(args[0] == "ekle") {
    
let karbay = args[1]
if(!karbay || isNaN(karbay)) return message.channel.send(furkyEmbed.setDescription(`Lütfen karalisteye eklenecek bir kullanıcının **ID'sini giriniz!**`));

let karaliste = db.fetch(`karbay.karaliste_${karbay}`)
if(!karaliste) return message.channel.send(furkyEmbed.setDescription(`<@!${karbay}> (${karbay}) kullanıcısı **zaten karalistede!**`));

await db.set(`karbay.karaliste_${karbay}`, `ekli`)
message.channel.send(furkyEmbed.setDescription(`<@!${karbay}> (${karbay}) kullanıcısı başarıyla **karalisteye eklendi!**`));

    }
  
  if(args[0] == "add") {
    
let karbay = args[1]
if(!karbay || isNaN(karbay)) return message.channel.send(furkyEmbed.setDescription(`Lütfen karalisteye eklenecek bir kullanıcının **ID'sini giriniz!**`));

let karaliste = db.fetch(`karbay.karaliste_${karbay}`)
if(!karaliste) return message.channel.send(furkyEmbed.setDescription(`<@!${karbay}> (${karbay}) kullanıcısı **zaten karalistede!**`));

await db.set(`karbay.karaliste_${karbay}`, `ekli`)
message.channel.send(furkyEmbed.setDescription(`<@!${karbay}> (${karbay}) kullanıcısı başarıyla **karalisteye eklendi!**`));

    }
  
  if(args[0] == "kaldır") {
    
let karbay = args[1]
if(!karbay || isNaN(karbay)) return message.channel.send(furkyEmbed.setDescription(`Lütfen karalisteden çıkartılacak bir kullanıcının **ID'sini giriniz!**`));

let karaliste = db.fetch(`karbay.karaliste_${karbay}`)
if(!karaliste) return message.channel.send(furkyEmbed.setDescription(`<@!${karbay}> (${karbay}) kullanıcısı **zaten karalistede değil!**`));

await db.delete(`karbay.karaliste_${karbay}`,)
message.channel.send(furkyEmbed.setDescription(`<@!${karbay}> (${karbay}) kullanıcısı başarıyla **karalisteden çıkartıldı!**`));

    }
  
  if(args[0] == "çıkart") {
    
let karbay = args[1]
if(!karbay || isNaN(karbay)) return message.channel.send(furkyEmbed.setDescription(`Lütfen karalisteden çıkartılacak bir kullanıcının **ID'sini giriniz!**`));

let karaliste = db.fetch(`karbay.karaliste_${karbay}`)
if(!karaliste) return message.channel.send(furkyEmbed.setDescription(`<@!${karbay}> (${karbay}) kullanıcısı **zaten karalistede değil!**`));

await db.delete(`karbay.karaliste_${karbay}`,)
message.channel.send(furkyEmbed.setDescription(`<@!${karbay}> (${karbay}) kullanıcısı başarıyla **karalisteden çıkartıldı!**`));

    }
  
  if(args[0] == "remove") {
    
let karbay = args[1]
if(!karbay || isNaN(karbay)) return message.channel.send(furkyEmbed.setDescription(`Lütfen karalisteden çıkartılacak bir kullanıcının **ID'sini giriniz!**`));

let karaliste = db.fetch(`karbay.karaliste_${karbay}`)
if(!karaliste) return message.channel.send(furkyEmbed.setDescription(`<@!${karbay}> (${karbay}) kullanıcısı **zaten karalistede değil!**`));

await db.delete(`karbay.karaliste_${karbay}`,)
message.channel.send(furkyEmbed.setDescription(`<@!${karbay}> (${karbay}) kullanıcısı başarıyla **karalisteden çıkartıldı!**`));

    }
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["blacklist"],
  permLevel: 4
};

exports.help = {
  name: 'karaliste'
};
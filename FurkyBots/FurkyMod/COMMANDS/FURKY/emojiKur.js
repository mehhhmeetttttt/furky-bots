const Discord = require('discord.js');
const config = require("../../config.json");
const ayarlar = require("../../ayarlar.json");

exports.run = async (client, message, args) => {    

  if(message.author.id !== ayarlar.sahip) return;
  
  let furky_bosBaslangic = "https://cdn.discordapp.com/emojis/882744104428126209.png?v=1";
  let furky_bosOrta = "https://cdn.discordapp.com/emojis/882744104839180389.png?v=1";
  let furky_bosSon = "https://cdn.discordapp.com/emojis/882744104843378698.png?v=1";
  let furky_0 = "https://cdn.discordapp.com/emojis/882744104700764200.gif?v=1";
  let furky_1 = "https://cdn.discordapp.com/emojis/882744104742703134.gif?v=1";
  let furky_2 = "https://cdn.discordapp.com/emojis/882744104730103809.gif?v=1";
  let furky_3 = "https://cdn.discordapp.com/emojis/882744104423944214.gif?v=1";
  let furky_4 = "https://cdn.discordapp.com/emojis/882744104751095898.gif?v=1";
  let furky_5 = "https://cdn.discordapp.com/emojis/882744104763674644.gif?v=1";
  let furky_6 = "https://cdn.discordapp.com/emojis/882744104738488350.gif?v=1";
  let furky_7 = "https://cdn.discordapp.com/emojis/882744104763662356.gif?v=1";
  let furky_8 = "https://cdn.discordapp.com/emojis/882744104780464168.gif?v=1";
  let furky_9 = "https://cdn.discordapp.com/emojis/882744104570720277.gif?v=1";
  let furky_Carpi = "https://cdn.discordapp.com/emojis/882744106416214067.gif?v=1";
  let furky_Coin = "https://cdn.discordapp.com/emojis/882744105371852800.gif?v=1";
  let furky_E = "https://cdn.discordapp.com/emojis/882744109608095794.gif?v=1";
  let furky_K = "https://cdn.discordapp.com/emojis/882744109662613505.gif?v=1";
  let furky_Tik = "https://cdn.discordapp.com/emojis/882744105556389919.gif?v=1";
  let furky_doluBaslangic = "https://cdn.discordapp.com/emojis/882744104923054183.gif?v=1";
  let furky_doluOrta = "https://cdn.discordapp.com/emojis/882744104910454796.gif?v=1";
  let furky_doluSon = "https://cdn.discordapp.com/emojis/882744105359253524.gif?v=1";
    
  await message.guild.emojis.create(furky_bosBaslangic, "furky_bosBaslangic").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_bosOrta, "furky_bosOrta").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_bosSon, "furky_bosSon").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_0, "furky_0").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_1, "furky_1").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_2, "furky_2").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_3, "furky_3").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_4, "furky_4").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_5, "furky_5").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_6, "furky_6").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_7, "furky_7").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_8, "furky_8").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_9, "furky_9").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_Carpi, "furky_Carpi").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_Coin, "furky_Coin").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_E, "furky_E").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_K, "furky_K").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_Tik, "furky_Tik").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_doluBaslangic, "furky_doluBaslangic").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_doluOrta, "furky_doluOrta").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);
  await message.guild.emojis.create(furky_doluSon, "furky_doluSon").then(emoji => message.channel.send(`${emoji} ${emoji.name} emojisi başarıyla oluşturuldu! (Emoji ID: \`<${emoji.name}:${emoji.id}>\`)`)).catch(console.error);

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["emoji-kur"],
  permLevel: 4
};

exports.help = {
  name: 'emojikur'
};
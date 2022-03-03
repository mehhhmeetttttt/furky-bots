const Discord = require('discord.js');
const data = require('quick.db');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
  
  
  if(message.author.id !== ayarlar.sahip) return;
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  
  ///////////// Yetkili Rolleri
  
  if(args[0] == "yetkilirolleri") { 
    
    if(!args[1]) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol ismi gir!`)).then(m => m.delete(({ timeout: 5000 })));
    
    if(args[1] == "banyetkili") {
        
      if(args[2] == "rolkur") {
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`banYetkili.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**Ban yetkilisi rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`banYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Ban yetkilisi rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let banYetkili = await data.fetch(`banYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Ban yetkilisi rolü** ${`${banYetkili} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    
    if(args[1] == "cmuteyetkili") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`cMuteYetkili.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**Chat Mute yetkilisi rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`cMuteYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Chat Mute yetkilisi rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let cMuteYetkili = await data.fetch(`cMuteYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Chat Mute yetkilisi rolü** ${`${cMuteYetkili} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
        
    if(args[1] == "jailyetkili") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`jailYetkili.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**Jail yetkilisi rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`jailYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Jail yetkilisi rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let jailYetkili = await data.fetch(`jailYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Jail yetkilisi rolü** ${`${jailYetkili} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
        
    if(args[1] == "kickyetkili") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`kickYetkili.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**Kick yetkilisi rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`kickYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Kick yetkilisi rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let kickYetkili = await data.fetch(`kickYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Kick yetkilisi rolü** ${`${kickYetkili} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
        
    if(args[1] == "vmuteyetkili") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`vMuteYetkili.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**Voice Mute yetkilisi rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`vMuteYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Voice Mute yetkilisi rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let vMuteYetkili = await data.fetch(`vMuteYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Voice Mute yetkilisi rolü** ${`${vMuteYetkili} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
        
    if(args[1] == "transportyetkili") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`transportYetkili.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**Transport yetkilisi rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`transportYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Transport yetkilisi rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let transportYetkili = await data.fetch(`transportYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Transport yetkilisi rolü** ${`${transportYetkili} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
        
    if(args[1] == "botcommandyetkili") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`botCommandYetkili.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**Bot Komut yetkilisi rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`botCommandYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Bot Komut yetkilisi rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let botCommandYetkili = await data.fetch(`botCommandYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Bot Komut yetkilisi rolü** ${`${botCommandYetkili} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
        
    if(args[1] == "enaltyt") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`enAltYetkili.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**En alt yetkili rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`enAltYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**En alt yetkili rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let enAltYetkili = await data.fetch(`enAltYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**En alt yetkili rolü** ${`${enAltYetkili} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
        
    if(args[1] == "booster") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`boosterRol.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**Booster rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`boosterRol.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Booster rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let boosterRol = await data.fetch(`boosterRol.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Booster rolü** ${`${boosterRol} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    }
  
  
  ///////////// Ceza Logları
  
  if(args[0] == "cezalogları") { 

  if(!args[1]) return message.channel.send(furkyEmbed.setDescription(`Lütfen log ismi gir!`)).then(m => m.delete(({ timeout: 5000})));
    
    if(args[1] == "banlog") {
        
      if(args[2] == "kanalkur") {
        let mentionChannel = message.mentions.channels.first();
        if(!mentionChannel) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir kanal etiketle!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`banLog.${message.guild.id}`, mentionChannel.id);
        message.channel.send(furkyEmbed.setDescription(`**Ban - Log kanalı** başarıyla ${mentionChannel} \`(${mentionChannel.id} - ${mentionChannel.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalsıfırla") {
        await data.delete(`banLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Ban - Log kanalı** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalbak") {
        let banLog = await data.fetch(`banLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Ban - Log kanalı** ${`${banLog} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    
    if(args[1] == "cmutelog") {
        
      if(args[2] == "kanalkur") {
        let mentionChannel = message.mentions.channels.first();
        if(!mentionChannel) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir kanal etiketle!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`chatMuteLog.${message.guild.id}`, mentionChannel.id);
        message.channel.send(furkyEmbed.setDescription(`**ChatMute - Log kanalı** başarıyla ${mentionChannel} \`(${mentionChannel.id} - ${mentionChannel.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalsıfırla") {
        await data.delete(`chatMuteLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**ChatMute - Log kanalı** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalbak") {
        let chatMuteLog = await data.fetch(`chatMuteLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**ChatMute - Log kanalı** ${`${chatMuteLog} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
    }
    
    if(args[1] == "jaillog") {
        
      if(args[2] == "kanalkur") {
        let mentionChannel = message.mentions.channels.first();
        if(!mentionChannel) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir kanal etiketle!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`jailLog.${message.guild.id}`, mentionChannel.id);
        message.channel.send(furkyEmbed.setDescription(`**Jail - Log kanalı** başarıyla ${mentionChannel} \`(${mentionChannel.id} - ${mentionChannel.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalsıfırla") {
        await data.delete(`jailLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Jail - Log kanalı** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalbak") {
        let jailLog = await data.fetch(`jailLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Jail - Log kanalı** ${`${jailLog} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
    }
    
    if(args[1] == "kicklog") {
        
      if(args[2] == "kanalkur") {
        let mentionChannel = message.mentions.channels.first();
        if(!mentionChannel) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir kanal etiketle!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`kickLog.${message.guild.id}`, mentionChannel.id);
        message.channel.send(furkyEmbed.setDescription(`**Kick - Log kanalı** başarıyla ${mentionChannel} \`(${mentionChannel.id} - ${mentionChannel.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalsıfırla") {
        await data.delete(`kickLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Kick - Log kanalı** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalbak") {
        let kickLog = await data.fetch(`kickLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Kick - Log kanalı** ${`${kickLog} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
    }
    
    if(args[1] == "vmutelog") {
        
      if(args[2] == "kanalkur") {
        let mentionChannel = message.mentions.channels.first();
        if(!mentionChannel) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir kanal etiketle!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`vmuteLog.${message.guild.id}`, mentionChannel.id);
        message.channel.send(furkyEmbed.setDescription(`**Voicemute - Log kanalı** başarıyla ${mentionChannel} \`(${mentionChannel.id} - ${mentionChannel.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalsıfırla") {
        await data.delete(`vmuteLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Voicemute - Log kanalı** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalbak") {
        let vmuteLog = await data.fetch(`vmuteLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Voicemute - Log kanalı** ${`${vmuteLog} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    }
  
  
  // Cezalı Rolleri

  if(args[0] == "cezalırolleri") { 

  if(!args[1]) return message.channel.send(furkyEmbed.setDescription(`Lütfen rol ismi gir!`)).then(m => m.delete(({ timeout: 5000})));
    
    if(args[1] == "jailrol") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`jailRol.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**Jail rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`jailRol.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Jail rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let jailRol = await data.fetch(`jailRol.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Jail rolü** ${`${jailRol} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    
    if(args[1] == "cmutedrol") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`chatMutedRol.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**Chat muted rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`chatMutedRol.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Chat muted rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let chatMutedRol = await data.fetch(`chatMutedRol.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Chat muted rolü** ${`${chatMutedRol} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    
    if(args[1] == "yasaklıtag") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`yasaklıTag.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**Yasaklı tag rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`yasaklıTag.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Yasaklı tag rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let yasaklıTag = await data.fetch(`yasaklıTag.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Yasaklı tag rolü** ${`${yasaklıTag} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    }
  
  
  // kayıt logları
  
  if(args[0] == "kayıtlogları") { 

  if(!args[1]) return message.channel.send(furkyEmbed.setDescription(`Lütfen log ismi gir!`)).then(m => m.delete(({ timeout: 5000})));
    
    if(args[1] == "kayıtlog") {
        
      if(args[2] == "kanalkur") {
        let mentionChannel = message.mentions.channels.first();
        if(!mentionChannel) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir kanal etiketle!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`kayıtLog.${message.guild.id}`, mentionChannel.id);
        message.channel.send(furkyEmbed.setDescription(`**Kayıt - Log kanalı** başarıyla ${mentionChannel} \`(${mentionChannel.id} - ${mentionChannel.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalsıfırla") {
        await data.delete(`kayıtLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Kayıt - Log kanalı** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalbak") {
        let kayıtLog = await data.fetch(`kayıtLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Kayıt - Log kanalı** ${`${kayıtLog} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    
    if(args[1] == "kayıtkanal") {
        
      if(args[2] == "kanalkur") {
        let mentionChannel = message.mentions.channels.first();
        if(!mentionChannel) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir kanal etiketle!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`kayıtKanal.${message.guild.id}`, mentionChannel.id);
        message.channel.send(furkyEmbed.setDescription(`**Kayıt kanalı** başarıyla ${mentionChannel} \`(${mentionChannel.id} - ${mentionChannel.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalsıfırla") {
        await data.delete(`kayıtKanal.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Kayıt kanalı** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalbak") {
        let kayıtKanal = await data.fetch(`kayıtKanal.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Kayıt kanalı** ${`${kayıtKanal} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    
    if(args[1] == "chat") {
        
      if(args[2] == "kanalkur") {
        let mentionChannel = message.mentions.channels.first();
        if(!mentionChannel) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir kanal etiketle!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`chatKanal.${message.guild.id}`, mentionChannel.id);
        message.channel.send(furkyEmbed.setDescription(`**Chat kanalı** başarıyla ${mentionChannel} \`(${mentionChannel.id} - ${mentionChannel.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalsıfırla") {
        await data.delete(`chatKanal.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Chat kanalı** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalbak") {
        let chatKanal = await data.fetch(`chatKanal.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Chat kanalı** ${`${chatKanal} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    }

  
  ///////////// Kayıt Rolleri
  
  if(args[0] == "kayıtrolleri") { 

  if(!args[1]) return message.channel.send(furkyEmbed.setDescription(`Lütfen rol ismi gir!`)).then(m => m.delete(({ timeout: 5000})));
    
    if(args[1] == "kayıtsızrol-1") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`kayıtsızRol1.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**1. Kayıtsız rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`kayıtsızRol1.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**1. Kayıtsız rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let kayıtsızRol1 = await data.fetch(`kayıtsızRol1.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**1. Kayıtsız rolü** ${`${kayıtsızRol1} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    
    if(args[1] == "kayıtsızrol-2") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`kayıtsızRol2.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**2. Kayıtsız rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`kayıtsızRol2.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**2. Kayıtsız rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let kayıtsızRol2 = await data.fetch(`kayıtsızRol2.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**2. Kayıtsız rolü** ${`${kayıtsızRol2} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    
    if(args[1] == "viprol") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`vipRol.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**VIP rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`vipRol.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**VIP rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let vipRol = await data.fetch(`vipRol.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**VIP rolü** ${`${vipRol} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    
    if(args[1] == "kayıtyetkili") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`kayıtYetkili.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**Kayıt yetkilisi rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`kayıtYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Kayıt yetkilisi rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let kayıtYetkili = await data.fetch(`kayıtYetkili.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Kayıt yetkilisi rolü** ${`${kayıtYetkili} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    }

  
  // cinsiyet 
  
  if(args[0] == "cinsiyet") { 

  if(!args[1]) return message.channel.send(furkyEmbed.setDescription(`Lütfen rol ismi gir!`)).then(m => m.delete(({ timeout: 5000})));
    
  if(args[1] == "erkek-1") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`erkekRol1.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**1. Erkek rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`erkekRol1.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**1. Erkek rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let erkekRol1 = await data.fetch(`erkekRol1.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**1. Erkek rolü** ${`${erkekRol1} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    
    if(args[1] == "erkek-2") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`erkekRol2.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**2. Erkek rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`erkekRol2.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**2. Erkek rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let erkekRol2 = await data.fetch(`erkekRol2.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**2. Erkek rolü** ${`${erkekRol2} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
      
    if(args[1] == "erkek-3") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`erkekRol3.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**3. Erkek rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      if(args[2] == "rolsıfırla") {
        await data.delete(`erkekRol3.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**3. Erkek rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let erkekRol3 = await data.fetch(`erkekRol3.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**3. Erkek rolü** ${`${erkekRol3} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    
    if(args[1] == "kadın-1") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`kadınRol1.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**1. Kadın rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`kadınRol1.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**1. Kadın rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let kadınRol1 = await data.fetch(`kadınRol1.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**1. Kadın rolü** ${`${kadınRol1} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    
    if(args[1] == "kadın-2") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`kadınRol2.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**2. Kadın rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`kadınRol2.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**2. Kadın rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let kadınRol2 = await data.fetch(`kadınRol2.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**2. Kadın rolü** ${`${kadınRol2} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
      
    if(args[1] == "kadın-3") {
        
      if(args[2] == "rolkur") {
        
        let role = message.mentions.roles.first() || message.guild.members.cache.get(args[0]);
        if(!role) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir rol etiketle veya bir rol ID'si gir!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`kadınRol3.${message.guild.id}`, role.id);
        message.channel.send(furkyEmbed.setDescription(`**3. Kadın rolü** başarıyla ${role} \`(${role.id} - ${role.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolsıfırla") {
        await data.delete(`kadınRol3.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**3. Kadın rolü** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "rolbak") {
        let kadınRol3 = await data.fetch(`kadınRol3.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**3. Kadın rolü** ${`${kadınRol3} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
     }
    }
  
 
  
  /////////// DİĞER LOGLAR
  
  if(args[0] == "diğerloglar") { 

  if(!args[1]) return message.channel.send(furkyEmbed.setDescription(`Lütfen log ismi gir!`)).then(m => m.delete(({ timeout: 5000})));
    
    if(args[1] == "basitseslog") {
        
      if(args[2] == "kanalkur") {
        let mentionChannel = message.mentions.channels.first();
        if(!mentionChannel) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir kanal etiketle!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`basitSesLog.${message.guild.id}`, mentionChannel.id);
        message.channel.send(furkyEmbed.setDescription(`**Basit Ses - Log kanalı** başarıyla ${mentionChannel} \`(${mentionChannel.id} - ${mentionChannel.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalsıfırla") {
        await data.delete(`basitSesLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Basit Ses - Log kanalı** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalbak") {
        let basitSesLog = await data.fetch(`basitSesLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Basit Ses - Log kanalı** ${`${basitSesLog} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
    }
      
    if(args[1] == "gelişmişseslog") {
        
      if(args[2] == "kanalkur") {
        let mentionChannel = message.mentions.channels.first();
        if(!mentionChannel) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir kanal etiketle!`)).then(m => m.delete(({ timeout: 5000})));
    
        await data.set(`gelismisSesLog.${message.guild.id}`, mentionChannel.id);
        message.channel.send(furkyEmbed.setDescription(`**Gelişmiş Ses - Log kanalı** başarıyla ${mentionChannel} \`(${mentionChannel.id} - ${mentionChannel.name})\` olarak ayarlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalsıfırla") {
        await data.delete(`gelismisSesLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Gelişmiş Ses - Log kanalı** sıfırlandı!`)).then(m => m.delete(({ timeout: 10000})));  
      }
      
      if(args[2] == "kanalbak") {
        let gelismisSesLog = await data.fetch(`gelismisSesLog.${message.guild.id}`);
        message.channel.send(furkyEmbed.setDescription(`**Gelişmiş Ses - Log kanalı** ${`${gelismisSesLog} olarak gözüküyor!` || "ayarlanmamış"}!`)).then(m => m.delete(({ timeout: 10000})));  
      }
    }
  }
  
  
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'kurulum'
};
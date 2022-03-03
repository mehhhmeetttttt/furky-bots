const Discord = require('discord.js');
require("discord-reply");
const client = new Discord.Client();
const inviteClient = global.client;
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require("quick.db");
const qdb = require("quick.db");
const kdb = new qdb.table("kullanici");
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const ms = require('ms');
const { MessageEmbed } = require("discord.js");
const config = require("./config.json");
const uptime = require("node-fetch");
const data = require("quick.db");
// const { MessageMenu, MessageMenuOption } = require('discord-buttons');
const { GiveawaysManager } = require("discord-giveaways");
const { MessageButton, MessageActionRow } = require('discord-buttons')
require("discord-buttons")(client); 

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

const invites = {};
const wait = require("util").promisify(setTimeout);
client.setMaxListeners(50);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./COMMANDS/ADMINISTRATOR/', (err, files) => {
    if (err) console.error(err);
    log(`───────────────\n[ADMINISTRATOR] Total ${files.length} administrator command!`);
    files.forEach(f => {
        let props = require(`./COMMANDS/ADMINISTRATOR/${f}`);
        log(`[ADMINISTRATOR] ${props.help.name} downloaded!`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./COMMANDS/ADMINISTRATOR/${command}`)];
            let cmd = require(`./COMMANDS/ADMINISTRATOR/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

fs.readdir('./COMMANDS/FURKY/', (err, files) => {
    if (err) console.error(err);
    log(`───────────────\n[FURKY] Total ${files.length} furky command!`);
    files.forEach(f => {
        let props = require(`./COMMANDS/FURKY/${f}`);
        log(`[FURKY] ${props.help.name} downloaded!`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./COMMANDS/FURKY/${command}`)];
            let cmd = require(`./COMMANDS/FURKY/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

fs.readdir('./COMMANDS/PENAL-COMMANDS/', (err, files) => {
    if (err) console.error(err);
    log(`───────────────\n[PENAL] Total ${files.length} penal command!`);
    files.forEach(f => {
        let props = require(`./COMMANDS/PENAL-COMMANDS/${f}`);
        log(`[PENAL] ${props.help.name} donwloaded!`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./COMMANDS/PENAL-COMMANDS/${command}`)];
            let cmd = require(`./COMMANDS/PENAL-COMMANDS/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

fs.readdir('./COMMANDS/REGISTER/', (err, files) => {
    if (err) console.error(err);
    log(`───────────────\n[REGISTER] Total ${files.length} register command!`);
    files.forEach(f => {
        let props = require(`./COMMANDS/REGISTER/${f}`);
        log(`[REGISTER] ${props.help.name} downloaded!`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./COMMANDS/REGISTER/${command}`)];
            let cmd = require(`./COMMANDS/REGISTER/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

fs.readdir('./COMMANDS/STAFF/', (err, files) => {
    if (err) console.error(err);
    log(`───────────────\n[STAFF] Total ${files.length} staff command!`);
    files.forEach(f => {
        let props = require(`./COMMANDS/STAFF/${f}`);
        log(`[STAFF] ${props.help.name} downloaded!`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./COMMANDS/STAFF/${command}`)];
            let cmd = require(`./COMMANDS/STAFF/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

fs.readdir('./COMMANDS/USERS/', (err, files) => {
    if (err) console.error(err);
    log(`───────────────\n[USER] Total ${files.length} user command!`);
    files.forEach(f => {
        let props = require(`./COMMANDS/USERS/${f}`);
        log(`[USER] ${props.help.name} downloaded!`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./COMMANDS/USERS/${command}`)];
            let cmd = require(`./COMMANDS/USERS/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }

    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});
client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token).catch(() => console.log("[BOT] Bot can't activated!"));


client.on("message", async(message) => {
  if(message.content.toLowerCase() == ".tag" || message.content.toLowerCase() == "!tag" || message.content.toLowerCase() == "-tag" || message.content.toLowerCase() == "tag" || message.content.toLowerCase() == "?tag") {
    message.lineReply(`**${config.Tag.tag1}, ${config.Tag.tag2}, ${config.Tag.tag3}, ${config.Tag.tag4}, ${config.Tag.tag5}, ${config.Tag.tag6}, ${config.Tag.tag7}, ${config.Tag.tag8}, ${config.Tag.tag9}, #${config.Tag.discrim}**`);
  }
});

client.on("message" , async(message) => {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  
  moment.locale("tr");
  
  if(!message.guild) return;
  if (message.content.includes(`afk`)) return;
  let etiketlenenKullanici = message.mentions.users.first();
  let afkKullanici = await db.fetch(`afkKullanici_${message.author.id}_${message.guild.id}`);
  let afkNick = await db.fetch(`afkKullaniciAdi_${message.author.id}_${message.guild.id}`);
  let afkSure = await db.fetch(`afkSuresi_${message.guild.id}`);
  
  if(etiketlenenKullanici) {
    
  let afkReason = await db.fetch(`afkUserReason_${etiketlenenKullanici.id}_${message.guild.id}`);
  let uye2 = await db.fetch(`afkKullanici_${etiketlenenKullanici.id}_${message.guild.id}`);
    
  if(message.content.includes(uye2)) {

    await message.channel.send(furkyEmbed.setDescription(`Etiketlediğiniz ${etiketlenenKullanici} kullanıcısı **\`${afkReason}\`** sebebiyle \`${afkSure}\` tarihinde AFK olmuş!`)).then(m => m.delete(({ timeout: 20000 })));
  
  }}

  if(message.author.id === afkKullanici) {
    
    let afkReason = await db.fetch(`afkUserReason_${message.author.id}_${message.guild.id}`);

    db.delete(`afkUserReason_${message.author.id}_${message.guild.id}`);
    db.delete(`afkKullanici_${message.author.id}_${message.guild.id}`);
    db.delete(`afkKullaniciAdi_${message.author.id}_${message.guild.id}`);
    db.delete(`afkSuresi_${message.guild.id}`);
    message.member.setNickname(afkNick).catch(x => message.channel.send(furkyEmbed.setDescription(`${message.author}, başarıyla AFK modundan çıkış yaptın ancak adını düzeltemedim!`)))
    message.channel.send(furkyEmbed.setDescription(`${message.author}, başarıyla AFK modundan çıkış yaptın! **\`${afkReason}\`** sebebinden dolayı \`${afkSure}\` tarihinde AFK moduna giriş yapmışsın!`)).then(m => m.delete(({ timeout: 20000 })));
  }  
});



client.on("messageDelete", async(message) => {
  
  if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
  
  let snipe = {
    mesaj: message.content,
    mesajyazan: message.author.id,
    ytarihi: message.createdTimestamp,
    starihi: Date.now(), 
    kanal: message.channel.id
  };

  await db.set(`snipe.${message.guild.id}`, snipe);
  
}); 


client.on("ready", async () => {
  
  setInterval(() => {
    const oynuyor = config.BotSettings.botActivitys;
    const index = Math.floor(Math.random() * (oynuyor.length));
    client.user.setActivity(`${oynuyor[index]}`, { type: "WATCHING" });
  }, 10000);
  
  let botVoiceChannel = client.channels.cache.get(config.BotSettings.botVoiceChannel);
  if (botVoiceChannel) await botVoiceChannel.join().catch(err => console.error("[VC] Bot sesli kanala giriş yapamadı!"));
  
    console.log(`
───────────────
[BOT] Bot başarıyla aktifleştirildi!
Bot Adı / ID: ${client.user.username} / ${client.user.id}

[VC] Sesli kanala bağlanıldı!
Sesli Kanal Adı / ID: ${botVoiceChannel.name} / ${botVoiceChannel.id}`);
});


client.on("userUpdate", async function(oldUser, newUser, message) {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const tag = config.Tag.tag1;
  const tagSunucu1 = config.Tag.guildID;
  let tagSunucu = client.guilds.cache.get(tagSunucu1);

  const tagRol1 = config.Tag.tagRol;
  const kayıtsızRol1 = await data.fetch(`kayıtsızRol1.${tagSunucu.id}`);
  const log = client.channels.cache.get(config.Tag.tagLog);

  let tagRol = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === tagRol1);
  let kayıtsız1 = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === kayıtsızRol1);
  let nick = newUser.displayName;
  let furkyMember = tagSunucu.members.cache.get(newUser.id);
  
  if (newUser.username !== oldUser.username) {
    if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          
      await furkyMember.roles.set([kayıtsızRol1]);
      await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.crossEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı çıkarttı. ${config.Tag.tag1}`);
      log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag1})** kullanıcı adından çıkarttı! Kullanıcının bütün rolleri alınıp kayıtsıza gönderildi!`))
    } else 
      if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            
        await furkyMember.roles.add(tagRol);
        await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.okeyEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı aldı. ${config.Tag.tag1}`);
        log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag1})** kullanıcı adına koyarak ailemize katıldı!`));
    }
  }
});

client.on("userUpdate", async function(oldUser, newUser, message) {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const tag = config.Tag.tag2;
  const tagSunucu1 = config.Tag.guildID;
  let tagSunucu = client.guilds.cache.get(tagSunucu1);

  const tagRol1 = config.Tag.tagRol;
  const kayıtsızRol1 = await data.fetch(`kayıtsızRol1.${tagSunucu.id}`);
  const log = client.channels.cache.get(config.Tag.tagLog);

  let tagRol = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === tagRol1);
  let kayıtsız1 = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === kayıtsızRol1);
  let nick = newUser.displayName;
  let furkyMember = tagSunucu.members.cache.get(newUser.id);
  
  if (newUser.username !== oldUser.username) {
    if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          
      await furkyMember.roles.set([kayıtsızRol1]);
      await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.crossEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı çıkarttı. ${config.Tag.tag2}`);
      log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag2})** kullanıcı adından çıkarttı! Kullanıcının bütün rolleri alınıp kayıtsıza gönderildi!`))
    } else 
      if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            
        await furkyMember.roles.add(tagRol);
        await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.okeyEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı aldı. ${config.Tag.tag2}`);
        log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag2})** kullanıcı adına koyarak ailemize katıldı!`));
    }
  }
});

client.on("userUpdate", async function(oldUser, newUser, message) {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const tag = config.Tag.tag3;
  const tagSunucu1 = config.Tag.guildID;
  let tagSunucu = client.guilds.cache.get(tagSunucu1);

  const tagRol1 = config.Tag.tagRol;
  const kayıtsızRol1 = await data.fetch(`kayıtsızRol1.${tagSunucu.id}`);
  const log = client.channels.cache.get(config.Tag.tagLog);

  let tagRol = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === tagRol1);
  let kayıtsız1 = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === kayıtsızRol1);
  let nick = newUser.displayName;
  let furkyMember = tagSunucu.members.cache.get(newUser.id);
  
  if (newUser.username !== oldUser.username) {
    if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          
      await furkyMember.roles.set([kayıtsızRol1]);
      await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.crossEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı çıkarttı. ${config.Tag.tag3}`);
      await log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag3})** kullanıcı adından çıkarttı! Kullanıcının bütün rolleri alınıp kayıtsıza gönderildi!`))
    
    } else 
      if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            
        await furkyMember.roles.add(tagRol);
        await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.okeyEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı aldı. ${config.Tag.tag3}`); 
        log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag3})** kullanıcı adına koyarak ailemize katıldı!`));
    }
  }
});

client.on("userUpdate", async function(oldUser, newUser, message) {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const tag = config.Tag.tag4;
  const tagSunucu1 = config.Tag.guildID;
  let tagSunucu = client.guilds.cache.get(tagSunucu1);

  const tagRol1 = config.Tag.tagRol;
  const kayıtsızRol1 = await data.fetch(`kayıtsızRol1.${tagSunucu.id}`);
  const log = client.channels.cache.get(config.Tag.tagLog);

  let tagRol = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === tagRol1);
  let kayıtsız1 = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === kayıtsızRol1);
  let nick = newUser.displayName;
  let furkyMember = tagSunucu.members.cache.get(newUser.id);
  
  if (newUser.username !== oldUser.username) {
    if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          
      await furkyMember.roles.set([kayıtsızRol1]);
      await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.crossEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı çıkarttı. ${config.Tag.tag4}`);
      log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag4})** kullanıcı adından çıkarttı! Kullanıcının bütün rolleri alınıp kayıtsıza gönderildi!`))
    } else 
      if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            
        await furkyMember.roles.add(tagRol);
        await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.okeyEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı aldı. ${config.Tag.tag4}`);
        log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag4})** kullanıcı adına koyarak ailemize katıldı!`));
    }
  }
});

client.on("userUpdate", async function(oldUser, newUser, message) {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const tag = config.Tag.tag5;
  const tagSunucu1 = config.Tag.guildID;
  let tagSunucu = client.guilds.cache.get(tagSunucu1);

  const tagRol1 = config.Tag.tagRol;
  const kayıtsızRol1 = await data.fetch(`kayıtsızRol1.${tagSunucu.id}`);
  const log = client.channels.cache.get(config.Tag.tagLog);

  let tagRol = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === tagRol1);
  let kayıtsız1 = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === kayıtsızRol1);
  let nick = newUser.displayName;
  let furkyMember = tagSunucu.members.cache.get(newUser.id);
  
  if (newUser.username !== oldUser.username) {
    if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          
      await furkyMember.roles.set([kayıtsızRol1]);
      await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.crossEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı çıkarttı. ${config.Tag.tag5}`);
      log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag5})** kullanıcı adından çıkarttı! Kullanıcının bütün rolleri alınıp kayıtsıza gönderildi!`))
    } else 
      if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            
        await furkyMember.roles.add(tagRol);
        await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.okeyEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı aldı. ${config.Tag.tag5}`);
        log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag5})** kullanıcı adına koyarak ailemize katıldı!`));
    }
  }
});

client.on("userUpdate", async function(oldUser, newUser, message) {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const tag = config.Tag.tag6;
  const tagSunucu1 = config.Tag.guildID;
  let tagSunucu = client.guilds.cache.get(tagSunucu1);

  const tagRol1 = config.Tag.tagRol;
  const kayıtsızRol1 = await data.fetch(`kayıtsızRol1.${tagSunucu.id}`);
  const log = client.channels.cache.get(config.Tag.tagLog);

  let tagRol = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === tagRol1);
  let kayıtsız1 = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === kayıtsızRol1);
  let nick = newUser.displayName;
  let furkyMember = tagSunucu.members.cache.get(newUser.id);
  
  if (newUser.username !== oldUser.username) {
    if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          
      await furkyMember.roles.set([kayıtsızRol1]);
      await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.crossEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı çıkarttı. ${config.Tag.tag6}`);
      log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag6})** kullanıcı adından çıkarttı! Kullanıcının bütün rolleri alınıp kayıtsıza gönderildi!`))
    } else 
      if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            
        await furkyMember.roles.add(tagRol);
        await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.okeyEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı aldı. ${config.Tag.tag6}`);
        log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag6})** kullanıcı adına koyarak ailemize katıldı!`));
    }
  }
});

client.on("userUpdate", async function(oldUser, newUser, message) {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const tag = config.Tag.tag7;
  const tagSunucu1 = config.Tag.guildID;
  let tagSunucu = client.guilds.cache.get(tagSunucu1);

  const tagRol1 = config.Tag.tagRol;
  const kayıtsızRol1 = await data.fetch(`kayıtsızRol1.${tagSunucu.id}`);
  const log = client.channels.cache.get(config.Tag.tagLog);

  let tagRol = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === tagRol1);
  let kayıtsız1 = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === kayıtsızRol1);
  let nick = newUser.displayName;
  let furkyMember = tagSunucu.members.cache.get(newUser.id);
  
  if (newUser.username !== oldUser.username) {
    if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          
      await furkyMember.roles.set([kayıtsızRol1]);
      await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.crossEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı çıkarttı. ${config.Tag.tag7}`);
      log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag7})** kullanıcı adından çıkarttı! Kullanıcının bütün rolleri alınıp kayıtsıza gönderildi!`))
    } else 
      if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            
        await furkyMember.roles.add(tagRol);
        await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.okeyEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı aldı. ${config.Tag.tag7}`);
        log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag7})** kullanıcı adına koyarak ailemize katıldı!`));
    }
  }
});

client.on("userUpdate", async function(oldUser, newUser, message) {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const tag = config.Tag.tag8;
  const tagSunucu1 = config.Tag.guildID;
  let tagSunucu = client.guilds.cache.get(tagSunucu1);

  const tagRol1 = config.Tag.tagRol;
  const kayıtsızRol1 = await data.fetch(`kayıtsızRol1.${tagSunucu.id}`);
  const log = client.channels.cache.get(config.Tag.tagLog);

  let tagRol = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === tagRol1);
  let kayıtsız1 = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === kayıtsızRol1);
  let nick = newUser.displayName;
  let furkyMember = tagSunucu.members.cache.get(newUser.id);
  
  if (newUser.username !== oldUser.username) {
    if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          
      await furkyMember.roles.set([kayıtsızRol1]);
      await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.crossEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı çıkarttı. ${config.Tag.tag8}`);
      log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag8})** kullanıcı adından çıkarttı! Kullanıcının bütün rolleri alınıp kayıtsıza gönderildi!`))
    } else 
      if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            
        await furkyMember.roles.add(tagRol);
        await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.okeyEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı aldı. ${config.Tag.tag8}`);
        log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag8})** kullanıcı adına koyarak ailemize katıldı!`));
    }
  }
});

client.on("userUpdate", async function(oldUser, newUser, message) {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const tag = config.Tag.tag9;
  const tagSunucu1 = config.Tag.guildID;
  let tagSunucu = client.guilds.cache.get(tagSunucu1);

  const tagRol1 = config.Tag.tagRol;
  const kayıtsızRol1 = await data.fetch(`kayıtsızRol1.${tagSunucu.id}`);
  const log = client.channels.cache.get(config.Tag.tagLog);

  let tagRol = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === tagRol1);
  let kayıtsız1 = tagSunucu.roles.cache.find(roleInfo => roleInfo.id === kayıtsızRol1);
  let nick = newUser.displayName;
  let furkyMember = tagSunucu.members.cache.get(newUser.id);
  
  if (newUser.username !== oldUser.username) {
    if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
          
      await furkyMember.roles.set([kayıtsızRol1]);
      await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.crossEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı çıkarttı. ${config.Tag.tag9}`);
      log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag9})** kullanıcı adından çıkarttı! Kullanıcının bütün rolleri alınıp kayıtsıza gönderildi!`))
    } else 
      if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            
        await furkyMember.roles.add(tagRol);
        await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.okeyEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde tagımızı aldı. ${config.Tag.tag9}`);   
        log.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${newUser} kullanıcısı tagımızı **(${config.Tag.tag9})** kullanıcı adına koyarak ailemize katıldı!`));
    }
  }
});

client.on("userUpdate", async(eski , yeni) => {
  let furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  
  const guild2 = config.Tag.guildID;
  const guild = client.guilds.cache.get(guild2);
  const kayıtsızRol1 = await data.fetch(`kayıtsızRol1.${guild.id}`);
  const log = client.channels.cache.get(config.Tag.tagLog);
  const tagRole = config.Tag.tagRol;
  let kayıtsız1 = guild.roles.cache.find(roleInfo => roleInfo.id === kayıtsızRol1)
  let furkyMember = guild.members.cache.get(eski.id)
  let etiket = config.Tag.discrim;

  if(eski.discriminator.includes(etiket) && !yeni.discriminator.includes(etiket)) {
    
    await furkyMember.roles.set([kayıtsızRol1]);
    await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.crossEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde etiketimizi çıkarttı. ${etiket}`);
    await log.send(furkyEmbed.setDescription(`${furkyMember} kullanıcısı etiketimizi (\`${etiket}\`) adından çıkarttı! Kullanıcının bütün rolleri alınarak kayıtsıza gönderildi!`));
  
  } else {
    
    if(!eski.discriminator.includes(etiket) && yeni.discriminator.includes(etiket)) {
      await furkyMember.roles.add(tagRole);
      await db.push(`tagLog.${furkyMember.id}`, `${config.GuildSettings.Emojis.okeyEmoji} **${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}** tarihinde etiketimizi aldı. ${etiket}`);
      log.send(furkyEmbed.setDescription(`${furkyMember} kullanıcısı etiketimizi (\`${etiket}\`) adına alarak ailemize katıldı!`));
    }
    
  }
});


client.on("message", async message => {
  if(message.author.id !== ayarlar.sahip) return;
  if (message.content.toLowerCase() === ".reset" || message.content.toLowerCase() === "!reset" || message.content.toLowerCase() === "-reset") {
    await message.lineReply(`Bot yeniden başlatılıyor...`);
    await console.log(`[RESTART] Bot restarting..!`)
    await process.exit();
  }
});

client.on("guildMemberAdd", async(member) => {

  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const rol = member.guild.roles.cache.get(config.Tag.tagRol);
  const tag1 = config.Tag.tag1;
  const tag2 = config.Tag.tag2;
  const tag3 = config.Tag.tag3;
  const tag4 = config.Tag.tag4;
  const tag5 = config.Tag.tag5;
  const tag6 = config.Tag.tag6;
  const tag7 = config.Tag.tag7;
  const etiket = config.Tag.discrim;
  const tagLog = member.guild.channels.cache.get(config.Tag.tagLog);

  if(member.user.username.includes(tag1) || member.user.username.includes(tag2) || member.user.username.includes(tag3) || member.user.username.includes(tag4) || member.user.username.includes(tag5) || member.user.username.includes(tag6) || member.user.username.includes(tag7) || member.discriminator.includes(etiket)) {
    await member.roles.add(rol);
    await tagLog.send(furkyEmbed.setDescription(`${config.GuildSettings.Emojis.tagEmoji} ${member} kullanıcısı sunucumuza **taglı bir şekilde** giriş yaptı!`));
  };
  
});


const furkyDevs = [
'Gözlerindeki saklı cennete benden başkası girsin istemiyorum...',
'Mavi gözlerinle gökyüzüm oldun karanlık dünyama...',
'Parlayan gözlerin ile karanlık gecelerime girdin ay gibi...',
'Öyle bi güzelliğin var ki, seni gören şairler bile günlerce seni yazardı...',
'Gözlerinin hareketi bile yeter benim aklımı başımdan almaya...',
'Güller bile kıskanır seni gördükleri zaman kendilerini...',
'Hiç yazılmamış bir şiir gibisin sen, eşi benzeri olmayan...',
'Etkili gülüş kavramını bana sen öğrettin...',
'Seni anlatmaya yetmiyor kelimeler, anlatamıyorum o yüzden kimselere...',
'Gözlerinle baharı getirdin şu garip gönlüme...',
'Bir gülüşün ile yeniden canlanıyor solmuş her çiçeğim...',
'Sen dünyadaki şarkıların tek sahibisin, sana yazılıyor bütün şarkılar ve şiirler. Hatta adın geçiyor bütün namelerde...',
'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime? Ömrüm boyunca hazırım çekmeye senin yükünü...',  
'Hayatıma girerek hayatıma bütün önemli şeylerin önemsiz olmasını sağladın...'
];

client.on("message", async message => {
  
  const chat2 = await data.fetch(`chatKanal.${message.guild.id}`);
  const iltifatDb = await db.fetch('chatiltifat');
  
  if(!chat2) return;
  
  if(message.channel.id === chat2) {
    await db.add("chatiltifat", 1);
  };
  
  if(iltifatDb >= 100) {  
    
    const randomİltifat = Math.floor(Math.random() * ((furkyDevs).length - 1) + 1);
    message.lineReply(`${(furkyDevs)[randomİltifat]}`);
    await db.delete("chatiltifat");
    
  };
});


// Basit VSU

client.on("voiceStateUpdate", async(oldState, newState, message) => {
  
  let furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  
  let logKanal = await data.fetch(`basitSesLog.${newState.guild.id}`);
  const logKanali = client.channels.cache.get(logKanal);
  
  if(!logKanal) return;
  if(!logKanali) return;
  
  if (!oldState.channelID && newState.channelID) return logKanali.send(furkyEmbed.setDescription(`<@!${newState.guild.members.cache.get(newState.id).id}> kullanıcısı <#${newState.guild.channels.cache.get(newState.channelID).id}> kanalında **giriş yaptı!**`));
  if (oldState.channelID && !newState.channelID) return logKanali.send(furkyEmbed.setDescription(`<@!${oldState.guild.members.cache.get(oldState.id).id}> kullanıcısı <#${oldState.guild.channels.cache.get(oldState.channelID).id}> kanalından **çıkış yaptı!**`));
  if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return logKanali.send(furkyEmbed.setDescription(`<@!${newState.guild.members.cache.get(newState.id).id}> kullanıcısı <#${newState.guild.channels.cache.get(oldState.channelID).id}> kanalından <#${newState.guild.channels.cache.get(newState.channelID).id}> kanalına **geçiş yaptı**!`));
  if (oldState.channelID && oldState.selfMute && !newState.selfMute) return logKanali.send(furkyEmbed.setDescription(`<@!${newState.guild.members.cache.get(newState.id).id}> kullanıcısı <#${newState.guild.channels.cache.get(newState.channelID).id}> kanalında kendi susturmasını **kaldırdı!**`));
  if (oldState.channelID && !oldState.selfMute && newState.selfMute) return logKanali.send(furkyEmbed.setDescription(`<@!${newState.guild.members.cache.get(newState.id).id}> kullanıcısı <#${newState.guild.channels.cache.get(newState.channelID).id}> kanalında kendini **susturdu!**`));
  if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return logKanali.send(furkyEmbed.setDescription(`<@!${newState.guild.members.cache.get(newState.id).id}> kullanıcısı <#${newState.guild.channels.cache.get(newState.channelID).id}> kanalında kendi sağırlaştırmasını **kaldırdı!**`));
  if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return logKanali.send(furkyEmbed.setDescription(`<@!${newState.guild.members.cache.get(newState.id).id}> kullanıcısı <#${newState.guild.channels.cache.get(newState.channelID).id}> kanalında kendini **sağırlaştırdı!**`));
});


client.on("voiceStateUpdate", async(oldMember, newMember) => {

  if(newMember.channelID != null) {
    await db.set(`voiceTime_${oldMember.id}_${oldMember.guild.id}`, new Date());
  };

  if(newMember.channelID == null) {
    await db.delete(`voiceTime_${oldMember.id}_${oldMember.guild.id}`)
  };

  if (oldMember.channelID  != newMember.channelID) {
    await db.delete(`voiceTime_${oldMember.id}_${oldMember.guild.id}`)
    await db.set(`voiceTime_${oldMember.id}_${oldMember.guild.id}`, new Date());
  };
});


client.tarihHesapla = (date) => {
  const startedAt = Date.parse(date);
  var msecs = Math.abs(new Date() - startedAt);
  const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
  msecs -= years * 1000 * 60 * 60 * 24 * 365;
  const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
  msecs -= months * 1000 * 60 * 60 * 24 * 30;
  const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
  msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
  const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
  msecs -= days * 1000 * 60 * 60 * 24;
  const hours = Math.floor(msecs / (1000 * 60 * 60));
  msecs -= hours * 1000 * 60 * 60;
  const mins = Math.floor((msecs / (1000 * 60)));
  msecs -= mins * 1000 * 60;
  const secs = Math.floor(msecs / 1000);
  msecs -= secs * 1000;

  var string = "";
  if (years > 0) string += `${years} yıl ${months} ay`
  else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks + " Hafta" : ""}`
  else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days + " Gün" : ""}`
  else if (days > 0) string += `${days} gün ${hours > 0 ? hours + " Saat" : ""}`
  else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins + " Dakika" : ""}`
  else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs + " Saniye" : ""}`
  else if (secs > 0) string += `${secs} saniye`
  else string += `saniyeler`;

  string = string.trim();
  return `\`${string} önce\``;
};

client.on('guildMemberAdd', async member => {
  
  const yetkiliRol = await data.fetch(`kayıtYetkili.${member.guild.id}`);
  const kayıtKanal = await data.fetch(`kayıtKanal.${member.guild.id}`);
  let welcomeChannel = member.guild.channels.cache.get(kayıtKanal);
  
  if(!kayıtKanal) return;
  
  require("moment-duration-format");
  let furky = client.users.cache.get(member.id);
  
  var üyesayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
  var üs = üyesayısı.match(/([0-9])/g)
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  if(üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
        '0': config.SayıEmojileri.sıfır,
        '1': config.SayıEmojileri.bir,
        '2': config.SayıEmojileri.iki,
        '3': config.SayıEmojileri.üç,
        '4': config.SayıEmojileri.dört,                       
        '5': config.SayıEmojileri.beş,
        '6': config.SayıEmojileri.altı,
        '7': config.SayıEmojileri.yedi,
        '8': config.SayıEmojileri.sekiz,
        '9': config.SayıEmojileri.dokuz}[d];
      })
    }
  
  moment.locale("tr");
  const kuruluss = new Date().getTime() - furky.createdAt.getTime();  
  const gecen = moment.duration(kuruluss).format(`YY **[yıl,]** DD **[gün,]** HH **[saat,]** mm **[dakika,]** ss **[saniye]**`) 

  await db.set(`sunucuyaKatılım.${furky.id}`, üyesayısı);
  
  await welcomeChannel.send(`
${config.GuildSettings.Emojis.tagEmoji} **Chill**'e hoş geldin ${furky}

Hesabın **${moment(member.user.createdAt).format("DD MMMM YYYY dddd")}** tarihinde \`(${gecen} önce)\` oluşturulmuş!

Sunucu kurallarımızı okumayı unutma, sunucu içerisindeki ceza işlemleri kuralları okuduğunu varsayılarak gerçekleştirilecek!

Seninle birlikte ${üyesayısı} kişiyiz, sol tarafta bulunan kayıt odalarından birine girip <@&${yetkiliRol}> rolündeki yetkili arkadaşlara teyit vererek kayıt olabilirsin! :tada::tada::tada:`)
});


client.on('guildMemberAdd', async member => {
  
  const kayıtsızRol = await data.fetch(`kayıtsızRol1.${member.guild.id}`);
  if(!kayıtsızRol) return;
  
  try {
    await member.roles.add(kayıtsızRol);
  }
  
  catch (err) {
    console.log(err)
  }
  
});


client.on('guildMemberAdd', async(member) => {

  const guild = member.guild;
  const kayıtKanal = await data.fetch(`kayıtKanal.${guild.id}`);
  let welcomeChannel = guild.channels.cache.get(kayıtKanal);
  
  if (member.user.bot) return;

  await db.add(`kullanıcıGirişÇıkış.${member.id}`, 1);
  
  if(db.get(`kullanıcıGirişÇıkış.${member.id}`) >= 5) {
    await member.guild.members.ban(member.id, { reason: `Gir / Çık spamı yaptığı için` });
    await welcomeChannel.send(`${member} kullanıcısı 1 dakika içerisinde **çok fazla giriş ve çıkış yaptığından dolayı** sunucudan yasaklandı!`)
  };
  
});

setInterval(() => {
  db.all().filter(data => data.ID.endsWith("kullanıcıGirişÇıkış")).forEach(data => {
    db.delete(data.ID);
  });
}, 60*1000*1);


client.on('guildMemberAdd', async(member) => {

  const guild = member.guild;
  const açılmazBan = await db.fetch(`açılmazBan.${member.id}`);
  const kayıtKanal = await data.fetch(`kayıtKanal.${guild.id}`);
  let welcomeChannel = guild.channels.cache.get(kayıtKanal);
  
  if(açılmazBan === `True`) {
    await member.ban({ reason: "Önceden açılmaz ban ile banlanmış!" });
    await db.add(`ceza.${member.id}`, 30);
    await welcomeChannel.send(`${member.user.tag} kullanıcısı daha önceden açılmaz ban ile banlanmış, kullanıcı tekrar yasaklandı.`);
  };

});


// Yasaklı Tag

async function furkyYasaklıTag() {
  
  const guild = client.guilds.cache.get(config.GuildSettings.guildID);
  const data = await db.get(`yasaklitaglar.${guild.id}`) || []
  const yasaklıTag = await db.fetch(`yasaklıTag.${guild.id}`);
  
  if(!data) return;
  if(!yasaklıTag) return;

  guild.members.cache.filter(s => data.some(x => s.user.username.includes(x)) && !s.roles.cache.has(yasaklıTag)).forEach(m => m.roles.set([yasaklıTag]));

}

setInterval(async() => {
  furkyYasaklıTag()
}, 10000);



// komut engel şeysi

client.on("message", async(message) => {
  
  if (!message.content.startsWith(ayarlar.prefix)) return;

  if (message.content.startsWith(ayarlar.prefix)) {
    await db.add(`komutKullanımSayısıEngel.${message.author.id}`, 1);
  };
  
});

client.on("message", async(message) => {

  const komutKullanımSayısı = await db.fetch(`komutKullanımSayısıEngel.${message.author.id}`);
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  
  if(komutKullanımSayısı > 10) {
    await db.set(`karbay.karaliste_${message.author.id}`, `ekli`);
    await db.delete(`komutKullanımSayısıEngel.${message.author.id}`);
    message.channel.send(furkyEmbed
.setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }))
.setThumbnail(message.guild.iconURL({ dynamic: true }))
.setColor("BLACK")
.setDescription(`${message.author}, **1 dakika içerisinde** \`10'dan fazla\` bot ile işlem yaptığın için bot seni tehdit olarak algıladı. Komut spamı yaptığın düşünülerek bot tarafından karalisteye alınmış bulunmaktasın. Karalistede bulunduğun süre zarfında hiçbir bot komutunu kullanamayacaksın. Bu sistem, sunucumuzdaki kullanıcıların güvenliği içindir. Karalistenin kaldırılmasını istiyorsan Furky ile iletişime geçebilirsin.`));
  }
});

setInterval(() => {
  db.all().filter(data => data.ID.endsWith("komutKullanımSayısıEngel")).forEach(data => {
    db.delete(data.ID);
  });
}, 60*1000*1);


/*setInterval(() => {
  const karbay = "877466907673002025"
  db.delete(`karbay.karaliste_${karbay}`,);
  console.log("karaliste temizlendi beybi")
}, 5000);*/


client.ws.on("INTERACTION_CREATE",async function(int) {

  const customID = int.data.custom_id
  if(customID !== "renkler") return
    
  const hangisi = int.data.values[0]

  const roller = [
    { name: "purplerol",rol: "880925324542619709" },
    { name: "redrol",rol: "881112062644871178" },
    { name: "bluerol",rol: "881112069372538891" },
    { name: "yellowrol",rol: "881112070307844146" },
    { name: "orangerol",rol: "881112071041855499" },
  ]

const guild = client.guilds.cache.get(int.guild_id)

const member = guild.members.cache.get(int.member.user.id)
const type = roller.find(x => x.name === hangisi)
if(!type) return

member.roles.cache.has(type.rol) ? member.roles.remove(type.rol) : member.roles.add(type.rol)
  client.api.interactions(int.id, int.token).callback.post({data: {type: 4,data: {content: "Rolleriniz başarıyla güncellendi!",flags: "64" }}})
});

client.ws.on("INTERACTION_CREATE",async function(int) {
  const customID = int.data.custom_id
  if(customID !== "katilimci") return
    
const hangisi = int.data.values[0]

const roller = [
  {name: "etkinlik",rol: "934122781761744987"},
  {name: "cekilis",rol: "934122780574773418"},
]

const guild = client.guilds.cache.get(int.guild_id)

const member = guild.members.cache.get(int.member.user.id)
const type = roller.find(x => x.name === hangisi)
if(!type) return

member.roles.cache.has(type.rol) ? member.roles.remove(type.rol) : member.roles.add(type.rol)
  client.api.interactions(int.id, int.token).callback.post({data: {type: 4,data: {content: "Katılımcı rolleriniz başarıyla düzenlendi!",flags: "64" }}})
});

client.ws.on("INTERACTION_CREATE",async function(int) {
  const customID = int.data.custom_id
  if(customID !== "iliski") return
    
const hangisi = int.data.values[0]

const roller = [
  {name: "couple",rol: "909837403794067476"},
  {name: "alone",rol: "909837404607758336"},
]

const guild = client.guilds.cache.get(int.guild_id)

const member = guild.members.cache.get(int.member.user.id)
const type = roller.find(x => x.name === hangisi)
if(!type) return

member.roles.cache.has(type.rol) ? member.roles.remove(type.rol) : member.roles.add(type.rol)
  client.api.interactions(int.id, int.token).callback.post({data: {type: 4,data: {content: "İlişki rolleriniz başarıyla düzenlendi!",flags: "64" }}})
});

/*
.eval client.api.channels(message.channel.id).messages.post({ data: {"content":"Katılımcı Rolleri Seçim Menüsü","components":[{"type":1,"components":[

{"type":3,"custom_id":"iliski",options: [
{"label": "Etkinlik Katılımcısı","value": "etkinlik","emoji": {name: ":tada:"},"description": "Etkinlik Katılımcısı rolünü ekler / çıkartırsınız."},
{"label": "Çekiliş Katılımcısı","value": "cekilis","emoji":{name:  ":tada:"},"description": "Çekiliş Katılımcısı rolünü ekler / çıkartırsınız."}
      
]
},
]}]} })
*/

client.on("message", async(message) => {
  
  if (message.content !== ".furky" || message.author.id != ayarlar.sahip) return;
  
  await message.delete();

  let sunucuyakatilimtarih = new MessageButton().setStyle('blurple').setLabel('1').setID('sunucuyakatilimtarih');
  let gecmisisimler = new MessageButton().setStyle('blurple').setLabel('2').setID('gecmisisimler');
  let sunucuyakatilimsira = new MessageButton().setStyle('blurple').setLabel('3').setID('sunucuyakatilimsira');
  let kullanicisicili = new MessageButton().setStyle('blurple').setLabel('4').setID('kullanicisicili');
  let uzerindekiroller = new MessageButton().setStyle('blurple').setLabel('5').setID('uzerindekiroller');
  let rollog = new MessageButton().setStyle('blurple').setLabel('6').setID('rollog');
  let topteyit = new MessageButton().setStyle('blurple').setLabel('7').setID('topteyit');
  let mesajbilgi = new MessageButton().setStyle('blurple').setLabel('8').setID('mesajbilgi');
  let topmesaj = new MessageButton().setStyle('blurple').setLabel('9').setID('topmesaj');
  let tekrarkayit = new MessageButton().setStyle('green').setLabel('✅').setID('tekrarkayit');
  let serverstatics = new MessageButton().setStyle('grey').setLabel('🔔').setID('serverstatics');
  let kayitsiz = new MessageButton().setStyle('red').setLabel('❌').setID('kayitsiz');
  
  const butonlar1 = new MessageActionRow()
  .addComponents(sunucuyakatilimtarih,gecmisisimler,sunucuyakatilimsira)
  const butonlar2 = new MessageActionRow()
  .addComponents(kullanicisicili,uzerindekiroller,rollog)
  const butonlar4 = new MessageActionRow()
  .addComponents(topteyit,mesajbilgi,topmesaj)
  const butonlar3 = new MessageActionRow()
  .addComponents(tekrarkayit,serverstatics,kayitsiz)
  
  message.channel.send(`
Merhabalar **${message.guild.name}**,
Aşağıdaki butonlardan ilgili tuşlara basarak istediğiniz şeyler hakkında bilgi sahibi olabilirsiniz!

**1:** Sunucuya katılım tarihinizi öğrenin.
**2:** Geçmiş isimlerinizi öğrenin.
**3:** Sunucuya katılım sıranızı öğrenin.

**4:** Sicilinizi görüntüleyin.
**5:** Sahip olduğunuz rolleri görüntüleyin.
**6:** Rol logunuzu görüntüleyin.

**7:** Top teyit bilgilerini görüntüleyin.
**8:** Mesaj bilgilerinizi görüntüleyin.
**9:** Top mesaj bilgilerini görüntüleyin.

:white_check_mark:: Eğer eski bir kaydınız varsa otomatik olarak tekrar kayıt olun.
:bell:: Sunucu istatistiklerini görüntüleyin.
:x:: Kayıtsıza gidin ve tekrar teyit verin.`, {
    components: [butonlar1,butonlar2,butonlar4,butonlar3]});
});

client.on('clickButton', async (button) => {

  if (button.id === 'sunucuyakatilimtarih') {
    
    var date1 = button.clicker.member.joinedAt
    var date = new Date(date1)
    var dateStr = ("00" + date.getDate()).slice(-2) + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2);

    await button.reply.think(true); 
    await button.reply.edit(`Merhabalar ${button.clicker.member}, sunucuya giriş tarihiniz veritabanında \`${dateStr || `bilinmeyen!`}\` olarak gözüküyor!`) 
  };

  if (button.id === 'gecmisisimler') {
    
    const isimlerVeri = await data.fetch(`isimler.${button.clicker.member.id}`);
    let isimler = isimlerVeri ? isimlerVeri.map((value, index) => `${index + 1}. ${value.Name} | ${value.Age} (${value.Rol.name} - ${value.Tarih})`).join(`\n`) : "Geçmişe ait kayıt veriniz bulunamadı!";
    
    await button.reply.think(true); 
    await button.reply.edit(`
Merhabalar ${button.clicker.member}, geçmiş isimleriniz aşağıda verilmiştir:

\`\`\`fix
${isimler}
\`\`\`
`)
  };
  
  if (button.id === 'sunucuyakatilimsira') {
    const sunucuyaKatılım = await db.fetch(`sunucuyaKatılım.${button.clicker.member.id}`);
    
    await button.reply.think(true); 
    await button.reply.edit(`Merhabalar ${button.clicker.member}, sunucuya katılım sıranız veritabanında ${sunucuyaKatılım || "bilinmeyen"} olarak gözüküyor!`) 
  };
  
  if (button.id === 'kullanicisicili') {
    
    let sicil = await kdb.get(`kullanici.${button.clicker.id}.sicil`) || [];
    sicil = sicil.reverse();

    let sicilPanel = sicil.length > 0 ? sicil.map((value, index) => 
    `\`${index + 1}-\` İşlem türü: \`${value.Ceza}\`
    Kullanıcı **${value.Tarih}** tarihinde **${value.Sebep}** sebebiyle ${button.guild.members.cache.has(value.Yetkili) ? button.guild.members.cache.get(value.Yetkili) : value.Yetkili} kullanıcısı tarafından **${value.Süre}** boyunca cezalandırılmış!`).join("\n**───────────────**\n") : "Sunucumuzda daha önceden ceza-i işlem almamışsınız.";

    
    await button.reply.think(true); 
    await button.reply.edit(`Merhabalar ${button.clicker.member}, siciliniz aşağıda verilmiştir:
    
\`\`\`
${sicilPanel}
\`\`\`
    `)
  };
  
  if (button.id === 'uzerindekiroller') {
    await button.reply.think(true); 
    await button.reply.edit(`Merhabalar ${button.clicker.member}, toplam **${button.clicker.member.roles.cache.size}** role sahip gözüküyorsun!\n\n${button.clicker.member.roles.cache.size >= 10 ? "Çok fazla rol var..." : button.clicker.member.roles.cache.map(role => role.toString())}`)
  };
  
  if (button.id === 'rollog') {
    const rolLog = await db.get(`rolLog.${button.clicker.member.id}`) || [];
    
    await button.reply.think(true); 
    await button.reply.edit(`
Merhabalar ${button.clicker.member},

**─────────────────**
${rolLog.join('\n**─────────────────**\n') || 'Rol veriniz bulunamadı!'}
**─────────────────**`)
  };
  
  if (button.id === 'tekrarkayit') {
      await button.reply.think(true);
      await button.reply.edit(`Merhabalar ${button.clicker.member}, burası çok yakında...`)

  };
  
  if (button.id === 'serverstatics') {
    
    const boosterRol = await data.fetch(`boosterRol.${button.guild.id}`);
    const guild = config.Tag.guilID;
    const voiceChannels = button.guild.channels.cache.filter(c => c.type === 'voice');
    
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
    var üyesayısı = button.guild.members.cache.size.toString().replace(/ /g, "    ")
    
    var cevirimici = button.guild.members.cache.filter(m => m.presence.status !== "offline").size.toString().replace(/ /g, "    ")
    
    var taglılar = 0;
    let rol = config.Tag.tagRol;
    let tag1 = config.Tag.tag1;
    let tag2 = config.Tag.tag2;
    let tag3 = config.Tag.tag3;
    let tag4 = config.Tag.tag4;
    let tag5 = config.Tag.tag5;
    let tag6 = config.Tag.tag6;
    let tag7 = config.Tag.tag7;
    let tag8 = config.Tag.tag8;
    let tag9 = config.Tag.tag9;
    let etiket = config.Tag.discrim;

    button.guild.members.cache.filter(s => { 
    if(s.user.username.includes(tag1) || s.user.username.includes(tag2) || s.user.username.includes(tag3) || s.user.username.includes(tag4) || s.user.username.includes(tag5) || s.user.username.includes(tag6) || s.user.username.includes(tag7) || s.user.username.includes(tag8) || s.user.username.includes(tag9) || s.user.discriminator === etiket || s.roles.cache.has(rol)) { taglılar = taglılar+1 }})
    var taglılar = taglılar.toString().replace(/ /g, "    ")
    var üs3 = taglılar.match(/([0-9])/g)
    taglılar = taglılar.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
    
    var sessayı = count.toString().replace(/ /g, "    ")
    
    await button.reply.think(true); 
    await button.reply.edit(`
**\`>\`** Şu anda toplam **${sessayı}** \`(+${button.guild.members.cache.filter(a => a.user.bot && a.voice.channel).size} Bot)\` kişi seslide.
**\`>\`** Sunucuda **${üyesayısı}** adet üye var. \`(${cevirimici} Aktif!)\`
**\`>\`** Toplamda **${taglılar}** kişi tagımızı alarak bizi desteklemiş.
**\`>\`** Sunucuya **${button.guild.premiumSubscriptionCount}** boost basılmış! \`(${button.guild.premiumTier}. seviye!)\``) 
  };
  
  if (button.id === 'kayitsiz') {
    
    const guild = button.clicker.member.guild;
    const kayıtsızRol = await data.fetch(`kayıtsızRol1.${guild.id}`);
    
    await button.reply.think(true);
    await button.reply.edit(`Merhabalar ${button.clicker.member}, burası çok yakında...`)

  };
  
  if (button.id === 'topteyit') {

    await button.reply.think(true);
    await button.reply.edit(`Merhabalar ${button.clicker.member}, burası çok yakında...`)

  };
  
  if (button.id === 'mesajbilgi') {

    await button.reply.think(true);
    await button.reply.edit(`Merhabalar ${button.clicker.member}, burası çok yakında...`)

  };
  
  if (button.id === 'topmesaj') {

    await button.reply.think(true);
    await button.reply.edit(`Merhabalar ${button.clicker.member}, burası çok yakında...`)

  };

});

// .addComponents(topteyit,mesajbilgi,topmesaj)


/*

client.on("message", async(message) => {
  
  if (message.content !== ".furky" || message.author.id != ayarlar.sahip) return;
  
  await message.delete();

  let sunucuyakatilimtarih = new MessageButton().setStyle('blurple').setLabel('1').setID('sunucuyakatilimtarih');
  let gecmisisimler = new MessageButton().setStyle('blurple').setLabel('2').setID('gecmisisimler');
  let sunucuyakatilimsira = new MessageButton().setStyle('blurple').setLabel('3').setID('sunucuyakatilimsira');
  let kullanicisicili = new MessageButton().setStyle('blurple').setLabel('4').setID('kullanicisicili');
  let uzerindekiroller = new MessageButton().setStyle('blurple').setLabel('5').setID('uzerindekiroller');
  let rollog = new MessageButton().setStyle('blurple').setLabel('6').setID('rollog');
  let tekrarkayit = new MessageButton().setStyle('green').setLabel('✅').setID('tekrarkayit');
  let serverstatics = new MessageButton().setStyle('grey').setLabel('🔔').setID('serverstatics');
  let kayitsiz = new MessageButton().setStyle('red').setLabel('❌').setID('kayitsiz');
  
  const butonlar1 = new MessageActionRow()
  .addComponents(sunucuyakatilimtarih,gecmisisimler,sunucuyakatilimsira)
  const butonlar2 = new MessageActionRow()
  .addComponents(kullanicisicili,uzerindekiroller,rollog)
  const butonlar3 = new MessageActionRow()
  .addComponents(tekrarkayit,serverstatics,kayitsiz)
  
  message.channel.send(`
Merhabalar **${message.guild.name}**,
Aşağıdaki butonlardan ilgili tuşlara basarak istediğiniz şeyler hakkında bilgi sahibi olabilirsiniz!

**1:** Sunucuya katılım tarihinizi öğrenin.
**2:** Geçmiş isimlerinizi öğrenin.
**3:** Sunucuya katılım sıranızı öğrenin.

**4:** Sicilinizi görüntüleyin.
**5:** Sahip olduğunuz rolleri görüntüleyin.
**6:** Rol logunuzu görüntüleyin.

:white_check_mark:: Eğer eski bir kaydınız varsa otomatik olarak tekrar kayıt olun.
:bell:: Sunucu istatistiklerini görüntüleyin.
:x:: Kayıtsıza gidin ve tekrar teyit verin.`, {
    components: [butonlar1,butonlar2,butonlar3]});
});

client.on('clickButton', async (button) => {

  if (button.id === 'sunucuyakatilimtarih') {
    
    var date1 = button.clicker.member.joinedAt
    var date = new Date(date1)
    var dateStr = ("00" + date.getDate()).slice(-2) + "/" + ("00" + (date.getMonth() + 1)).slice(-2) + "/" + date.getFullYear() + " " + ("00" + date.getHours()).slice(-2) + ":" + ("00" + date.getMinutes()).slice(-2) + ":" + ("00" + date.getSeconds()).slice(-2);

    await button.reply.think(true); 
    await button.reply.edit(`Merhabalar ${button.clicker.member}, sunucuya giriş tarihiniz veritabanında \`${dateStr || `bilinmeyen!`}\` olarak gözüküyor!`) 
  };

  if (button.id === 'gecmisisimler') {
    
    const isimlerVeri = await data.fetch(`isimler.${button.clicker.member.id}`);
    let isimler = isimlerVeri ? isimlerVeri.map((value, index) => `${index + 1}. ${value.Name} | ${value.Age} (${value.Rol.name} - ${value.Tarih})`).join(`\n`) : "Geçmişe ait kayıt veriniz bulunamadı!";
    
    await button.reply.think(true); 
    await button.reply.edit(`
Merhabalar ${button.clicker.member}, geçmiş isimleriniz aşağıda verilmiştir:

\`\`\`fix
${isimler}
\`\`\`
`)
  };
  
  if (button.id === 'sunucuyakatilimsira') {
    const sunucuyaKatılım = await db.fetch(`sunucuyaKatılım.${button.clicker.member.id}`);
    
    await button.reply.think(true); 
    await button.reply.edit(`Merhabalar ${button.clicker.member}, sunucuya katılım sıranız veritabanında \`${sunucuyaKatılım || "bilinmeyen"}\` olarak gözüküyor!`) 
  };
  
  if (button.id === 'kullanicisicili') {
    
    let sicil = await kdb.get(`kullanici.${button.clicker.id}.sicil`) || [];
    sicil = sicil.reverse();

    let sicilPanel = sicil.length > 0 ? sicil.map((value, index) => 
    `\`${index + 1}-\` İşlem türü: \`${value.Ceza}\`
    Kullanıcı **${value.Tarih}** tarihinde **${value.Sebep}** sebebiyle ${button.guild.members.cache.has(value.Yetkili) ? button.guild.members.cache.get(value.Yetkili) : value.Yetkili} kullanıcısı tarafından **${value.Süre}** boyunca cezalandırılmış!`).join("\n**───────────────**\n") : "Sunucumuzda daha önceden ceza-i işlem almamışsınız.";

    
    await button.reply.think(true); 
    await button.reply.edit(`Merhabalar ${button.clicker.member}, siciliniz aşağıda verilmiştir:
    
\`\`\`
${sicilPanel}
\`\`\`
    `)
  };
  
  if (button.id === 'uzerindekiroller') {
    await button.reply.think(true); 
    await button.reply.edit(`Merhabalar ${button.clicker.member}, toplam **${button.clicker.member.roles.cache.size}** role sahip gözüküyorsun!\n\n${button.clicker.member.roles.cache.size >= 5 ? "Çok fazla rol var..." : button.clicker.member.roles.cache.map(role => role.toString())}`)
  };
  
  if (button.id === 'rollog') {
    const rolLog = await db.get(`rolLog.${button.clicker.member.id}`) || [];
    
    await button.reply.think(true); 
    await button.reply.edit(`
Merhabalar ${button.clicker.member},

**─────────────────**
${rolLog.join('\n**─────────────────**\n') || 'Rol veriniz bulunamadı!'}
**─────────────────**`)
  };
  
  if (button.id === 'tekrarkayit') {
    
    const guild = button.clicker.member.guild;
    const kayıtTürü = await db.fetch(`kayıtTürü.${button.clicker.member.id}`);
    const kayıtİsmi = await data.fetch(`kayıtİsmi.${button.clicker.member.id}`);
    const kayıtYaşı = await data.fetch(`kayıtYaşı.${button.clicker.member.id}`);
    const erkekRol1 = await data.fetch(`erkekRol1.${guild.id}`);
    const erkekRol2 = await data.fetch(`erkekRol2.${guild.id}`);
    const erkekRol3 = await data.fetch(`erkekRol3.${guild.id}`);
    const kadınRol1 = await data.fetch(`kadınRol1.${guild.id}`);
    const kadınRol2 = await data.fetch(`kadınRol2.${guild.id}`);
    const kadınRol3 = await data.fetch(`kadınRol3.${guild.id}`);
    const kayıtsızRol = await data.fetch(`kayıtsızRol1.${guild.id}`);
    const kayıtsızRol2 = await data.fetch(`kayıtsızRol2.${guild.id}`);
    
    if(button.clicker.member.roles.cache.has(erkekRol1)) {
      await button.reply.think(true);
      await button.reply.edit(`Merhabalar ${button.clicker.membe}, sunucumuzda zaten kayıtlısınız!`)
    };
    
    if(button.clicker.member.roles.cache.has(kadınRol1)) {
      await button.reply.think(true);
      await button.reply.edit(`Merhabalar ${button.clicker.membe}, sunucumuzda zaten kayıtlısınız!`)
    };
    
    if(!kayıtTürü) {
      await button.reply.think(true);
      await button.reply.edit(`Merhabalar ${button.clicker.member}, veritabanında daha önce kayıt olmadığınız gözüküyor. Bu yüzden işleme devam edilmedi.`)
    };
    
    if(!kayıtİsmi) {
      await button.reply.think(true);
      await button.reply.edit(`Merhabalar ${button.clicker.member}, veritabanında daha önce kayıt olmadığınız gözüküyor. Bu yüzden işleme devam edilmedi.`)
    };
    
    if(!kayıtYaşı) {
      await button.reply.think(true);
      await button.reply.edit(`Merhabalar ${button.clicker.member}, veritabanında daha önce kayıt olmadığınız gözüküyor. Bu yüzden işleme devam edilmedi.`)
    };
    
    if(kayıtTürü === `Erkek`) {
      await button.reply.think(true);
      await button.reply.edit(`Merhabalar ${button.clicker.member}, veritabanında daha önceden **Erkek** olarak kayıt olduğunuz gözüküyor. Kaydınız başarıyla tamamlandı!`)
    };
    
    if(kayıtTürü === `Kadın`) {
      await button.reply.think(true);
      await button.reply.edit(`Merhabalar ${button.clicker.member}, veritabanında daha önceden **Kadın** olarak kayıt olduğunuz gözüküyor. Kaydınız başarıyla tamamlandı!`)
    };
  };
  
  if (button.id === 'serverstatics') {
    
    const boosterRol = await data.fetch(`boosterRol.${button.guild.id}`);
    const guild = config.Tag.guilID;
    const voiceChannels = button.guild.channels.cache.filter(c => c.type === 'voice');
    const rol = config.Tag.tagRol;
    const tag = config.Tag.tag;
    
    let count = 0;
    for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
    var üyesayısı = button.guild.members.cache.size.toString().replace(/ /g, "    ")
    
    var cevirimici = button.guild.members.cache.filter(m => m.presence.status !== "offline").size.toString().replace(/ /g, "    ")
    
    var taglılar = 0;
    var taglılar = taglılar.toString().replace(/ /g, "    ")
    var üs3 = taglılar.match(/([0-9])/g)
    taglılar = taglılar.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
  
    button.guild.members.cache.filter(s => { 
      if(s.user.username.includes(tag) || s.roles.cache.has(rol)) { taglılar = taglılar+1 }
    });
    
    var sessayı = count.toString().replace(/ /g, "    ")
    
    await button.reply.think(true); 
    await button.reply.edit(`
    **\`>\`** Şu anda toplam **${sessayı}** \`(+${button.guild.members.cache.filter(a => a.user.bot && a.voice.channel).size} Bot)\` kişi seslide.
**\`>\`** Sunucuda **${üyesayısı}** adet üye var. \`(${cevirimici} Aktif!)\`
**\`>\`** Toplamda **${taglılar}** kişi tagımızı alarak bizi desteklemiş.
**\`>\`** Sunucuya **${button.guild.premiumSubscriptionCount}** boost basılmış! \`(${button.guild.premiumTier}. seviye!)\``) 
  };
});

*/

/// Komutlar


client.on("message", async(message) => {
  
  if (message.content !== ".furky-komutlar" || message.author.id != ayarlar.sahip) return;
  
  await message.delete();

  let administrator = new MessageButton().setStyle('blurple').setLabel('Y').setID('administrator');
  let furky = new MessageButton().setStyle('blurple').setLabel('F').setID('furky');
  let penal = new MessageButton().setStyle('blurple').setLabel('P').setID('penal');
  let reg = new MessageButton().setStyle('blurple').setLabel('R').setID('reg');
  let staff = new MessageButton().setStyle('blurple').setLabel('S').setID('staff');
  let user = new MessageButton().setStyle('blurple').setLabel('U').setID('user');
  
  const butonlar1 = new MessageActionRow()
  .addComponents(administrator,furky,penal)
  const butonlar2 = new MessageActionRow()
  .addComponents(staff,user,reg)
  
  message.channel.send(`
Selam **${message.guild.name}** üyeleri, aşağıdaki butonlara tıklayarak bot komutları hakkında bilgi alabilirsiniz!

**Y:** Yönetici Komutları
**F:** Geliştirici Komutları
**P:** Ceza Komutları
**R:** Kayıt Komutları
**S:** Yetkili Komutları
**U:** Kullanıcı Komutları

Komutları normal mesaj halinde almak isterseniz **.yardım** kullanabilirsiniz.`, {
    components: [butonlar1,butonlar2]});
});

client.on('clickButton', async (button) => {

  if (button.id === 'administrator') {

    await button.reply.think(true); 
    await button.reply.edit(`
**Yönetici**
\`\`\`fix
.allvoicemute , .allvoiceunmute , .kanal , .rol , .rolkontrol , .say , .seslidağıt , .temizle , .yasaklıtag , .yavaşmod , .ytsay
\`\`\`
`) 
  
  };
  
  if (button.id === 'furky') {

    await button.reply.think(true); 
    await button.reply.edit(`
**Geliştirici**
\`\`\`fix
.kurulum , .emojikur , .emojiyükle , .herkeserolver , .karaliste , .açılmazban , .açılmazbankaldır , .eval , .kanalkopyala , .mesajedit , .taglıroldağıt , .menü , .buton
\`\`\`
`) 
  
  };
  
  if (button.id === 'penal') {

    await button.reply.think(true); 
    await button.reply.edit(`
**Ceza**
\`\`\`fix
.ban , .cmute , .jail , .kick , .sicil , .unban , .uncmute , .unjail , .vmute , .unvmute
\`\`\`
`) 
  
  };
  
  if (button.id === 'reg') {

    await button.reply.think(true); 
    await button.reply.edit(`
**Kayıt**
\`\`\`fix
.erkek , .isim , .isimler , .kadın , .kayıtsız , .vip
\`\`\`
`) 
  
  };
  
  if (button.id === 'staff') {

    await button.reply.think(true); 
    await button.reply.edit(`
**Yetkili**
\`\`\`fix
.git , .snipe , .çek
\`\`\`
`) 
  
  };
  
  if (button.id === 'user') {

    await button.reply.think(true); 
    await button.reply.edit(`
**User**
\`\`\`fix
.afk , .avatar , .banner , .booster , .izinligit , .izinliçek , .me , .seskontrol , .yardım
\`\`\`
`)
    
  };
});



// Reklam Engel

client.on("message", async(message) => {
    const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg", "discord.net", "discord.com"];
      if (reklam.some(word => message.content.includes(word))) {
        try {
          if (!message.member.hasPermission("ADMINISTRATOR")) {
            await message.delete();
            return message.channel.send(`${message.author} lütfen sunucu içerisinde **reklam yapma!**`).then(m => m.delete(({ timeout: 10000 })));                         
          }              
        } catch(err) {
          console.log(err);
        }
      }
});


client.on("messageUpdate", async(oldMessage, newMessage) => {
      const reklam = [".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", "net", ".rf.gd", ".az", ".party", "discord.gg", "discord.net", "discord.com"];
      if(newMessage.content == reklam) {
        if(!newMessage.member.hasPermission("ADMINISTRATOR")) {
          if(!newMessage.mentions.users.first()) {
            await newMessage.delete().catch(x => `Hata, bot mesajı silemedi! ${x}`);
            return newMessage.channel.send(`${newMessage.author} ben zeki bir botum. **Mesajını güncellesen bile sunucuda reklam yapamazsın!**`);  
          }
    }
  }
});
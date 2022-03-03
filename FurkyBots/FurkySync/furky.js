const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const backup = require('discord-backup');
const db = require("quick.db");
const ayarlar = require("./ayarlar.json");
require('./util/eventLoader.js')(client);

const log = message => {
  console.log(`${message}`);
};

client.setMaxListeners(50);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

fs.readdir('./Komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`───────────────\n[KOMUT] Toplam ${files.length} komut!`);
    files.forEach(f => {
        let props = require(`./Komutlar/${f}`);
        log(`[KOMUT] ${props.help.name} başarıyla yüklendi!`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});

client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./Komutlar/${command}`)];
            let cmd = require(`./Komutlar/${command}`);
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
  if (message.author.id === ayarlar.sahip) permlvl = 7;
  return permlvl;
};

client.login(ayarlar.token);



// Durum

client.on("ready", async () => {
  
  setInterval(() => {
    const oynuyor = ayarlar.Settings.botActivitys;
    const index = Math.floor(Math.random() * (oynuyor.length));
    client.user.setActivity(`${oynuyor[index]}`, { type: "WATCHING" });
  }, 10000);
  
  let botVoiceChannel = client.channels.cache.get(ayarlar.Settings.botVoiceChannel);
  if (botVoiceChannel) await botVoiceChannel.join().catch(err => console.error("[VC] Bot sesli kanala giriş yapamadı!"));
  
    console.log(`
───────────────
[BOT] Bot başarıyla aktifleştirildi!
Bot Adı / ID: ${client.user.username} / ${client.user.id}

[VC] Sesli kanala bağlanıldı!
Sesli Kanal Adı / ID: ${botVoiceChannel.name} / ${botVoiceChannel.id}`);
});



// Senkron Veri Alma

client.on("ready", async () => {
  
    channelBackup();
  
    setInterval(() => {
      channelBackup();
    }, 1000*60*30); // Yarım saatte bir yedek alır.
  
});


client.on("message", async message => {
  if(message.author.id !== ayarlar.sahip) return;
  if (message.content.toLowerCase() === "k!reset") {
    await message.channel.send(`Bot yeniden başlatılıyor...`);
    await console.log(`[RESTART] Bot restarting..!`)
    await process.exit();
  }
});


function channelBackup() {
  
  const guild = client.guilds.cache.get(ayarlar.Settings.guildID);
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(ayarlar.Settings.botFooter)
  
  backup.setStorageFolder(__dirname+"/backups/");
  backup.create(guild, {

    maxMessagesPerChannel: 15,
    jsonSave: true,
    jsonBeautify: true,
    doNotBackup: [ "emojis", "bans" ],
    saveImages: "base64"
    
  }).then((backupData) => {
    
    db.delete(`sonYedek.${guild}`);
    db.set(`sonYedek.${guild}`, backupData.id)
    
    client.channels.cache.get(ayarlar.Settings.logChannel).send(furkyEmbed.setDescription(`
[OTOMATİK]

Kanal yedekleri başarıyla alındı!

**Yedek kurulumu için:** \`${ayarlar.prefix}kurulum ${backupData.id}\`
**Yedek hakkında daha fazla bilgi için:** \`${ayarlar.prefix}bilgi ${backupData.id}\`
`));
    
    
  });
};
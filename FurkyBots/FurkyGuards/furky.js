const Discord = require("discord.js");
const { Client, MessageEmbed } = require("discord.js");
const db = require("quick.db");
const fs = require('fs');
const FurkyGuard1 = new Client({ ignoreDirect: true, ignoreRoles: true, ignoreEveryone: true });
const FurkyGuard2 = new Client({ ignoreDirect: true, ignoreRoles: true, ignoreEveryone: true });
const FurkyGuard3 = new Client({ ignoreDirect: true, ignoreRoles: true, ignoreEveryone: true });
const request = require("request");
const furky = require("./furky.json");
const uptime = require("node-fetch");
const moment = require("moment");
moment.locale("tr");

FurkyGuard1.setMaxListeners(50);
FurkyGuard2.setMaxListeners(50);
FurkyGuard3.setMaxListeners(50);

const furkyWhitelist = furky.güvenli;
const furkyBots = furky.bots;
const furkyGuild = furky.guardServer;
const furkyDbGuild = furky.guardServer;
const furkyLog = furky.guardLog;

FurkyGuard1.on("ready", async () => {
  FurkyGuard1.user.setPresence({ activity: { name: furky.BotSettings.botActivity }, status: furky.BotSettings.botStatus });
  FurkyGuard1.channels.cache.get(furky.BotSettings.botVoice).join().catch(err => console.error(`${FurkyGuard1.user.tag} sesli kanala giriş yapamadı!`));
  console.log(`${FurkyGuard1.user.tag} aktif!`);
});

FurkyGuard2.on("ready", async () => {
  FurkyGuard2.user.setPresence({ activity: { name: furky.BotSettings.botActivity }, status: furky.BotSettings.botStatus });
  FurkyGuard2.channels.cache.get(furky.BotSettings.botVoice).join().catch(err => console.error(`${FurkyGuard2.user.tag} sesli kanala giriş yapamadı!`));
  console.log(`${FurkyGuard2.user.tag} aktif!`);
});

FurkyGuard3.on("ready", async () => {
  FurkyGuard3.user.setPresence({ activity: { name: furky.BotSettings.botActivity }, status: furky.BotSettings.botStatus });
  FurkyGuard3.channels.cache.get(furky.BotSettings.botVoice).join().catch(err => console.error(`${FurkyGuard3.user.tag} sesli kanala giriş yapamadı!`));
  console.log(`${FurkyGuard3.user.tag} aktif!`);
});




// Guard 1



// Rol Silme

FurkyGuard1.on("roleDelete", async(furkyRole) => {
  
const guild = FurkyGuard1.guilds.cache.get(furkyGuild);
  
guild.fetchAuditLogs().then(async(furkyLogs) => {
  if(furkyLogs.entries.first().action === `ROLE_DELETE`) {
    
    const furkyMemberID = furkyLogs.entries.first().executor.id;
    if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) {
      
      const furkyMember = guild.members.cache.get(furkyMemberID);
      
const roleDeleteLog = new Discord.MessageEmbed()
.setTitle("Rol silindi!")
.setColor("#ff0000")
.setDescription(`
${furkyMember} (\`${furkyMember.user.id}\`) kullanıcısı **${furkyRole.name}** (\`${furkyRole.id}\`) rolünü sildi!

Kullanıcı sunucudan yasaklandı!`)
      
      if(furkyMember.bannable) {
  
        await furkyMember.ban({ reason: "Rol sildiği için!" });
        FurkyGuard1.channels.cache.get(furkyLog).send(roleDeleteLog);
  
      } else {
  
        FurkyGuard1.channels.cache.get(furkyLog).send(`@everyone\n\n${furkyMember} kullanıcısı ${furkyRole.name} rolünü sildi ancak kullanıcının yetkisi yüksek olduğu için işlem yapamadım!`)
  
      };
      

}}})});




// Rol Oluşturma

FurkyGuard1.on("roleCreate", async(furkyRole) => {

const roleGuild = furkyGuild;
roleGuild.fetchAuditLogs().then(async (furkyLogs) => {
  if(furkyLogs.entries.first().action === `ROLE_CREATE`) {
    const furkyMemberID = furkyLogs.entries.first().executor.id;
    if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) {
      const furkyMember = roleGuild.members.cache.get(furkyMemberID);

      await furkyMember.ban({ reason: "Rol oluşturduğu için" }).catch(x => FurkyGuard1.channels.cache.get(furkyLog).send(`${furkyMember} kullanıcısı izinsiz bir rol oluşturdu ancak kullanıyı engelleyemedim!`));
      await furkyRole.delete();

const furkyRoleCreateLog = new MessageEmbed()
.setTitle("Rol oluşturuldu!")
.setColor("#ff0000")
.setDescription(`
${furkyMember} (\`${furkyMember.user.id}\`) kullanıcısı **${furkyRole.name}** (\`${furkyRole.id}\`) rolünü oluşturdu!

Kullanıcı sunucudan yasaklandı!`)
FurkyGuard1.channels.cache.get(furkyLog).send(furkyRoleCreateLog);
      
}}})});




// Rol Güncelleme

FurkyGuard1.on("roleUpdate", async (oldFurkyRole, furkyNewRole) => {

const guild = FurkyGuard1.guilds.cache.get(furkyGuild);
  
guild.fetchAuditLogs().then(async (furkyLogs) => {
  if(furkyLogs.entries.first().action === `ROLE_UPDATE`) {
    const furkyMemberID = furkyLogs.entries.first().executor.id;
    if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) { 
      const furkyMember = guild.members.cache.get(furkyMemberID);

      await furkyMember.ban({ reason: "Rol düzenlediği için" }).catch(x => FurkyGuard1.channels.cache.get(furkyLog).send(`${furkyMember} kullanıcısı izinsiz bir rol güncelledi ancak kullanıyı engelleyemedim!`));
      
      await furkyNewRole.edit({
        name: oldFurkyRole.name,
        color: oldFurkyRole.hexColor,
        hoist: oldFurkyRole.hoist,
        permissions: oldFurkyRole.permissions,
        mentionable: oldFurkyRole.mentionable
      });

const furkyRoleUpdateLog = new MessageEmbed()
.setTitle("Rol güncellendi!")
.setColor("#ff0000")
.setDescription(`
${furkyMember} (\`${furkyMember.user.id}\`) kullanıcısı **${oldFurkyRole.name}** (\`${oldFurkyRole.id}\`) rolünü güncelledi!

Kullanıcı sunucudan yasaklandı!`)
FurkyGuard1.channels.cache.get(furkyLog).send(furkyRoleUpdateLog);
      
}}})});




// Kanal Silme

FurkyGuard1.on("channelDelete", async(furkyChannel) => {

const channelGuild = furkyGuild;
channelGuild.fetchAuditLogs().then(async (furkyLogs) => {
  if (furkyLogs.entries.first().action === `CHANNEL_DELETE`) {  
    const furkyMemberID = furkyLogs.entries.first().executor.id;
    if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) {
      const furkyMember = channelGuild.members.cache.get(furkyMemberID);
      
      await furkyMember.ban({ reason: "Kanal sildiği için" }).catch(x => FurkyGuard1.channels.cache.get(furkyLog).send(`${furkyMember} kullanıcısı izinsiz bir kanal sildi ancak kullanıyı engelleyemedim!`));
      
      await furkyChannel.clone().then(async kanal => {
        if (furkyChannel.parentID != null) await kanal.setParent(furkyChannel.parentID);
        await kanal.setPosition(furkyChannel.position);
        if (furkyChannel.type == "category") await furkyChannel.guild.channels.cache.filter(k => k.parentID == furkyChannel.id).forEach(x => x.setParent(kanal.id));
      });

const furkyChannelDeleteLog = new MessageEmbed()
.setTitle("Kanal silindi!")
.setColor("#ff0000")
.setDescription(`
${furkyMember} (\`${furkyMember.user.id}\`) kullanıcısı **${furkyChannel.name}** \`(${furkyChannel.id})\` kanalını sildi!

Kullanıcı sunucudan yasaklandı!`)
FurkyGuard1.channels.cache.get(furkyLog).send(furkyChannelDeleteLog);

}}})});



// Kanal Oluşturma

FurkyGuard1.on("channelCreate", async(furkyChannel) => {
  
const channelGuild = furkyGuild;
channelGuild.fetchAuditLogs().then(async (furkyLogs) => {
  if(furkyLogs.entries.first().action === `CHANNEL_CREATE`) {
    const furkyMemberID = furkyLogs.entries.first().executor.id;
    if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) {
      const furkyMember = channelGuild.members.cache.get(furkyMemberID);

      await furkyMember.ban({ reason: "Kanal oluşturduğu için" }).catch(x => FurkyGuard1.channels.cache.get(furkyLog).send(`${furkyMember} kullanıcısı izinsiz bir kanal oluşturdu ancak kullanıyı engelleyemedim!`));
      await furkyChannel.delete();

const furkyChannelCreateLog = new MessageEmbed()
.setTitle("Kanal oluşturuldu!")
.setColor("#ff0000")
.setDescription(`
${furkyMember} (\`${furkyMember.user.id}\`) kullanıcısı **${furkyChannel.name}** (\`${furkyChannel.id}\`) kanalını oluşturdu!

Kullanıcı sunucudan yasaklandı!`)
FurkyGuard1.channels.cache.get(furkyLog).send(furkyChannelCreateLog);

}}})});



// Kanal Güncelleme

FurkyGuard1.on("channelUpdate", async(furkyOldChannel, furkyNewChannel) => {
  
const channelGuild = furkyGuild;  
channelGuild.fetchAuditLogs().then(async (furkyLogs) => {
  if(furkyLogs.entries.first().action === `CHANNEL_UPDATE`) { 
    const furkyMemberID = furkyLogs.entries.first().executor.id;
    if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) {  
      const furkyMember = channelGuild.members.cache.get(furkyMemberID);
      if (furkyNewChannel.type !== "category" && furkyNewChannel.parentID !== furkyOldChannel.parentID) furkyNewChannel.setParent(furkyOldChannel.parentID);
      if (furkyNewChannel.type === "category") { await furkyNewChannel.edit({ name: furkyOldChannel.name });

    } else 
  
    if (furkyNewChannel.type === "text") { 
      await furkyNewChannel.edit({
        name: furkyOldChannel.name,
        topic: furkyOldChannel.topic,
        nsfw: furkyOldChannel.nsfw,
        rateLimitPerUser: furkyOldChannel.rateLimitPerUser
      });
    
    } else 
    
    if (furkyNewChannel.type === "voice") {
    await furkyNewChannel.edit({
      name: furkyOldChannel.name,
      bitrate: furkyOldChannel.bitrate,
      userLimit: furkyOldChannel.userLimit,
    });
  };
        
  furkyOldChannel.permissionOverwrites.forEach(perm => {
    let thisPermOverwrites = {};
    perm.allow.toArray().forEach(p => {
      thisPermOverwrites[p] = true;
    });
  
    perm.deny.toArray().forEach(p => {
      thisPermOverwrites[p] = false;
    });
  
    furkyNewChannel.createOverwrite(perm.id, thisPermOverwrites);
  });
        
  await furkyMember.ban({ reason: "Kanal düzenlediği için" }).catch(x => FurkyGuard1.channels.cache.get(furkyLog).send(`${furkyMember} kullanıcısı izinsiz bir kanal güncelledi ancak kullanıyı engelleyemedim!`));
  
const furkyChannelUpdateLog = new MessageEmbed()
.setTitle("Kanal güncellendi!")
.setColor("#ff0000")
.setDescription(`
${furkyMember} (\`${furkyMember.user.id}\`) kullanıcısı **${furkyNewChannel.name}** (\`${furkyNewChannel.id}\`) kanalını güncelledi!

Kullanıcı sunucudan yasaklandı!`)
FurkyGuard1.channels.cache.get(furkyLog).send(furkyChannelUpdateLog)
      
}}})});





// Guard 2


// Rol Sırası Güncelleme


FurkyGuard2.on("roleUpdate", async (oldRole, newRole) => {

const guild = FurkyGuard2.guilds.cache.get(furkyGuild);
  
guild.fetchAuditLogs().then(async (furkyLogs) => {
  if(furkyLogs.entries.first().action === `ROLE_UPDATE`) {
    if(oldRole.position != newRole.position) {
    const furkyMemberID = furkyLogs.entries.first().executor.id;
    if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) { 
      const furkyMember = guild.members.cache.get(furkyMemberID);

      await furkyMember.ban({ reason: "Rol düzenlediği için" }).catch(x => FurkyGuard2.channels.cache.get(furkyLog).send(`${furkyMember} kullanıcısı izinsiz bir rol güncelledi ancak kullanıyı engelleyemedim!`));

const furkyRoleUpdateLog = new MessageEmbed()
.setTitle("Rol güncellendi!")
.setColor("#ff0000")
.setDescription(`
${furkyMember} (\`${furkyMember.user.id}\`) kullanıcısı **${oldRole.name}** rolünün sırasını güncelledi!

Kullanıcı sunucudan yasaklandı!`)
FurkyGuard2.channels.cache.get(furkyLog).send(furkyRoleUpdateLog);
      
}}}})});


// Sağ Tık Ban

FurkyGuard2.on("guildBanAdd", async (guild, user) => {
  
const logs = await guild.fetchAuditLogs({ limit: 1, type: "MEMBER_BAN_ADD" });
const log = logs.entries.first();
if (!log) return;
const target = log.target;
const id = log.executor.id;
if (!furkyWhitelist.includes(id) && !furkyBots.includes(id)) {
let users = guild.members.cache.get(id);
let kullanici = guild.members.cache.get(FurkyGuard2.user.id);

await users.ban({ reason: "Sağ tık ile banladığı için"}).catch(x => FurkyGuard2.channels.cache.get(furkyLog).send(`@everyone\n${users} kullanıcısı sunucuda izinsiz bir işlem yaptı ancak kullanıcıyı engelleyemedim!`));
// target.unban();

const sağTıkBan = new MessageEmbed()
.setTitle("Sağ tık ban atıldı!")
.setFooter(furky.BotSettings.botFooter)
.setColor("#ff0000")
.setDescription(`
${users} (\`${users.user.id}\`) kullanıcısı ${target} (\`${target.id}\`) kullanıcısını sağ tık ile yasakladı! 

Kullanıcı sunucudan yasaklandı!`)
FurkyGuard2.channels.cache.get(furkyLog).send(sağTıkBan);
}});

FurkyGuard2.on("guildMemberUpdate", async (oldMember, newMember) => {
  
let guild = newMember.guild;
if(oldMember.nickname != newMember.nickname) {
  
  const jailRol = furky.jailRol;
  const logs = await guild.fetchAuditLogs({ type: "MEMBER_UPDATE" });
  const log = logs.entries.first();
  if (!log) return;
  const id = log.executor.id;
  if(oldMember.user.id === log.executor.id) return;
  if (!furkyWhitelist.includes(id) && !furkyBots.includes(id)) {

    let furkyMember = guild.members.cache.get(id);

await furkyMember.roles.set([jailRol]).catch(x => FurkyGuard2.channels.cache.get(furkyLog).send(`@everyone\n${furkyMember} kullanıcısı sunucuda izinsiz bir işlem yaptı ancak kullanıcıyı engelleyemedim!`));
await newMember.setNickname(oldMember.nickname);

const furkyMemberUpdateLog = new MessageEmbed()
.setTitle("Sağ tık isim güncellendi!")
.setFooter(furky.BotSettings.botFooter)
.setColor("#ff0000")
.setDescription(`
${furkyMember} (\`${furkyMember.user.id} - ${furkyMember.user.tag}\`) kullanıcısı ${newMember} (\`${newMember.user.id} - ${newMember.user.tag}\`) kullanıcısının ismini **sağ tık ile güncelledi!**

Kullanıcının bütün rolleri alınıp jaile gönderildi!`)
FurkyGuard2.channels.cache.get(furkyLog).send(furkyMemberUpdateLog);
}}});

FurkyGuard2.on("guildMemberUpdate", async (oldMember, newMember) => {

  let guild = FurkyGuard2.guilds.cache.get(furkyGuild);
  const jailRol = furky.jailRol;
  const logs = await guild.fetchAuditLogs({ type: "MEMBER_ROLE_UPDATE" });
  const log = logs.entries.first();
  const id = log.executor.id;
  
  if (newMember.roles.cache.size > oldMember.roles.cache.size) {

      if (!furkyWhitelist.includes(id) && !furkyBots.includes(id)) {
      let furkyMember = guild.members.cache.get(id);
          
await newMember.roles.set(oldMember.roles.cache.map(r => r.id));
await furkyMember.roles.set([jailRol]).catch(x => FurkyGuard2.channels.cache.get(furkyLog).send(`@everyone\n${furkyMember} kullanıcısı sunucuda izinsiz bir işlem yaptı ancak kullanıcıyı engelleyemedim!`));

const furkyYoneticiVerildiLog = new MessageEmbed()
.setTitle("Sağ tık yönetici verildi!")
.setFooter(furky.BotSettings.botFooter)
.setColor("#ff0000")
.setDescription(`
${furkyMember} (\`${furkyMember.user.id} - ${furkyMember.user.tag}\`) kullanıcısı ${newMember} (\`${newMember.user.id} - ${newMember.user.tag}\`) kullanıcısına **sağ tık ile yönetici verdi!**

Kullanıcı jaile gönderildi.`)
FurkyGuard2.channels.cache.get(furkyLog).send(furkyYoneticiVerildiLog);
}}});

FurkyGuard2.on("guildUpdate", async (furkyOldGuild, furkyNewGuild) => {

let furkyGuild = furkyNewGuild;
let furkyLogs = await furkyNewGuild.fetchAuditLogs({ type: 'GUILD_UPDATE' });

  let furkyMemberID = furkyLogs.entries.first().executor.id;
  if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) {
    
  const furkyMember = furkyGuild.members.cache.get(furkyMemberID);
    
  if (furkyNewGuild.name !== furkyOldGuild.name) await furkyNewGuild.setName(furkyOldGuild.name);
  if (furkyNewGuild.iconURL({ dynamic: true, size: 2048 }) !== furkyOldGuild.iconURL({ dynamic: true, size: 2048 })) await furkyNewGuild.setIcon(furkyOldGuild.iconURL({ dynamic: true, size: 2048 }));

furkyMember.ban({ reason: "Sunucuda değişiklik yaptığı için" }).catch(x => FurkyGuard2.channels.cache.get(furkyLog).send(`@everyone\n${furkyMember} kullanıcısı sunucuda izinsiz bir işlem yaptı ancak kullanıcıyı engelleyemedim!`));

const furkySunucuGüncelleme = new MessageEmbed()
.setTitle("Sunucu güncellendi!")
.setColor("#ff0000")
.setFooter(furky.BotSettings.botFooter)
.setDescription(`
${furkyMember} (\`${furkyMember.user.id} - ${furkyMember.user.tag}\`) kullanıcısı sunucuda değişiklik yaptı!

Kullanıcı sunucudan yasaklandı!`)
FurkyGuard2.channels.cache.get(furkyLog).send(furkySunucuGüncelleme);
}});

FurkyGuard2.on("emojiDelete", async (emoji, message) => {
  
  let guild = FurkyGuard2.guilds.cache.get(furkyGuild);
  const logs = await guild.fetchAuditLogs({ type: "EMOJI_DELETE" });
  const log = logs.entries.first();
  const id = log.executor.id;

  let furkyMemberID = logs.entries.first().executor.id;
  if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) {
  
  const furkyMember = guild.members.cache.get(furkyMemberID);
  
await emoji.guild.emojis.create(`${emoji.url}`, `${emoji.name}`);
await furkyMember.ban({ reason: "Emoji sildiği için" }).catch(x => FurkyGuard2.channels.cache.get(furkyLog).send(`@everyone\n${furkyMember} kullanıcısı sunucuda izinsiz bir işlem yaptı ancak kullanıcıyı engelleyemedim!`));

  const furkyEmojiDeleteLog = new MessageEmbed()
  .setTitle("Emoji silindi!")
  .setColor("#ff0000")
  .setFooter(furky.BotSettings.botFooter)
  .setDescription(`
${furkyMember} (\`${furkyMember.user.id} - ${furkyMember.user.tag}\`) kullanıcısı ${emoji.name} emojisini sildi!

Kullanıcı sunucudan yasaklandı!`)
FurkyGuard2.channels.cache.get(furkyLog).send(furkyEmojiDeleteLog);
}});

FurkyGuard2.on("emojiCreate", async (emoji, message) => {
  
  let guild = FurkyGuard2.guilds.cache.get(furkyGuild);
  const logs = await guild.fetchAuditLogs({ type: "EMOJI_CREATE" });
  const log = logs.entries.first();
  const id = log.executor.id;

  let furkyMemberID = logs.entries.first().executor.id;
  
  if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) {
    
  const furkyMember = guild.members.cache.get(furkyMemberID);
    
  await emoji.delete();
  await furkyMember.ban({ reason: "İzinsiz emoji oluşturduğu için" }).catch(x => FurkyGuard2.channels.cache.get(furkyLog).send(`@everyone\n${furkyMember} kullanıcısı sunucuda izinsiz bir işlem yaptı ancak kullanıcıyı engelleyemedim!`));

const furkyEmojiCreateLog = new MessageEmbed()
.setTitle("Emoji oluşturuldu!")
.setColor("#ff0000")
.setFooter(furky.BotSettings.botFooter)
.setDescription(`
${furkyMember} (\`${furkyMember.user.id} - ${furkyMember.user.tag}\`) kullanıcısı ${emoji.name} emojisini oluşturdu!

Kullanıcı sunucudan yasaklandı!`)
FurkyGuard2.channels.cache.get(furkyLog).send(furkyEmojiCreateLog);
}});

FurkyGuard2.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  
  let guild = FurkyGuard2.guilds.cache.get(furkyGuild);
  const jailRol = furky.jailRol;
  if(oldEmoji === newEmoji) return;
  const logs = await guild.fetchAuditLogs({ type: "EMOJI_UPDATE" });
  const log = logs.entries.first();
  const id = log.executor.id;

  let furkyMemberID = logs.entries.first().executor.id;
  
  if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) {
    
  const furkyMember = guild.members.cache.get(furkyMemberID);

  await newEmoji.setName(oldEmoji.name);
  await furkyMember.roles.set([jailRol]).catch(x => FurkyGuard2.channels.cache.get(furkyLog).send(`@everyone\n${furkyMember} kullanıcısı sunucuda izinsiz bir işlem yaptı ancak kullanıcıyı engelleyemedim!`));

const furkyEmojiUpdateLog = new MessageEmbed()
.setTitle("Emoji güncellendi!")
.setColor("#ff0000")
.setFooter(furky.BotSettings.botFooter)
.setDescription(`
${furkyMember} (\`${furkyMember.user.id} - ${furkyMember.user.tag}\`) kullanıcısı ${oldEmoji.name} emojisini güncelledi!

Kullanıcı jaile gönderildi.`)
FurkyGuard2.channels.cache.get(furkyLog).send(furkyEmojiUpdateLog);
}});

FurkyGuard2.on("webhookUpdate", async(channel) => {

let guild = FurkyGuard2.guilds.cache.get(furkyGuild);
const logs = await guild.fetchAuditLogs({ type: "WEBHOOK_CREATE" });
const log = logs.entries.first();
const id = log.executor.id;
let furkyMemberID = logs.entries.first().executor.id;

  if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) {

const furkyMember = guild.members.cache.get(furkyMemberID);

await furkyMember.ban({ reason: "Webhook işlemi yaptığı için" }).catch(x => FurkyGuard2.channels.cache.get(furkyLog).send(`@everyone\n${furkyMember} kullanıcısı sunucuda izinsiz bir işlem yaptı ancak kullanıcıyı engelleyemedim!`));   

const furkyWebhookLog = new MessageEmbed()
.setTitle("Webhook işlemi yapıldı!")
.setColor("#ff0000")
.setFooter(furky.BotSettings.botFooter)
.setDescription(`
${furkyMember} (\`${furkyMember.user.id} - ${furkyMember.user.tag}\`) kullanıcısı ${channel} kanalı için **webhook işlemi yaptı!**

Kullanıcı sunucudan yasaklandı!`)
FurkyGuard2.channels.cache.get(furkyLog).send(furkyWebhookLog);
}});

FurkyGuard2.on("guildMemberAdd", async (member) => {

let guild = FurkyGuard2.guilds.cache.get(furkyGuild);
const logs = await guild.fetchAuditLogs({ type: "BOT_ADD" });
const log = logs.entries.first();
const id = log.executor.id;
let furkyMemberID = logs.entries.first().executor.id;

if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) {
  
  if(member.user.bot) {
    
const furkyMember = guild.members.cache.get(furkyMemberID);

await furkyMember.ban({ reason: "Bot soktuğu için" }).catch(x => FurkyGuard2.channels.cache.get(furkyLog).send(`@everyone\n${furkyMember} kullanıcısı sunucuda izinsiz bir işlem yaptı ancak kullanıcıyı engelleyemedim!`));
await member.ban();

const furkyBotAddLog = new MessageEmbed()
.setTitle("Webhook işlemi yapıldı!")
.setColor("#ff0000")
.setFooter(furky.BotSettings.botFooter)
.setDescription(`
${furkyMember} (\`${furkyMember.user.id} - ${furkyMember.user.tag}\`) kullanıcısı ${member.user.tag} botunu **sunucuya ekledi!**

Kullanıcı sunucudan yasaklandı!`)
FurkyGuard2.channels.cache.get(furkyLog).send(furkyBotAddLog);
}}});



FurkyGuard2.on("presenceUpdate", async (oldPresence, newPresence) => {
  
  const platform = Object.keys(newPresence.user.presence.clientStatus);
  const roles = newPresence.member.roles.cache.filter((rchrd) => rchrd.editable && rchrd.name !== "@everyone" && [16,268435456,1073741824,32,2,8,4,8589934592,134217728,536870912,524288,128].some((a) => rchrd.permissions.has(a)));
  const server = FurkyGuard2.guilds.cache.get(furky.guardServer);
  const jailRol = furky.jailRol;
  
  const furkyTarayıcıLog = new MessageEmbed()
  .setTitle("Tarayıcıdan giriş yapıldı!")
  .setColor("#ff0000")
  .setFooter(furky.BotSettings.botFooter)
  .setDescription(`
${newPresence.user} (\`${newPresence.user.id}\`) kullanıcısı **uygulamadan**, **web tarayıcısına** geçti!

Kullanıcı jaile gönderildi!`)
  
  if(server.ownerID === newPresence.user.id) return;
  if(furky.furky === newPresence.user.id) return;
  if(newPresence.user.bot) return;
  
  if(newPresence.member.permissions.has([8, 4, 2, 16, 32, 268435456, 536870912, 134217728, 128])) {
  
    if (platform.find(e => e === "web")) {
     
      // await newPresence.member.roles.set([jailRol], "Uygulamadan tarayıcıya geçtiği için");
      FurkyGuard2.channels.cache.get(furky.guardLog).send(furkyTarayıcıLog)
   
    };
  };
});






// Guard 3


FurkyGuard3.on("channelDelete", async(furkyChannel) => {
  
const furkyChannelDeleteLog = new MessageEmbed()
.setTitle("Kanal silindi!")
.setColor("#ff0000")
.setDescription(`**${furkyChannel.name}** \`(${furkyChannel.id})\` kanalı silindi!`)

FurkyGuard3.channels.cache.get(furkyLog).send(furkyChannelDeleteLog);

});



FurkyGuard3.on("roleDelete", async (furkyRole) => {
  
const furkyRoleDeleteLog = new MessageEmbed()
.setTitle("Rol silindi!")
.setColor("#ff0000")
.setDescription(`**${furkyRole.name}** \`(${furkyRole.id})\` rolü silindi!`)

FurkyGuard3.channels.cache.get(furkyLog).send(furkyRoleDeleteLog);
  
});




FurkyGuard3.on("roleDelete", async(furkyRole) => {

const guild = FurkyGuard3.guilds.cache.get(furkyGuild);
  
guild.fetchAuditLogs().then(async(furkyLogs) => {
  if(furkyLogs.entries.first().action === `ROLE_DELETE`) {
    
    const furkyMemberID = furkyLogs.entries.first().executor.id;
    if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) {

      await furkyYTKapat(furky.guardServer);
      await acilDurum(furky.guardServer);

    }
  }})
});



FurkyGuard3.on("channelDelete", async(furkyChannel) => {

const guild = FurkyGuard3.guilds.cache.get(furkyGuild);
  
guild.fetchAuditLogs().then(async (furkyLogs) => {
  if (furkyLogs.entries.first().action === `CHANNEL_DELETE`) {  
    const furkyMemberID = furkyLogs.entries.first().executor.id;
    if (!furkyWhitelist.includes(furkyMemberID) && !furkyBots.includes(furkyMemberID)) {

      await furkyYTKapat(guild);

    }
  }})
});




FurkyGuard3.on("roleDelete", async(furkyRole) => {
  await db.push(`silinenRolID.${furkyDbGuild}`, `${furkyRole.id} - ${furkyRole.name} - ${moment(Date.now()).add(3, "hours").format("HH:mm:ss DD MMMM YYYY")}`);
});



FurkyGuard1.login(furky.token1).catch(() => console.log("Guard 1 açılırken bir hata meydana geldi!"));
FurkyGuard2.login(furky.token2).catch(() => console.log("Guard 2 açılırken bir hata meydana geldi!"));
FurkyGuard3.login(furky.token3).catch(() => console.log("Guard 3 açılırken bir hata meydana geldi!"));



FurkyGuard3.on("message", async message => {
  
  if(message.author.id !== furky.furky) return;
  if (message.content.toLowerCase() === "?ytaç") {
    
    await furkyYTAç(furkyGuild);
    await furkyYTAç(furky.guardServer);
    
    await message.channel.send(`Bütün yetkiler başarıyla tekrar açıldı!`);
    
  };
});

FurkyGuard3.on("message", async message => {
  
  const silinenRoller = await db.get(`silinenRolID.${furkyDbGuild}`);
  
  if(message.author.id !== furky.furky) return;
  if (message.content.toLowerCase() === "?silinenroller") {
    message.channel.send(`${silinenRoller.join('\n') || 'Veritabanında silinen rollere ait veri bulunamadı!'}`)
  };
});



// Güvenli Ekleme

/*

FurkyGuard3.on("message", async message => {
  
  let whiteUye = message.mentions.users.first();
  let whiteUsers = furky.güvenli || [];
  
  if (message.content == "?güvenliekle") {
    
    if(!whiteUye) return message.channel.send(`Lütfen güvenli listeye eklenecek kullanıcıyı etiketle!`);
    
    
    
    if (whiteUsers.some(g => g.includes(whiteUye.id))) {
      
      furky.whitelist.push(`${whiteUye.id}`);
      fs.writeFile("./furky.json", JSON.stringify(furky), (err) => {
        if (err) console.log(err);
      });
      
    };
    
    message.channel.send(`Kullanıcı başarıyla güvenli listeye eklendi!`)
    
  }
});

*/





// Fonksiyonlar



function furkyYTKapat(furkyGuild) {
  
  let furkySunucu = FurkyGuard3.guilds.cache.get(furkyGuild);
  if (!furkySunucu) return;
  furkySunucu.roles.cache.filter(r => r.editable && (r.permissions.has("ADMINISTRATOR") || r.permissions.has("MANAGE_NICKNAMES") || r.permissions.has("MANAGE_WEBHOOKS") || r.permissions.has("MANAGE_ROLES") || r.permissions.has("MANAGE_CHANNELS") || r.permissions.has("MANAGE_EMOJIS") || r.permissions.has("MANAGE_GUILD") || r.permissions.has("BAN_MEMBERS") || r.permissions.has("KICK_MEMBERS"))).forEach(async r => {
    await r.setPermissions(0);
  });
  
  const YTEmbed = new MessageEmbed()
  .setTitle("Bütün yetkilerin izinleri kapatıldı!")
  .setColor("#ff0000")
  .setDescription(`**"YÖNETİCİ", "KULLANICI_ADLARINI_YÖNET", "WEBHOOKLARI_YÖNET", "ROLLERİ_YÖNET", "KANALLARI_YÖNET", "EMOJİLERİ_YÖNET", "SUNUCUYU_YÖNET", "ÜYEYİ_YASAKLA", "ÜYEYİ_AT"** yetkilerine sahip olan bütün rollerin yetkileri çekildi!`)
  FurkyGuard3.channels.cache.get(furkyLog).send(YTEmbed)
};



function furkyYTAç(furkyGuild) {
  
  let furkySunucu = FurkyGuard1.guilds.cache.get(furkyGuild);
  if (!furkySunucu) return;
  
  const Yönetici2 = furkySunucu.roles.cache.get("873520182482599976");
  const Yönetici3 = furkySunucu.roles.cache.get("873626669859094598");
  
  Yönetici2.setPermissions(8);
  Yönetici3.setPermissions(8);
  
  const furkyYtEmbed = new MessageEmbed()
  .setFooter(furky.BotSettings.botFooter)
  .setColor("#09ff00")
  .setDescription(`Sunucudaki bütün yetkilerin izinleri tekrar açıldı!`)
  FurkyGuard1.channels.cache.get(furkyLog).send(furkyYtEmbed)
  
};



async function acilDurum(furkyGuild) {
  
  let furkySunucu = FurkyGuard3.guilds.cache.get(furkyGuild);
  if (!furkySunucu) return;
  
  const yönetici = furkySunucu.members.cache.filter(x => x.permissions.has(8))
  const yöneticisayı = furkySunucu.members.cache.filter(x => x.permissions.has(8)).size
  
  const yönet = furkySunucu.members.cache.filter(x => x.permissions.has(1342177296))
  const yönetsayı = furkySunucu.members.cache.filter(x => x.permissions.has(1342177296)).size
  
  const sunucu = furkySunucu.members.cache.filter(x => x.permissions.has(536870944))
  const sunucusayı = furkySunucu.members.cache.filter(x => x.permissions.has(536870944)).size
  
  const sağtık = furkySunucu.members.cache.filter(x => x.permissions.has(201334790))
  const sağtıksayı = furkySunucu.members.cache.filter(x => x.permissions.has(201334790)).size
  
  yönetici.forEach(async(admin) => {
    const adminrole = admin.roles.cache.find(x => x.permissions.has(8))
    try {
      await admin.roles.remove(adminrole)
    } catch(e) {
      console.error(`Yetki çekilemedi!`)
    }
  });
  
  yönet.forEach(async(admin) => {
    const adminrole = admin.roles.cache.find(x => x.permissions.has(8))
    try {
      await admin.roles.remove(adminrole)
    } catch(e) {
      console.error(`Yetki çekilemedi!`)
    }
  });
  
  sunucu.forEach(async(admin) => {
    const adminrole = admin.roles.cache.find(x => x.permissions.has(8))
    try {
      await admin.roles.remove(adminrole)
    } catch(e) {
      console.error(`Yetki çekilemedi!`)
    }
  });
  
  sağtık.forEach(async(admin) => {
    const adminrole = admin.roles.cache.find(x => x.permissions.has(8))
    try {
      await admin.roles.remove(adminrole)
    } catch(e) {
      console.error(`Yetki çekilemedi!`)
    }
  });
  
  
  FurkyGuard3.channels.cache.get(furkyLog).send(`
Roller çekildi:

- ${yöneticisayı} kişideki yönetici yetkisi çekildi.
- ${yönetsayı} kişideki Kanalları Yönet, Rolleri Yönet, Emojileri Yönet yetkileri çekildi.
- ${sunucusayı} kişideki Webhookları Yönet, Sunucuyu Yönet yetkileri çekildi.
- ${sağtıksayı} kişideki sağ tık yetkileri çekildi.`)
};





// Komutlar


FurkyGuard3.on("message", async message => {
  
  if(message.author.id !== furky.furky) return;
  if (message.content.toLowerCase() === "?ytkapat") {
    
    await furkyYTKapat(furky.guardServer);
    await message.channel.send(`Bütün yetkiler başarıyla kapatıldı!`);
    
  };
});




FurkyGuard3.on("message", async message => {
  
  if(message.author.id !== furky.furky) return;
  if (message.content.toLowerCase() === "?ytaç") {
    
    await furkyYTAç(furky.guardServer);
    await message.channel.send(`Bütün yetkiler başarıyla kapatıldı!`);
    
  };
});



FurkyGuard3.on("message", async message => {
  
  if(message.author.id !== furky.furky) return;
  if (message.content.toLowerCase() === "?acildurum") {
    
    await acilDurum(furky.guardServer);
    await message.channel.send(`Bütün yetkiler başarıyla kapatıldı!`);
    
  };
});



FurkyGuard3.on("message", async message => {
  
  if(message.author.id !== furky.furky) return;
  if (message.content.toLowerCase() === "?reset") {
    
    await message.channel.send(`Guardlar yeniden başlatılıyor!`);
    await process.exit();
    
  };
});



FurkyGuard3.on("message", async message => {
  
  const silinenRoller = await db.get(`silinenRolID.${furkyDbGuild}`);
  
  if(message.author.id !== furky.furky) return;
  if (message.content.toLowerCase() === "?silinenroller") {
    
    await message.channel.send(`${silinenRoller.join('\n') || 'Veritabanında silinen rollere ait veri bulunamadı!'}`)
  
  };
});
const Discord = require("discord.js");
const client = new Discord.Client()
const { MessageEmbed } = require('discord.js');
const db = require("quick.db");
const data = require("quick.db");
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");
require("discord-reply");

exports.run = async (client, message, args) => {

  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const enAltYt = await data.fetch(`enAltYetkili.${message.guild.id}`);
  const islem = args.splice(0).join(" ");
  const sesteOlmayan = message.guild.members.cache.filter(furky => furky.roles.cache.has(enAltYt)).filter(furkyFilter => !furkyFilter.voice.channel && furkyFilter.presence.status != "offline");
  const aktifYetkili = message.guild.members.cache.filter(furky => furky.roles.cache.has(enAltYt)).filter(furkyFilter => furkyFilter.presence.status !== "offline").size.toString().replace(/ /g, "    ");
  
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  if(!islem) return message.lineReply(furkyEmbed.setDescription(`Lütfen \`dm\` veya \`normal\` olacak şekilde bir seçenek belirtin!`)).then(m => m.delete(({ timeout: 10000 })));
  
  if(islem === "dm") {

    for(var i = 0;i < sesteOlmayan;i++) {
      
      const a = message.guild.members.cache.filter(s => s.roles.cache.has(enAltYt)).filter(s => !s.voice.channel).map(a => a)[i]
      const userDM = await a.createDM().catch(x => message.channel.send(`Bir kullanıcıyla DM oluşturulurken hata meydana geldi...\n\n${x}`))
      
      try {
        
        await userDM.send(`**${message.guild.name}** sunucumuzda herhangi bir sesli kanalda bulunmuyorsun! Lütfen sunucumuzda sesli kanallara giriş yap, eğer müsait değilsen AFK bırak!`);
      
      } catch {
        
        return message.channel.send(`<@${a.user.id}> adlı kullanıcının **DM kutusu kapalı** veya **botu engellemiş**! Kullanıcıya DM'den **mesaj gönderilemiyor!**\n\n**${message.guild.name}** sunucumuzda herhangi bir sesli kanalda bulunmuyorsun! Lütfen sunucumuzda sesli kanallara giriş yap, eğer müsait değilsen AFK bırak!`)
      
      }
    }
  };
  
  
  if(islem === "normal") {

message.channel.send(`
Şuan toplam **${aktifYetkili}** adet yetkili kullanıcı çevrimiçi!
**Seste olmayan yetkililer:**

\`\`\`fix
${sesteOlmayan.map(noVoiceMember => `${noVoiceMember}`).join(' , ')}
\`\`\`
`);
    }

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yt-say", "ytsaydm", "ytsay-dm", "yetkilisay", "yetkili-say", "ysay", "y-say"],
  permLevel: 0
};
exports.help = {
  name: 'ytsay'
};
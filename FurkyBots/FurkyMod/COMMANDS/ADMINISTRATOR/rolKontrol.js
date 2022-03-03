const Discord = require('discord.js');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {
  
  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]) || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

  const filter = (reaction, user) => {
    return ["✅"].includes(reaction.emoji.name) && user.id === message.author.id; 
  };
  
  if(!message.member.hasPermission("ADMINISTRATOR"))
  return message.react(config.GuildSettings.Emojis.crossEmoji);
    
  if (!args[0]) return message.lineReply(furkyEmbed.setDescription(`Lütfen bilgilerine bakılacak bir **rol etiketleyin!**`)).then(m => m.delete(({ timeout: 10000 })));
  if (!role) return message.lineReply(furkyEmbed.setDescription(`Lütfen **geçerli bir** rol etiketleyin!`)).then(m => m.delete(({ timeout: 10000 })));
  if (role.members.size <= 0) return message.lineReply(furkyEmbed.setDescription(`Belirttiğiniz rolde **hiçbir kullanıcı bulunamadı!**`)).then(m => m.delete(({ timeout: 10000 })));
  if (role.members.size >= 80) return message.lineReply(furkyEmbed.setDescription(`Belirttiğiniz rolde **çok fazla kullanıcı olduğundan dolayı rol listelenemedi!**`)).then(m => m.delete(({ timeout: 10000 })));
  
  let membersWithRole = message.guild.members.cache.filter(member => {
    return member.roles.cache.find(r => r.name === role.name);
  }).map(member => {
    return member.user;
  });

  const status = {
    false: "Bahsedilemez",
    true: "Bahsedilebilir"
  };
        
  const sesteOlmayan = message.guild.members.cache.filter(s => s.roles.cache.has(role.id)).filter(s => s.presence.status !== "offline").filter(s => !s.voice.channel).map(s => s).join(', ')
  const sesteOlan = message.guild.members.cache.filter(s => s.roles.cache.has(role.id)).filter(s => s.voice.channel).map(s => s).join(', ')

  message.lineReply(furkyEmbed.setDescription(`
**Rol:** ${role} (\`${role.name} - ${role.id}\`)
**Rol rengi:** \`${role.hexColor}\`
**Rol bahsedilebilirliği:** \`${status[role.mentionable]}\`
**Roldeki kullanıcı sayısı:** \`${role.members.size}\`

**───────────────**

**Seste olanlar: (Sadece aktif kullanıcılar)**
${sesteOlan} 

**Seste olmayanlar: (Sadece aktif kullanıcılar)**
${sesteOlmayan}
`));
    
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["rol-kontrol", "role-kontrol", "rolekontrol", "rol-chech", "rolcheck", "rolecheck", "role-check"],
  permLevel: 0
};

exports.help = {
  name: "rolkontrol"
};

/*
\`${role.name}\` rolüne sahip kullanıcılar

${membersWithRole.join("\n")}
*/

  /*.then(x => {
x.react("✅");  
x.awaitReactions(filter, {max: 1, time: 10000, error: ['time']}).then(z => {
            let donut = z.first();
            if (donut) {
				
			  x.edit(`
Role sahip olup seste olanlar;
${sesteOlan}

**───────────────**

Role sahip olup seste olmayanlar;
${sesteOlmayan}`);
            };
        });
	    });*/
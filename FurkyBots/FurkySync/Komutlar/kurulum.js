const Discord = require("discord.js");
const backup = require('discord-backup');

exports.run = async (client, message, args) => {

  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(`${message.author.tag} tarafından kullanıldı!`, message.author.displayAvatarURL({ dynamic:true }))
  const backupID = args.join(' ');
  
  if(!message.member.hasPermission('ADMINISTRATOR')) return;

  backup.fetch(backupID).then(() => {
    message.channel.send(furkyEmbed.setDescription(`:warning: **Dikkat!**\n**${message.guild.name}** sunucusundaki bütün kanallar ve roller silinecektir!\nEğer onaylıyorsanız **onaylıyorum**, onaylamıyorsanız **hayır** yazınız!`));

    const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['onaylıyorum', 'cancel'].includes(m.content), {
      time: 60000,
      max: 1
    });
        
    collector.on('collect', (m) => {
      const confirm = m.content === 'onaylıyorum';
      collector.stop();
      if (confirm) {
        backup.load(backupID, message.guild).then(() => {
      }).catch((err) => {
        if (err === 'No backup found')
            return message.channel.send(furkyEmbed.setDescription(`Girdiğiniz ID'ye ait **yedek bulunamadı!**`));
          else
            return message.channel.send('**Bir hata meydana geldi!**');
          });

          } else {
            return message.channel.send(furkyEmbed.setDescription(`**İşlem iptal edildi!**`));
          }
        })

      collector.on('end', (collected, reason) => {
        if (reason === 'time')
          return message.channel.send('Geçerli sürede yanıt verilmediği için **işlem iptal edildi!**');
      })}).catch(() => {
        return message.channel.send(furkyEmbed.setDescription(`Girdiğiniz ID'ye ait **yedek bulunamadı!**`));
    });

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yedek-kur", "yedekyükle", "yedek-yükle"],
  permLevel: 0
};

exports.help = {
  name: "kurulum"
};
const Discord = require('discord.js');
const backup = require('discord-backup');

exports.run = async (client, message, args) => {

  const furkyEmbed = new Discord.MessageEmbed().setColor("#bf51d5").setFooter(`${message.author.tag} tarafından kullanıldı!`, message.author.displayAvatarURL({ dynamic:true }))
  
  if(!message.member.hasPermission('ADMINISTRATOR')) return;

  const backupID = args.join(' ');
  if (!backupID) return message.channel.send(furkyEmbed.setDescription(`Lütfen bir backup ID'si giriniz!`));

  backup.fetch(backupID).then((backup) => {

    const date = new Date(backup.data.createdTimestamp);
    const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
    const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

    message.channel.send(furkyEmbed.setDescription(`
**${backup.id}** \`(${backup.data.name})\` ID'sine ait yedek bilgileri

\`\`\`
Yedek ID:
${backup.id}
\`\`\`
\`\`\`
Yedek adı:
${backup.data.name}
\`\`\`
\`\`\`
Yedek büyüklüğü:
${backup.size} kb
\`\`\`
\`\`\`
Yedek oluşturulma tarihi:
${formattedDate}
\`\`\`
`))}).catch((err) => {
    if (err === 'No backup found')
      return message.channel.send(furkyEmbed.setDescription(`Belirttiğiniz ID'ye ait yedek bulunamadı!`));
    else
      return message.channel.send('Bir hata meydana geldi!');
    });

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yedek-bilgi"],
  permLevel: 0
};

exports.help = {
  name: "yedekbilgi"
};
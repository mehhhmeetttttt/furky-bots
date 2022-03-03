const Discord = require('discord.js');
const config = require("../../config.json");
const ayarlar = require("../../ayarlar.json");

exports.run = async (client, message, args) => {

  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);

  if(message.author.id !== ayarlar.sahip) return;
  
  let role = message.mentions.roles.first()
  if (!role) return message.reply(furkyEmbed.setDescription(`Lütfen bir rol etiketle!`))
  var rol = message.guild.roles.cache.get(role.id);
  if (!rol) return message.reply(furkyEmbed.setDescription(`Lütfen geçerli bir rol etiketle!`))
  
  message.guild.members.fetch().then(async data => {
    let members = data.map(m => m.user.id);
    var mesaj = await message.channel.send(new Discord.MessageEmbed().setColor("RANDOM")
    .setDescription(`
Rol dağıtım işlemi başlatıldı, bütün kullanıcılara <@&${rol.id}> rolü dağıtılmaya başlanıyor...


**Tahmini rol verilecek kişi sayısı:** \`${members.length}/${members.length}\`
**Tahmini kalan süre:** \`${Math.round((members.length) * (1.5) / (60))} Dakika\``)).then(m => m).catch(err => {
        console.log(err);
        console.log(`Rol dağıtmada bir problem meydana geldi...`)
      });
      var indexDurumu = 0;
      setInterval(async function () {
        if (indexDurumu >= members.length) {
          mesaj.edit(new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`
Rol dağıtım işlemi sona erdi!

**Rol verilecek kullanıcı sayısı:** \`${members.length}\`
**Rol verilen kullanıcı sayısı:** \`${indexDurumu}\`
**Gerçekleşen süre:** \`${Math.round((members.length) * (1.5) / (60))} Dakika\`
`))
          return clearInterval(this);
        }
        var id = members[indexDurumu];
        var guildMember = await message.guild.members.cache.get(id);
        await guildMember.roles.add(rol.id);
        indexDurumu++;
      }, 1500)
    })
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["herkesrolver"],
  permLevel: 4
};

exports.help = {
  name: 'herkeserol'
};
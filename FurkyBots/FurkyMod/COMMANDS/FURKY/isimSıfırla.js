const Discord = require('discord.js');
const config = require("../../config.json");
const ayarlar = require("../../ayarlar.json");

exports.run = async (client, message, args) => {

  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);

  if(message.author.id !== ayarlar.sahip) return;
  
  message.guild.members.fetch().then(async data => {
    let members = data.map(m => m.user.id);
    var mesaj = await message.channel.send(new Discord.MessageEmbed().setColor("RANDOM")
    .setDescription(`
İşlem başlıyor, herkesin ismi sıfırlanıyor...


**Tahmini isim değiştirilecek verilecek kişi sayısı:** \`${members.length}/${members.length}\`
**Tahmini kalan süre:** \`${Math.round((members.length) * (1.5) / (60))} Dakika\``)).then(m => m).catch(err => {
        console.log(err);
        console.log(`İsim düzeltmede bir problem meydana geldi...`)
      });
      var indexDurumu = 0;
      setInterval(async function () {
        if (indexDurumu >= members.length) {
          mesaj.edit(new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`
İşlem sona erdi!

**İsmi değiştirilecek kullanıcı sayısı:** \`${members.length}\`
**İsmi değiştirilen kullanıcı sayısı:** \`${indexDurumu}\`
**Gerçekleşen süre:** \`${Math.round((members.length) * (1.5) / (60))} Dakika\`
`))
          return clearInterval(this);
        }
        var id = members[indexDurumu];
        var guildMember = message.guild.members.cache.get(id);
        guildMember.setNickname(null);
        indexDurumu++;
      }, 1500)
    })
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'isimdeğiştir-herkes'
};
const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {

  const furkyEmbed = new Discord.MessageEmbed().setColor("RANDOM").setFooter(config.BotSettings.botFooter);
  
  message.channel.send(furkyEmbed.setDescription(`
Herhangi bir kod çalışmaması & hata durumunda <#908025605654736896> kanalından <@!877466907673002025> kullanıcısını etiketleyebilirsiniz.
  
**Yönetici**
\`\`\`fix
.allvoicemute , .allvoiceunmute , .kanal , .rol , .rolkontrol , .say , .seslidağıt , .temizle , .yasaklıtag , .yavaşmod , .ytsay
\`\`\`
**Geliştirici**
\`\`\`fix
.kurulum , .emojikur , .emojiyükle , .herkeserolver , .karaliste , .açılmazban , .açılmazbankaldır , .eval , .kanalkopyala , .mesajedit , .taglıroldağıt , .menü , .buton
\`\`\`
**Ceza**
\`\`\`fix
.ban , .cmute , .jail , .kick , .sicil , .unban , .uncmute , .unjail , .vmute , .unvmute
\`\`\`
**Kayıt**
\`\`\`fix
.erkek , .isim , .isimler , .kadın , .kayıtsız , .vip
\`\`\`
**Yetkili & User**
\`\`\`fix
.git , .snipe , .çek , .afk , .avatar , .banner , .booster , .izinligit , .izinliçek , .me , .seskontrol , .xp , .yardım
\`\`\`
  `));

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["yardim", "help"],
    permLevel: 0
};

exports.help = {
  name: "yardım"
};
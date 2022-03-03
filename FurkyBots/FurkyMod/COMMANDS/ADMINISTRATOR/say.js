const Discord = require("discord.js");
const { oneLine, stripIndents } = require('common-tags');
const data = require("quick.db");
const ayarlar = require("../../ayarlar.json");
const config = require("../../config.json");

exports.run = async (client, message, args) => {

  const boosterRol = await data.fetch(`boosterRol.${message.guild.id}`);
  const guild = config.Tag.guildID;
  const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'voice');
  
  if(!message.member.roles.cache.has("934122759523532870") && !message.member.roles.cache.has("934122736056426596") && !message.member.roles.cache.has("934122727789449246") && (!message.member.hasPermission("ADMINISTRATOR")))
  return message.react(config.GuildSettings.Emojis.crossEmoji);
  
  let count = 0;
  for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
  var üyesayısı = message.guild.members.cache.size.toString().replace(/ /g, "    ")
  var üs = üyesayısı.match(/([0-9])/g)
  üyesayısı = üyesayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()

  if(üs) {
    üyesayısı = üyesayısı.replace(/([0-9])/g, d => {
      return {
        '0': "0",
        '1': "1",
        '2': "2",
        '3': "3",
        '4': "4",                       
        '5': "5",
        '6': "6",
        '7': "7",
        '8': "8",
        '9': "9"
      }[d];
    })
  };
  
  var sessayı = count.toString().replace(/ /g, "    ")
  var üs2 = sessayı.match(/([0-9])/g)
  sessayı = sessayı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()

  if(üs2) {
    sessayı = sessayı.replace(/([0-9])/g, d => {
      return {
        '0': "0",
        '1': "1",
        '2': "2",
        '3': "3",
        '4': "4",                       
        '5': "5",
        '6': "6",
        '7': "7",
        '8': "8",
        '9': "9"
      }[d];
    })
  };

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
message.guild.members.cache.filter(s => { 
if(s.user.username.includes(tag1) || s.user.username.includes(tag2) || s.user.username.includes(tag3) || s.user.username.includes(tag4) || s.user.username.includes(tag5) || s.user.username.includes(tag6) || s.user.username.includes(tag7) || s.user.username.includes(tag8) || s.user.username.includes(tag9) || s.user.discriminator === etiket || s.roles.cache.has(rol)) { taglılar = taglılar+1 }})

var taglılar = taglılar.toString().replace(/ /g, "    ")
var üs3 = taglılar.match(/([0-9])/g)
taglılar = taglılar.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(üs3) {
taglılar = taglılar.replace(/([0-9])/g, d => {
return {
'0': "0",
'1': "1",
'2': "2",
'3': "3",
'4': "4",                       
'5': "5",
'6': "6",
'7': "7",
'8': "8",
'9': "9"}[d];})}

  var cevirimici = message.guild.members.cache.filter(m => m.presence.status !== "offline").size.toString().replace(/ /g, "    ")
  var üs4= cevirimici.match(/([0-9])/g)
  cevirimici = cevirimici.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()

  if(üs4) {
    cevirimici = cevirimici.replace(/([0-9])/g, d => {
      return {
        '0': "0",
        '1': "1",
        '2': "2",
        '3': "3",
        '4': "4",                       
        '5': "5",
        '6': "6",
        '7': "7",
        '8': "8",
        '9': "9"
      }[d];
    })
  };
  
const sayEmbed = new Discord.MessageEmbed()
.setColor('BLACK')
.setDescription(`
 
**\`>\`** Şu anda toplam **${sessayı}** \`(+${message.guild.members.cache.filter(a => a.user.bot && a.voice.channel).size} Bot)\` kişi seslide.
**\`>\`** Sunucuda **${üyesayısı}** adet üye var. \`(${cevirimici} Aktif!)\`
**\`>\`** Toplamda **${taglılar}** kişi tagımızı alarak bizi desteklemiş.
**\`>\`** Sunucuya **${message.guild.premiumSubscriptionCount}** boost basılmış! \`(${message.guild.premiumTier}. seviye!)\`
`);

message.lineReply(sayEmbed);
  
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'say'
};
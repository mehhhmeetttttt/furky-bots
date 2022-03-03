const Discord = require('discord.js')
const fetch = require('node-fetch')
exports.run = async (client, message, args) => {

let uid = message.author.id;

let response = fetch(`https://discord.com/api/v8/users/${uid}`, {
    method: 'GET',
    headers: {
      Authorization: `Bot ${client.token}`
    }
});

let receive = ''
let banner = 'https://cdn.discordapp.com/attachments/829722741288337428/834016013678673950/banner_invisible.gif' 

response.then(a => {
  if(a.status !== 404) {
    a.json().then(data => {
    receive = data['banner']

      if(receive !== null) {

        let response2 = fetch(`https://cdn.discordapp.com/banners/${uid}/${receive}.gif`, {
          method: 'GET',
          headers: {
            Authorization: `Bot ${client.token}`
          }
      });
        
let statut = ''
response2.then(b => {
statut = b.status

banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.gif?size=1024`
if(statut === 415) {
  banner = `https://cdn.discordapp.com/banners/${uid}/${receive}.png?size=1024`
}

})
}})}})

setTimeout(() => {
  let embed = new Discord.MessageEmbed()
  .setColor("RANDOM")
  .setImage(banner)
  message.channel.send(embed)
}, 1000)

};
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 0
};

exports.help = {
  name: "banner"
};
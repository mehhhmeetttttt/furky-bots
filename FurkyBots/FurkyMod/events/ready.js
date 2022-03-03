const Discord = require('discord.js');
const Moment = require('moment');
const config = require("../config.json");

module.exports = client => {

  const oyunlar = ["Furky's Test Bot"]

  setInterval(() => {
    const oyun = Math.floor(Math.random() * (oyunlar.length - 1))
    client.user.setActivity(oyunlar[oyun])
  }, 3000)
}
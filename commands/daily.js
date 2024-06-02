const { SlashCommandBuilder } = require('discord.js');
const { currencyName } = require('../currencyConfig.json')

module.exports = {
data: new SlashCommandBuilder()
    .setName('daily')
    .setDescription(`Get your daily ${currencyName}`),
execute(interaction) {
const user = interaction.options.getUser('user')
const data = require('../index').db
const u = data.get(interaction.user.id)
if(u.content.lastDaily > Date.now() + 86400000) return interaction.reply(`You already claimed your daily ${currencyName}! You can claim them again in ${Math.floor((u.content.lastDaily + 86400000 - Date.now()) / 1000 / 60 / 60)} hours!`)
u.content.coins = u.content.coins + require('../currencyConfig.json').Daily_Amount
u.content.lastDaily = Date.now()
u.save()
interaction.reply(`You claimed your daily ${currencyName}! You now have ${u.content.coins} ${currencyName}!`)
}
}
// This bot is modular, so you can add commands to it without having to edit the main file. To add a economy command, copy this file and rename it to the command name. Then, edit the data and execute functions to your liking. You can also add more functions to this file and call them in the execute function. To add a non-economy command, just remove the giveCoins function and the currencyName variable.
const { SlashCommandBuilder } = require('discord.js');
const giveCoins = require('../addcoins')
const { currencyName } = require('./currencyConfig.json')

module.exports = {
data: new SlashCommandBuilder()
    .setName('command')
    .setDescription('Command Description'),
    // add any command arguments here with .add[Type]Option()
execute(interaction) {
// do somthing then give coins
const balance = giveCoins(interaction.user.id, 100) // the give function returns the new balance
// then let the user know
interaction.reply(`Nice! You got 100 ${currencyName} and now have ${balance} ${currencyName}!`)
}
}
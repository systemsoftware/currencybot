const { SlashCommandBuilder } = require('discord.js');
const { currencyName } = require('../currencyConfig.json')


module.exports = {
data: new SlashCommandBuilder()
    .setName('inventory')
    .setDescription(`View your inventory`)
    .addUserOption(option => option.setName('user').setDescription('The user to view the inventory of').setRequired(false)),

async execute(interaction) {
const u = interaction.options.getUser('user') || interaction.user
interaction.reply(await require('../inv')(1, u.id))
}
}
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('shop')
    .setDescription('View the shop')
    .addIntegerOption(option => option.setName('page').setDescription('The page of the shop to view').setRequired(false)),
    async execute(interaction) {
        interaction.reply(require('../shop')(interaction.options.getInteger('page') || 1))
    }
}
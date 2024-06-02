const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
data: new SlashCommandBuilder()
    .setName('give')
    .setDescription('Give a user coins')
    .addUserOption(option => option.setName('user').setDescription('The user you want to give coins to').setRequired(true))
    .addIntegerOption(option => option.setName('amount').setDescription('The amount of coins you want to give').setRequired(true))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

execute(interaction) {
const give = require('../addcoins')
const user = interaction.options.getUser('user')
const amount = interaction.options.getInteger('amount')
const _amount = give(user.id, amount)
interaction.reply(`You gave ${user.username} ${amount} coins! They now have ${_amount} coins!`)
}
}
const { SlashCommandBuilder } = require('discord.js');
const { currencyName } = require('../currencyConfig.json')


module.exports = {
data: new SlashCommandBuilder()
    .setName('use')
    .setDescription(`Use an item from your inventory`)
    .addStringOption(option => option.setName('item').setDescription('The item to use').setRequired(true).setAutocomplete(true)),
async autocomplete(interaction) {
let inv = require('../index').db.get(interaction.user.id).content.items
if(!inv) inv = []
await interaction.respond(inv.map(i => { return { name:i, value:i } }).filter(i => i.name.toLowerCase().includes(interaction.options.getString('item').toLowerCase())).slice(0, 25))
},
async execute(interaction) {
const db = require('../index').db
const _item = interaction.options.getString('item')
const item = require('../shopItems.json').find(i => i.name.toLowerCase() == _item.toLowerCase())
if(!item) return interaction.reply({ content:`That item doesn't exist!`, ephemeral:true })
const data = db.get(interaction.user.id)
if(!data.content.items.includes(item.name)) return interaction.reply({ content:`You don't have that item!`, ephemeral:true })
if(item.type == 'role'){
if(!item.role_id) throw new Error(`Role ${item.name} has no role_id!`)
if(interaction.member.roles.cache.has(item.role_id)){
interaction.member.roles.remove(item.role_id)
}else{
interaction.member.roles.add(item.role_id)
}
}
if(item.destroy_on_use){
data.content.items = data.content.items.filter(i => i != item.name)
data.save()
}
let msg = `${interaction.user} used ${item.name}!`
if(item.useMessage) msg = item.useMessage.replace(/{user}/g, interaction.user).replace(/{item}/g, item.name)
interaction.reply({ content:msg })
}
}
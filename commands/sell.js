const { SlashCommandBuilder } = require('discord.js');
const { currencyName } = require('../currencyConfig.json')


module.exports = {
data: new SlashCommandBuilder()
    .setName('sell')
    .setDescription(`Sell an item from your inventory and get 50% of the price back`)
    .addStringOption(option => option.setName('item').setDescription('The item to buy').setRequired(true).setAutocomplete(true)),
async autocomplete(interaction) {
    let inv = require('../index').db.get(interaction.user.id).content.items
    if(!inv) inv = []
    await interaction.respond(inv.map(i => { return { name:i, value:i } }).filter(i => i.name.toLowerCase().includes(interaction.options.getString('item').toLowerCase())).slice(0, 25))
},
execute(interaction) {
const db = require('../index').db
const _item = interaction.options.getString('item')
const item = require('../shopItems.json').find(i => i.name.toLowerCase() == _item.toLowerCase())
if(!item) return interaction.reply({ content:`That item doesn't exist!`, ephemeral:true })
const data = db.get(interaction.user.id)
if(!data.content.items.includes(item.name)) return interaction.reply({ content:`You don't have that item!`, ephemeral:true })
const price = Math.round(item.price / 2)
data.content.coins += price
data.content.items = data.content.items.filter(i => i != item.name)
data.save()
if(item.type == 'role'){
if(!item.role_id) throw new Error(`Role ${item.name} has no role_id!`)
try{
interaction.member.roles.remove(item.role_id)
}catch{
console.log(`Failed to remove role ${item.role_id} from ${interaction.user.id}`)
}
}
interaction.reply({ content:`${interaction.user} sold ${item.name} for ${price} ${currencyName}!` })
}
}
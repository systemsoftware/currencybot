const { SlashCommandBuilder } = require('discord.js');
const { currencyName } = require('../currencyConfig.json')


module.exports = {
data: new SlashCommandBuilder()
    .setName('buy')
    .setDescription(`Buy an item from the shop`)
    .addStringOption(option => option.setName('item').setDescription('The item to buy').setRequired(true).setAutocomplete(true)),
async autocomplete(interaction) {
    const shop = require('../shopItems.json')
    const item = interaction.options.getString('item')
    const items = shop.filter(i => i.name.toLowerCase().includes(item.toLowerCase())).map(i => { return { name:i.name, value:i.name } })
    if(!items.length) items = [ { name:"No items found", value:"null" } ]
    if(items.length > 25) items.length = 25
    await interaction.respond(items)
},
execute(interaction) {
 const { db }  = require('../index')
const shop = require('../shopItems.json')
const item = interaction.options.getString('item')
const i = shop.find(i => i.name.toLowerCase() == item.toLowerCase())
if(!i) return interaction.reply({ content:`That item doesn't exist!`, ephemeral:true })
if(i.price > db.get(interaction.user.id).content.coins || i.price < 0) return interaction.reply({ content:`You don't have enough ${currencyName} to buy that!`, ephemeral:true })
if(i.type == 'role') {
if(!i.role_id) throw new Error(`Role ${i.name} has no role_id!`)
interaction.member.roles.add(i.role_id)
}
let msg = `You bought ${i.name} for ${i.price} ${currencyName}`
if(i.buyMessage) msg = i.buyMessage.replace(/{user}/g, interaction.user.username)
const d = db.get(interaction.user.id)
d.content.coins -= i.price
if(!d.content.items) d.content.items = []
d.content.items.push(i.name)
d.save()
interaction.reply({ content:msg })
}
}
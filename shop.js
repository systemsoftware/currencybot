const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } = require('discord.js')
const shop = require('./shopItems.json')
const { currencyName, shopDescription } = require('./currencyConfig.json')
const { Embed_Hex_Color } = require('./BotConfig.json');

module.exports = (page) => {
    const items = shop.slice(page * 25 - 25, page * 25)
    const pageSel = []
    for(let i = 1; i <= Math.ceil(shop.length / 25); i++) {
        pageSel.push(
            new StringSelectMenuOptionBuilder()
            .setLabel(`Page ${i}/${Math.ceil(shop.length / 25)}`)
            .setValue(`${i}`)
        )
    }
    
    return {
    embeds:[ new EmbedBuilder()
    .setTitle(`Shop (${page}/${Math.ceil(shop.length / 25)})`)
    .setDescription(shopDescription)
    .setColor(Embed_Hex_Color)
    .setTimestamp()
    .addFields(items.map(i => { return { name:`${i.name} (${i.type.toUpperCase()})`,  value:`${i.price} ${currencyName} ${ i.destroy_on_use ? `- One-time use` : '' } ` } }))
    ],
    components: [
            new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('shop_page')
                .setPlaceholder('Select a page')
                .addOptions(...pageSel)
            )
            ]
        }
}
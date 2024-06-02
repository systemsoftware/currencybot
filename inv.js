const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js')
const { Embed_Hex_Color } = require('./BotConfig.json');
const { StringSelectMenuOptionBuilder } = require('@discordjs/builders');

module.exports = async (page, user) => {
    const inventory = require('./index').db.get(user).content.items
    const items = inventory.slice(page * 25 - 25, page * 25)
    const _user = await require('./index').client.users.fetch(`${user}`)
    
    const pageSel = []
    for(let i = 1; i <= Math.ceil(inventory.length / 25); i++) {
        pageSel.push(
            new StringSelectMenuOptionBuilder()
            .setLabel(`Page ${i}/${Math.ceil(inventory.length / 25)}`)
            .setValue(`${i}`)
        )
    }

    if(items.length == 0) return { content:`${_user.username} has no items!` }
    
    return {
    embeds:[ new EmbedBuilder()
    .setTitle(`${_user.username}'s Inventory (${page}/${Math.ceil(inventory.length / 25)})`)
    .setColor(Embed_Hex_Color)
    .setTimestamp()
    .setDescription(items.join('\n'))
],
    components: [
            new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId(`inv_page_${user}`)
                .setPlaceholder('Select a page')
                .addOptions(...pageSel)
                )
            ]
        }
}
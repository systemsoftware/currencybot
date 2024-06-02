require('./index').client.on('interactionCreate', async (interaction) => {
    if(interaction.customId == 'shop_page') {
    interaction.update(require('./shop')(parseInt(interaction.values[0])))
    }else if(interaction.customId?.startsWith('inv_page')) {
    interaction.update(await require('./inv')(parseInt(interaction.values[0]), interaction.customId.split('_')[2]))
    }
})
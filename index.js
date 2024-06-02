const { Client, EmbedBuilder, Collection, IntentsBitField } = require('discord.js')
const { readdirSync } = require('fs')
const dubnium = require('dubnium')
const config = require('./BotConfig.json')
const db = new dubnium('./db', 'json', { versioning:config.DataVersioning })

const client = new Client({ intents:[ IntentsBitField.Flags.GuildMessages ] })

const commands = new Collection()
readdirSync('./commands').filter(file => file.endsWith('.js')).forEach(f => {
commands.set(require(`./commands/${f}`).data.name, require(`./commands/${f}`))
})

module.exports = { client, commands, db }

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return
    const cmd = commands.get(interaction.commandName)
    if (!cmd) return
    try { cmd.execute(interaction) } catch (e) { console.error(e) }
})

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isAutocomplete()) return
    const cmd = commands.get(interaction.commandName)
    if (!cmd) return
    try { cmd.autocomplete(interaction) } catch (e) { console.error(e) }
})


require('./xp')
require('./menus')

if(!process.argv.includes('--nr')) require('./register')

client.login(config.token)
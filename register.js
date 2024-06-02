const fs = require('fs')
const {
    REST,
    Routes
} = require('discord.js')
const { token, bot_id } = require('./BotConfig.json')

const body = []
const files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of files) {
    const command = require(`./commands/${file}`)
    body.push(command.data.toJSON())
}


const rest = new REST({
    version: "10"
}).setToken(token)

rest.put(Routes.applicationCommands(bot_id), {
        body
    })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error)
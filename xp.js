const { client:bot, db } = require('./index')

const cooldown = new Set()

const { XP_Cooldown_MS,  XP_MAX, Allow_Bots_To_Gain_XP} = require('./currencyConfig.json')

bot.on('messageCreate', async (message) => {
    console.log(message.author.id)

if(Allow_Bots_To_Gain_XP == false && message.author.bot) return

if(cooldown.has(message.author.id)) return 
const user = db.get(message.author.id)
user.content.cooldown = Date.now() + XP_Cooldown_MS
user.content.coins = user.content.coins + Math.floor(Math.random() * XP_MAX)
user.save()

})
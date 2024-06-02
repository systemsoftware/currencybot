module.exports = (userId, amount) => {
    const { db } = require('./index')
    if(!db.has(userId)) db.create(userId, { coins:0 })
    const user = db.get(userId)
    user.content.coins = user.content.coins - amount
    user.save()
    return user.content.coins
}
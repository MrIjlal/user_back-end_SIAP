module.exports = (app) => {
    const profil = require('../controllers/profile-controller')
    const router = require('express').Router()

    router.get('/', profil.findAll)
    router.post('/', profil.create)
    router.get('/:id', profil.findOne)
    router.put('/:id', profil.update)
    router.delete('/:id', profil.delete)

    app.use('/api/profiles', router)
}
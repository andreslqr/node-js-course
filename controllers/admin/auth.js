const User = require('./../../models/user')
const bcrypt = require('bcryptjs')

module.exports.registerForm = (req, res, next) => {
    return res.render('admin/auth/register', {
        metaTitle: 'Register'
    })
}

module.exports.register = async (req, res, next) => {
    
    const user = await User.findOne({ email: req.email })

    if(user) {
        return res.redirect('/admin/register')
    }

    await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    })

    return res.redirect('/admin/login')
}


module.exports.loginForm = (req, res, next) => {
    return res.render('admin/auth/login', {
        metaTitle: 'Login'
    })
}



module.exports.login = async (req, res, next) => {

    const user = await User.findOne({
        email: req.body.email
    })

    if(user && bcrypt.compareSync(req.body.password, user.password)) {
        req.session.user = user

        req.session.save()

        return res.redirect('/admin/products')
    }

    return res.redirect('/admin/login')
}

module.exports.logout = (req, res, next) => {
    
    req.session.destroy()
    return res.redirect('/admin')
}
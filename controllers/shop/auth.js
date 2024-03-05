

module.exports.loginForm = (req, res, next) => {
    return res.render('auth/login', {
        metaTitle: 'Login'
    })
}

module.exports.login = (req, res, next) => {

}
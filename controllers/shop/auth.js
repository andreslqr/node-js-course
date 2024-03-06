const User = require('./../../models/user')

module.exports.loginForm = (req, res, next) => {
    return res.render('shop/auth/login', {
        metaTitle: 'Login'
    })
}


module.exports.login = async (req, res, next) => {

    const data = {
        name: 'john doe',
        email: req.body.email
    }

    req.session.user = await User.findOneAndUpdate(
        data, // Condición de búsqueda
        {}, // Valores a actualizar o establecer si el usuario no existe
        { new: true, upsert: true } // Opciones: Devolver el nuevo documento y crearlo si no existe
    );

    

    return res.redirect('/')
}
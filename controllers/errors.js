module.exports.error404 = (req, res, next) => {
    return res.status(404)
            .render('errors/404', {
                path: null,
                metaTitle: 'Page not found'
            })
}
let ROLES = {
    admin: 'admin',
    user: 'user'
}
const checkIsInRole = (...roles) => (req, res, next) => {
    if (!req.user) {
        return res.redirect('/login')
    }

    const hasRole = roles.find(role => req.user.role === role)
    if (!hasRole) {
        return res.redirect('/login')
    }

    return next()
}
module.exports = {
    ROLES: ROLES,
    checkIsInRole
}

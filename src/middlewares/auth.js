module.exports = (req, res, next) => {
    const userId = req.user.id;
    if (!userId) {
        res.user.id = undefined
        return res.redirect('/login');
    }
    next()
}


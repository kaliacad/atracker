module.exports = (req, res, next) => {
    const userId = req.user;
    if (!userId) {
        return res.redirect('/login');
    }
    next()
}
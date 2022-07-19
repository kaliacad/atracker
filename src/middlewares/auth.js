module.exports = (req, res, next) => {
    const userId = req.user ? req.user : undefined;
    if (!userId) {
        // res.user.id = undefined;
        return res.redirect("/login");
    }
    next();
};

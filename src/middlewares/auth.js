// eslint-disable-next-line consistent-return
export default (req, res, next) => {
    const userId = req.user ? req.user : undefined;
    console.log(req.user);
    if (!userId) {
        // res.user.id = undefined;
        return res.redirect("/login");
    }
    next();
};

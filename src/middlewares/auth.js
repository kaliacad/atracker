// eslint-disable-next-line consistent-return
export default (req, res, next) => {
    const userId = req.user ? req.user : undefined;

    if (!userId) return res.redirect("/");
    
    next();
};

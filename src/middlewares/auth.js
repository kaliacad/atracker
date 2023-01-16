// eslint-disable-next-line consistent-return
export default (req, res, next) => {
    const userId = req.user.id

    if (userId === undefined) return res.redirect("/");
    
    next();
};

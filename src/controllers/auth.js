exports.getLogin = (req, res, next) => {
    res.render("auth/login");
};

exports.postLogin = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    console.log(req.body);
    res.redirect("/");
};

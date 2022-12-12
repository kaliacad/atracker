export default (req, res) => {
    const userId = req.user ? req.user.id : null;
    const role = req.user ? req.user.role : null;

    res.render("public/index", {
        userId,
        title: "Attentancy GDA - Bienvenue",
        role,
    });
};

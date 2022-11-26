export default (req, res) => {
    const userId = req.user;
    res.render("public/index", {
        userId,
        title: "Attentancy GDA - Bienvenue",
    });
};

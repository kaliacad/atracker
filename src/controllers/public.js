export function getIndex(req, res, next) {
    const userId = req.user;
    res.render("public/index", {
        userId,
        title: "Attentancy GDA - Bienvenue",
    });
}

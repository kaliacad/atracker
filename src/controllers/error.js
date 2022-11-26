export function getNotFound(req, res) {
    res.status(404).render("errors/404", {
        title: " Not found",
        userId: req.user,
    });
}

export function getInternalError(req, res) {
    res.status(500).render("errors/500", {
        title: " Internal error",
        userId: req.user,
    });
}

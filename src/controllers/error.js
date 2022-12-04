export function getNotFound(req, res) {
    const role = null;
    res.status(404).render("errors/404", {
        title: " Not found",
        userId: req.user,
        role,
    });
}

export function getInternalError(req, res) {
    const role = null;

    res.status(500).render("errors/500", {
        title: " Internal error",
        userId: req.user,
        role,
    });
}

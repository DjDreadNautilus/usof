async function checkRights(req, res, next) {
    if(req.session.authenticated) {
        console.log("user are authenticated");
        return;
    }
    next();
}

module.exports = {checkRights}
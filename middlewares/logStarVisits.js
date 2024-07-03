const logStarVisits = (req, res, next) => {
    if (req.user) {
        const starId = req.params.id;
        console.log(`Usuario ${req.user.username} visitó el objeto estelar con ID: ${starId}`);
    }
    next();
};

module.exports = logStarVisits;

// Renderizar la página principal
exports.getHomePage = (req, res) => {
    res.render('index', { isMainPage: true });
};

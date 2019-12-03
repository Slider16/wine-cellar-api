function winesController(Wine) {
    function post(req, res) {
        const wine = new Wine(req.body);
        if(!req.body.name) {
            res.status(400);
            return res.send('Name is required');
        }
        wine.save();
        res.status(201);
        return res.json(wine);
    }
    function get(req, res) {
        const query = {};
        if(req.query.vineyard) {
            query.vineyard = req.query.vineyard
        }
        Wine.find(query, (err, wines) => {
            if(err) {
                return res.send(err);
            }
            const returnWines = wines.map((wine) => {
                const newWine = wine.toJSON();
                newWine.links = {};
                newWine.links.self = `http://${req.headers.host}/api/wines/${wine._id}`;
                return newWine;
            });
            return res.json(returnWines);
        });
    }
    return { post, get }
}

module.exports = winesController;

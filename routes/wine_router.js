const express = require('express');
const wineController = require('../controllers/wine_controller.js');

function routes(Wine) {
    const wineRouter = express.Router();
    const controller = wineController(Wine);
    wineRouter.route('/wines')
        .post(controller.post)
        .get(controller.get);
    wineRouter.use('/wines/:wineId', (req, res, next) => {
        Wine.findById(req.params.wineId, (err, wine) => {
            if (err) {
                return res.send(err);
            }
            if (wine) {
                req.wine = wine;
                return next();
            }
            return res.sendStatus(404)
        });
    });
    wineRouter.route('/wines/:wineId')
        .get((req, res) => {
            const returnWine = req.wine.toJSON();            
            returnWine.links = {};
            const vineyard = req.wine.vineyard.replace(' ', '%20');
            returnWine.links.FilterByThisVineyard = `http://${req.headers.host}/api/wines/?vineyard=${vineyard}`;
            res.json(returnWine);
        })
        .put((req, res) => {
            const { wine } = req;
            wine.name = req.body.name;
            wine.vineyard = req.body.vineyard;
            wine.location = req.body.location;
            wine.year = req.body.year;
            wine.bin = req.body.bin;
            wine.purchasePrice = req.body.purchasePrice;
            wine.sellPrice = req.body.sellPrice;
            wine.notes = req.body.notes;
            req.wine.save((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(wine);
            });
        })
        .patch((req, res) => {
            const { wine } = req;
            if(req.body._id) {
                delete req.body._id;
            }
            Object.entries(req.body).forEach((item) => {
                const key = item[0];
                const value = item[1];
                wine[key] = value;
            });
            req.wine.save((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(wine);
            });
        })
        .delete((req, res) => {
            const { wine } = req;
            req.wine.remove((err) => {
                if (err){
                    return req.send(err);
                }                
                res.json(wine);
                // return res.sendStatus(204);
            });
        })
        return wineRouter;
}

module.exports = routes;
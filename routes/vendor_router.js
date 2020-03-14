const express = require('express');
const vendorController = require('../controllers/vendor_controller.js');

function routes(Vendor) {
    const vendorRouter = express.Router();
    const controller = vendorController(Vendor);
    vendorRouter.route('/vendors')
        .post(controller.post)
        .get(controller.get);
    vendorRouter.use('/vendors/:vendorId', (req, res, next) => {
        Vendor.findById(req.params.vendorId, (err, vendor) => {
            if (err) {
                return res.send(err);
            }
            if (vendor) {
                req.vendor = vendor;
                return next();
            }
            return res.sendStatus(404)
        });
    });
    vendorRouter.route('/vendors/:vendorId')
        .get((req, res) => {
            const returnVendor = req.vendor.toJSON();
            res.json(returnVendor);
        })
        .put((req, res) => {
            const { vendor } = req;
            vendor.name = req.body.name;
            vendor.address = req.body.address;
            vendor.city = req.body.city;
            vendor.state = req.body.state;
            vendor.phone = req.body.phone;
            vendor.website = req.body.website;
            req.vendor.save((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(vendor);
            });
        })
        .patch((req, res) => {
            const { vendor } = req;
            if(req.body._id) {
                delete req.body._id;
            }
            Object.entries(req.body).forEach((item) => {
                const key = item[0];
                const value = item[1];
                vendor[key] = value;
            });
            req.vendor.save((err) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(vendor);
            });
        })
        .delete((req, res) => {
            const { vendor } = req;
            req.vendor.remove((err) => {
                if (err) {
                    return req.send(err);
                }
                res.json(vendor);
                // return res.sendStatus(204);
            });
        })
        return vendorRouter;    
}

module.exports = routes;
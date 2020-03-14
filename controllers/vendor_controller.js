function vendorsController(Vendor) {
    function post(req, res) {
        const vendor = new Vendor(req.body);
        if(!req.body.name) {
            res.status(400);
            return res.send('Name is required');
        }
        vendor.save();
        res.status(201);
        return res.json(vendor);
    }
    function get(req, res) {
        const query = {};        
        Vendor.find(query, (err, vendors) => {
            if(err) {
                return res.send(err);
            }
            const returnVendors = vendors.map((vendor) => {
                const newVendor = vendor.toJSON();
                newVendor.links = {};
                newVendor.links.self = `http://${req.headers.host}/api/vendors/${vendor._id}`;
                return newVendor;
            });
            return res.json(returnVendors);
        });
    }
    return { post, get }
}

module.exports = vendorsController;

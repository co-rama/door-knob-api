const Tenant = require("../models/tenant")
exports.postTenant = async (req, res, next) => {
    try {
        const {mobile, password, status, duration, name, email, endDuration } = req.body;
        const newTenant = new Tenant({
            mobile,
            password,
            status,
            duration,
            endDuration,
            name,
            email
        })
        const savedTenant = await newTenant.save();
        if(savedTenant.length <= 0){
            return res.json({message: 'Tenant could not be saved, review error(s)'})
        }
        res.json({message: "Tenant saved successfully", tenant: savedTenant, success: true}) 
    } catch (error) {
        next(error);
    }
}
exports.getAllTenants = async (req, res, next) => {
    try {
        const allTenants = await Tenant.find().sort({_id: -1});
        if(allTenants <= 0){
            return res.json({message: 'Tenant could not be retrived, retry'}) 
        }
        res.json({message: "Tenants retrieved", tenants: allTenants, success: true})
    } catch (error) {
        next(error);
    }
}
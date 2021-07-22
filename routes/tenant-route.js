const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenant-controller');


router.post('/add', tenantController.postTenant);

router.get('/all', tenantController.getAllTenants);

router.delete('/delete/:tenantId', tenantController.deleteTenant);
module.exports = router;
const express = require('express');
const router = express.Router();
const tenantController = require('../controllers/tenant-controller');

// ADMIN
// router.post('/register', authController.postRegister);

// CUSTOMER
router.post('/add', tenantController.postTenant);

//LOGIN FOR BOTH
router.get('/all', tenantController.getAllTenants);

// VERIFICATION
// router.get('/activation/:token', authController.getVerification);
module.exports = router;
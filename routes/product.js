const express = require('express');
const { createProduct, AdminAllProducts, getAllProducts, getProductDetails, updateProduct, deleteProduct } = require('../controller/product');
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/admin/product/new').post(isAuthenticated, authorizedRoles("admin"), createProduct);

router.route('/admin/products').get(isAuthenticated, authorizedRoles("admin"), AdminAllProducts);
router.route('/product/:id').get(getProductDetails);
router.route('/admin/product/:id')
.put(isAuthenticated, authorizedRoles("admin"), updateProduct)
.delete(isAuthenticated, authorizedRoles("admin"), deleteProduct);

module.exports = router;
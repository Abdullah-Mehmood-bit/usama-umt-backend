const express = require('express');
const { orderNew, getSingleOrder, myOrders, getAllOrders, deleteOrders, updateOrder } = require('../controller/order');
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');

const router = express.Router();

router.route('/order/new').post(isAuthenticated, orderNew);
router.route('/order/:id').get(isAuthenticated, getSingleOrder);
router.route('/orders/me').get(isAuthenticated, myOrders);
router.route("/admin/orders").get(isAuthenticated, authorizedRoles("admin"), getAllOrders);
router.route("/admin/order/:id")
.put(isAuthenticated, authorizedRoles("admin"), updateOrder)
.delete(isAuthenticated, authorizedRoles("admin"), deleteOrders);
module.exports = router;
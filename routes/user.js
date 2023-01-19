const express = require('express');
const { register, login, logout, getUserDetails, getSingleUser, getAllUsers, updateProfile, updateProfileAndRole, deleteUserProfile } = require('../controller/user');
const { isAuthenticated, authorizedRoles } = require('../middleware/auth');
const router = express.Router();

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);
router.route('/me').get(isAuthenticated, getUserDetails);
router.route('/me/update').put(isAuthenticated, updateProfile);
router.route('/admin/users').get(isAuthenticated, authorizedRoles("admin"), getAllUsers);
router.route('/admin/user/:id')
.get(isAuthenticated, authorizedRoles("admin") , getSingleUser)
.put(isAuthenticated, authorizedRoles("admin"), updateProfileAndRole)
.delete(isAuthenticated, authorizedRoles("admin"), deleteUserProfile);

module.exports = router;
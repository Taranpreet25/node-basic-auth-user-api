const express = require('express');
const router = express.Router();
const onboardingController = require('../controller/onboarding');
const { authenticate } = require('../middleware/auth');

// User Accoun Crud
router.post('/accounts', onboardingController.createAccount);
router.get('/accounts/:id', authenticate, onboardingController.getAccountById);
router.put('/accounts/:id', authenticate, onboardingController.updateAccount);
router.delete('/accounts/:id', authenticate, onboardingController.deleteAccount);

// Login 
router.post('/login', onboardingController.login);

// Listing
router.get('/accounts', authenticate, onboardingController.listAccounts);

module.exports = router;

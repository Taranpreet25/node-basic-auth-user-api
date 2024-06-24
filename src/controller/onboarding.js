const userDetails = require('../model/user_details');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Create a new account
exports.createAccount = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, password, birthday } = req.body;
        console.log({ first_name, last_name, email, phone, password, birthday });
        const hashedPassword = await bcrypt.hash(password, 10);

        const dob = String(new Date(birthday))
        console.log(dob)
        const account = await userDetails.create({ first_name, last_name, email, phone, password: hashedPassword, birthday: dob });
        res.status(201).json(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get account by ID
exports.getAccountById = async (req, res) => {
    try {
        const account = await userDetails.findByPk(req.params.id);
        if (account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: 'Account not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update account by ID
exports.updateAccount = async (req, res) => {
    try {
        const account = await userDetails.findByPk(req.params.id);
        if (account) {
            const { first_name, last_name, email, phone, password, birthday } = req.body;
            const hashedPassword = password ? await bcrypt.hash(password, 10) : account.password;
            await account.update({ first_name, last_name, email, phone, password: hashedPassword, birthday });
            res.status(200).json(account);
        } else {
            res.status(404).json({ message: 'Account not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete account by ID
exports.deleteAccount = async (req, res) => {
    try {
        const account = await userDetails.findByPk(req.params.id);
        if (account) {
            await account.destroy();
            res.status(200).json({ message: 'Account deleted' });
        } else {
            res.status(404).json({ message: 'Account not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const account = await userDetails.findOne({ where: { email } });
        if (account && await bcrypt.compare(password, account.password)) {
            console.log(process.env.JWT_SECRET);
            const token = jwt.sign({ id: account.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// List accounts with limit
exports.listAccounts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const accounts = await userDetails.findAll({ limit });
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

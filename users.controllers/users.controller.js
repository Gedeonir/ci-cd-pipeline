const bcrypt = require('bcrypt');
const db = require('../db');
const express = require('express');
const jwt=require('jsonwebtoken');

const router = express.Router();

// REGISTER USER
router.post('/register', async (req, res) => {
    const { username, password,email,name } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (username, password, email, name) VALUES (?, ?, ?, ?)';
        db.execute(query, [username, hashedPassword, email, name], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

//Login

const Login= router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.execute(query, [username], async (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database error' });
            }
            if (results.length === 0) {
                return res.status(400).json({ error: 'Invalid username or password' });
            }
            const user = results[0];
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(400).json({ error: 'Invalid username or password' });
            }

            const token=jwt.sign({user},'secretkey',{ expiresIn:'1h'});
            res.status(200).json({ message: 'Login successful', token });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
module.exports = router;
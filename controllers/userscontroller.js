const router = require('express').Router();
const { models } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');

router.post('/signup' , async (req, res) =>{
    const {username, password} = req.body;
    try {
        await models.UsersModel.create({
            username: username,
            password: bcrypt.hashSync(password, 10)
        })
        .then(
            user => {
                let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                res.status(201).json({
                    user: user,
                    message: 'user created',
                    sessionToken: 'Bearer ${token}'
                });
            }
        )
    } catch (err) {
        if (err instanceof UniqueConstraintError) {
            res.status(409).json({ 
                message: 'Username already in use'
            });
        } else {
            res.status(500).json({
                error: `Failed to register user: ${err}`
            });
        };
    };
});

// We're going to make a get request in userscontroller.js that will show us not only all of the Users stored in the database, but any associated Posts and Comments with those Users, as well. 


router.get('/userinfo', async (req, res) => {
    try {
        await models.UsersModel.findAll()
        .then(
            users => {
                res.status(200).json({
                    users: users
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            error: `Failed to retrieve users: ${err}`
        });
    };
});

module.exports = router;
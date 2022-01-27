const router = require('express').Router();
const { models } = require('../models');

router.post('/post', async (req, res) => {
    const {title, content} = req.body.post;

    try{
        await models.PostsModel.create({
            title: title,
            content: content,
            userID: req.user.id
        })
        .then(
            post => {
                res.status(201).json({
                    post: post,
                    message: 'post created'
                });
            }
        )
    } catch (err) {
        res.status(201).json({
            post: this.post,
            message: 'post created'
        });
    }
});

module.exports = router;
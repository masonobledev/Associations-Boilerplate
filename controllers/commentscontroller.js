const router = require('express').Router();
const { models } = require('../models');

router.post('/comment', async (req, res) => {

    const {content, postID} = req.body.comment;

    try {
        await models.CommentsModel.create({
            content: content,
            postID: postID,
            userID: req.user.id
        })
        .then(
            comment => {
                res.status(201).json({
                    comment: comment,
                    message: 'comment created'
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            error: 'Failed to create comment: ${err}'
        });
    };
});

module.exports = router;
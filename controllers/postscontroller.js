const router = require('express').Router();
const { models } = require('../models');
let validateJWT = require('../middleware/validate-session');

router.post('/post', /*validateJWT,*/ async (req, res) => {
    const {title, content} = req.body.post;

    try{
        await models.PostsModel.create({
            title: title,
            content: content,
            // foreign key from usermodel
            userID: req.user.id
        })
        .then(
            post => {
                res.status(201).json({
                    post: post,
                    message: `post created`
                });
            }
        )
    } catch (err) {
        res.status(500).json({
            post: post,
            error: `Failed to create post: ${err}`
        });
    };
});

module.exports = router;
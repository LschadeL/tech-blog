const router = require("express").Router();
const { Comment } = require("../../models");

router.post("/", async (req, res) => {
    try {
        const newComment = await Comment.create({
            user_id: req.session.user_id,
            post_id: req.body.post_id,
            content: req.body.content
        });
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
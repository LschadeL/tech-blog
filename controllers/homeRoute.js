const router = require("express").Router();
const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");
const { QueryTypes } = require("sequelize");

router.get("/", async (req, res) => {
    try {
      const allPosts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ["userName"]
          }
        ]
    });

    const posts = allPosts.map((post) => post.get({
        plain: true
    }));

    res.render("homepage", {
        posts,
        logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["user_name"]
          },
          {
            model: Comment,
            include: [{ model: User, attributes: ["user_name"] }]
          }
        ]
      });

      const post = postData.get({
        plain: true
        });

      const commentUserArray = [];

      for (let i = 0; i < post.comments.length; i++) {
            commentUserArray.push(post.comments[i].user.user_name);
            post.comments[i].user = commentUserArray[i];
        }
  
      res.render("post", {
            ...post,
            logged_in: req.session.logged_in
        });

    } catch (err) {
      res.status(500).json(err);
    }
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
  
    res.render("login");
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {
      const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ["password"] },
            include: [{ model: Post }]
        });

        const user = userData.get({
            plain: true
        });

        res.render("dashboard", {
            ...user,
            logged_in: true
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/editpost/:id", withAuth, async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["user_name"]
          }
        ]
      });

        const post = postData.get({
            plain: true
        });

        const postUser = post.user_id;
        const reqPostUser = req.session.user_id;

        if (!(postUser === reqPostUser)) {
            res.redirect("/dashboard");
            return;
        }
        res.render("editpost", {
            ...post,
            logged_in: req.session.logged_in
        });

    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;